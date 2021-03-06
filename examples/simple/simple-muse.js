"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    muse: { adaptor: "muse", port: "/dev/rfcomm0" }
  },

  devices: {
    headset: { driver: "muse" }
  },

  work: function(my) {
    my.muse.read(function(packet) {
      console.log("packet:", packet);
    });
    my.muse.write("v\n");
  }
});

Cylon.start();
