/*
 * cylon-muse adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2015 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require("cylon"),
    SerialPort = null;

// thanks to https://github.com/jgautier/firmata/blob/master/lib/firmata.js
try {
  if (process.browser) {
    SerialPort = require("browser-serialport").SerialPort;
  } else {
    SerialPort = require("serialport").SerialPort;
  }
} catch (err) {
  SerialPort = null;
}

if (SerialPort == null) {
  var str = "";
  str += "It looks like serialport didn't compile properly. ";
  str += "This is a common problem and its fix is well documented here ";
  str += "https://github.com/voodootikigod/node-serialport#to-install";

  console.log(str);
  throw "Missing serialport dependency";
}

var Adaptor = module.exports = function Adaptor() {
  Adaptor.__super__.constructor.apply(this, arguments);

  this["serialPort"] = new SerialPort(this.port, {
    baudrate: 57600
  });
};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.connect = function(callback) {
  this.serialPort.open(function() {
    Cylon.Logger.info("Connecting to adaptor '" + this.name + "'...");
    this.emit("connect");
    callback();
  }.bind(this));
};

Adaptor.prototype.disconnect = function(callback) {
  this.serialPort.pause();

  this.serialPort.flush(function() {
    this.serialPort.close(function() {
      Cylon.Logger.info("Disconnecting to adaptor '" + this.name + "'...");
      this.emit("disconnect");
      callback();
    }.bind(this));
  }.bind(this));
};

Adaptor.prototype.commands = ["read", "write"];

/**
 * Reads data from the Muse serialport.
 *
 * Triggers the callback with any new data
 *
 * @param {Function} callback to be triggered when new data is available
 * @return {null}
 * @publish
 */
Adaptor.prototype.read = function(callback) {
  this.serialPort.on("data", callback);
};

/**
 * Write data to the Muse serialport.
 *
 *
 * @param {Function} callback to be triggered when new data is available
 * @return {null}
 * @publish
 */
Adaptor.prototype.write = function(data) {
  this.serialPort.write(data);
};
