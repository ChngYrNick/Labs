module.exports = function gaussMethod(wx) {
  const N = wx.length;
  let r,
    wx1 = [];

  for (let i = 0; i < N; i++) {
    wx1[i] = new Array(N);
  }

  // встановлюємо одиниці на діагоналі матриці
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      wx1[i][j] = i === j ? 1 : 0;
    }
  }

  for (let i = 0; i < N; i++) {
    // перевіряємо щоб ffx[i][i] не дорівнювало нулю
    if (wx[i][i] === 0) {
      // якщо ноль, то шукаємо рядок не з нулем у стовпці
      for (let p = i + 1; p < N; p++) {
        if (wx[p][i] !== 0) {
          // якщо знайшли, то міняємо рядки p та i місцями
          for (let q = 0; q < N; q++) {
            [wx[i][q], wx[p][q]] = [wx[p][q], wx[i][q]];
          }
          // якщо поміняли рядки, то продовжуємо алгоритм, перервавши цикл
          break;
        }
      }
    }
    // якщо заміни нульового елемента не було, то повертаємо нуль
    if (wx[i][i] === 0) return 0;

    for (let k = 0; k < N; k++) {
      // сам з себе рядок не можна віднімати
      if (i === k) continue;

      // обчислюємо коефіцієнт віднімання
      r = wx[k][i] / wx[i][i];

      // віднімаємо по черзі кожен елемент рядка
      for (let j = 0; j < N; j++) {
        wx[k][j] -= r * wx[i][j];
        wx1[k][j] -= r * wx1[i][j];
      }
    }
  }

  for (let i = 0; i < N; i++) {
    // обчислюємо коефіцієнт нормалізації (i-ий елемент i-го рядка не дорівнює нулю)
    r = wx[i][i];
    // нормалізуємо рядок матриці
    for (let j = 0; j < N; j++) {
      wx[i][j] /= r;
      wx1[i][j] /= r;
    }
  }

  return wx1;
};