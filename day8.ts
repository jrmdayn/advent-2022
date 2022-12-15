import { data } from './day8_data';

export const day8 = () => {
  const map = data.split('\n').map((s) => Array.from(s).map(Number));
  const N = map.length;
  const M = map[0].length;

  let res = 0;
  for (let i = 0; i < N; ++i) {
    for (let j = 0; j < M; ++j) {
      if (i === 0 || j === 0 || i === N - 1 || j === M - 1) {
        res += 1;
      } else {
        const value = map[i][j];
        let a = 0;
        for (let k = 0; k < i; ++k) {
          a = Math.max(a, map[k][j]);
        }
        let b = 0;
        for (let k = i + 1; k < N; ++k) {
          b = Math.max(b, map[k][j]);
        }
        let c = 0;
        for (let k = 0; k < j; ++k) {
          c = Math.max(c, map[i][k]);
        }
        let d = 0;
        for (let k = j + 1; k < M; ++k) {
          d = Math.max(d, map[i][k]);
        }
        if (Math.min(a, b, c, d) < value) {
          res += 1;
        }
      }
    }
  }

  console.log(res);
};
