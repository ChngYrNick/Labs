"use strict";

var derY = require("./derY.js"); // ( y` )


var derZ = require("./derZ.js"); // ( y`` )


var eps = 0.001;

module.exports = function (x, b, h, y, Zo) {
  var result = {};
  var Xo, Yo, Y1, Z1;
  var k1, k2, k3, k4;
  var q1, q2, q3, q4;
  /*
   *Начальные условия
   */

  Xo = x;
  Yo = y;

  for (; Math.abs(Xo - b) < eps; Xo += h) {
    k1 = h * derY(Xo, Yo, Zo);
    q1 = h * derZ(Xo, Yo, Zo);
    k2 = h * derY(Xo + h / 2.0, Yo + q1 / 2.0, Zo + k1 / 2.0);
    q2 = h * derZ(Xo + h / 2.0, Yo + q1 / 2.0, Zo + k1 / 2.0);
    k3 = h * derY(Xo + h / 2.0, Yo + q2 / 2.0, Zo + k2 / 2.0);
    q3 = h * derZ(Xo + h / 2.0, Yo + q2 / 2.0, Zo + k2 / 2.0);
    k4 = h * derY(Xo + h, Yo + q3, Zo + k3);
    q4 = h * derZ(Xo + h, Yo + q3, Zo + k3);
    Z1 = Zo + (k1 + 2.0 * k2 + 2.0 * k3 + k4) / 6.0;
    Y1 = Yo + (q1 + 2.0 * q2 + 2.0 * q3 + q4) / 6.0;
    result.push({
      Xo: Xo,
      Y1: Y1,
      Z1: Z1
    });
    Yo = Y1;
    Zo = Z1;
  }

  return result;
};