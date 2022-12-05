import { pipe } from 'fp-ts/lib/function';
import * as A from 'fp-ts/Array';
import { data } from './day4_data';
import { sumArray } from './utils';

type Range = [Number, Number];
type RangePair = [Range, Range];

const isContained = ([[x1, y1], [x2, y2]]: RangePair) => {
  return Number((x1 >= x2 && y1 <= y2) || (x2 >= x1 && y2 <= y1));
};

const overlaps = ([[x1, y1], [x2, y2]]: RangePair) => {
  return Number(
    (x1 <= x2 && x2 <= y1) ||
      (x1 <= y2 && y2 <= y1) ||
      (x2 <= x1 && x1 <= y2) ||
      (x2 <= y1 && y1 <= y2)
  );
};

export const day4 = () => {
  return pipe(
    data.split(`\n`),
    A.map(
      (s) =>
        s
          .split(',')
          .map((x) => x.split('-').map(Number)) as unknown as RangePair
    ),
    A.map(overlaps),
    sumArray
  );
};
