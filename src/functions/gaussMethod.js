const f = require("./f.js");

const N = 100;

const table = {
  "1": {
    x: [0],
    c: [2]
  },
  "2": {
    x: [-0.5773503, 0.5773503],
    c: [1, 1]
  },
  "3": {
    x: [-0.7745967, 0, 0.7745967],
    c: [0.5555556, 0.8888889, 0.5555556]
  },
  "4": {
    x: [-0.8611363, -0.339981, 0.339981, 0.8611363],
    c: [0.3478548, 0.6521451, 0.6521451, 0.3478548]
  },
  "5": {
    x: [-0.9061798, -0.5384693, 0, 0.5384693, 0.9061798],
    c: [0.4786287, 0.2369269, 0.5688888, 0.2369269, 0.4786287]
  },
  "6": {
    x: [-0.93247, -0.6612094, -0.2386142, 0.2386142, 0.6612094, 0.93247],
    c: [0.1713245, 0.3607616, 0.467914, 0.467914, 0.3607616, 0.1713245]
  }
};

module.exports = function(a, b, n) {
  let sum = 0,
    Xi,
    Ci;

  for (let i in table) {
    if (i == n) {
      Xi = table[i].x;
      Ci = table[i].c;
    }
  }

  if (!Xi || !Ci) return 0;

  for (let i = 0; i < N; i++) {
    let a2 = a + (i * (b - a)) / N;
    let b2 = a + ((i + 1) * (b - a)) / N;

    let ra = (b2 - a2) / 2;
    let su = (a2 + b2) / 2;
    let S = 0,
      Q;

    for (let j = 0; j < n; j++) {
      Q = su + ra * Xi[j];
      S += Ci[j] * f(Q);
    }

    sum += ra * S;
  }

  return sum; // 13.723492910917269
};
