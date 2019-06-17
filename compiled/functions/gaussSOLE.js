"use strict";

module.exports = function gaussMethod(wx) {
  var N = wx.length;
  var r,
      wx1 = [];

  for (var i = 0; i < N; i++) {
    wx1[i] = new Array(N);
  } // встановлюємо одиниці на діагоналі матриці


  for (var _i = 0; _i < N; _i++) {
    for (var j = 0; j < N; j++) {
      wx1[_i][j] = _i === j ? 1 : 0;
    }
  }

  for (var _i2 = 0; _i2 < N; _i2++) {
    // перевіряємо щоб ffx[i][i] не дорівнювало нулю
    if (wx[_i2][_i2] === 0) {
      // якщо ноль, то шукаємо рядок не з нулем у стовпці
      for (var p = _i2 + 1; p < N; p++) {
        if (wx[p][_i2] !== 0) {
          // якщо знайшли, то міняємо рядки p та i місцями
          for (var q = 0; q < N; q++) {
            var _ref = [wx[p][q], wx[_i2][q]];
            wx[_i2][q] = _ref[0];
            wx[p][q] = _ref[1];
          } // якщо поміняли рядки, то продовжуємо алгоритм, перервавши цикл


          break;
        }
      }
    } // якщо заміни нульового елемента не було, то повертаємо нуль


    if (wx[_i2][_i2] === 0) return 0;

    for (var k = 0; k < N; k++) {
      // сам з себе рядок не можна віднімати
      if (_i2 === k) continue; // обчислюємо коефіцієнт віднімання

      r = wx[k][_i2] / wx[_i2][_i2]; // віднімаємо по черзі кожен елемент рядка

      for (var _j = 0; _j < N; _j++) {
        wx[k][_j] -= r * wx[_i2][_j];
        wx1[k][_j] -= r * wx1[_i2][_j];
      }
    }
  }

  for (var _i3 = 0; _i3 < N; _i3++) {
    // обчислюємо коефіцієнт нормалізації (i-ий елемент i-го рядка не дорівнює нулю)
    r = wx[_i3][_i3]; // нормалізуємо рядок матриці

    for (var _j2 = 0; _j2 < N; _j2++) {
      wx[_i3][_j2] /= r;
      wx1[_i3][_j2] /= r;
    }
  }

  return wx1;
};