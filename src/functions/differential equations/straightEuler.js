const derY = require("./derY.js");

const eps = 0.001;

module.exports = function(x, b, h, y) {
  let i = x,
    ytemp = y,
    result = {};

  result[x] = y;

  while (Math.abs(i - b) > eps) {
    i += h;
    ytemp += h * derY(i, ytemp);
    result[i] = ytemp;
  }

  return result;
};
