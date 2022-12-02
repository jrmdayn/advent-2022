import { data } from './day1_data';

export const day1 = () => {
  const l = data
    .split('\n\n')
    .map((y) =>
      y
        .split('\n')
        .map((v) => Number(v.trim()))
        .reduce((_, __) => _ + __, 0)
    )
    .sort();
  return l.slice(-6, -3).reduce((a, b) => a + b, 0);
};
