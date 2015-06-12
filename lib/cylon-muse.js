/*
 * cylon-muse
 * http://cylonjs.com
 *
 * Copyright (c) 2015 The Hybrid Group
 * Your License Here
*/

"use strict";

var Adaptor = require("./adaptor"),
    Driver = require("./driver");

module.exports = {
  adaptors: ["muse"],
  drivers: ["muse"],
  dependencies: [],

  adaptor: function(opts) {
    return new Adaptor(opts);
  },

  driver: function(opts) {
    return new Driver(opts);
  }
};
