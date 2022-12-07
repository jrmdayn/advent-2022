import { data } from './day5_data';
import * as S from 'fp-ts/string';
import { flow, pipe } from 'fp-ts/lib/function';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import * as A from 'fp-ts/Array';

const containers = [
  ['W', 'P', 'G', 'Z', 'V', 'S', 'B'],
  ['F', 'Z', 'C', 'B', 'V', 'J'],
  ['C', 'D', 'Z', 'N', 'H', 'M', 'L', 'V'],
  ['B', 'J', 'F', 'P', 'Z', 'M', 'D', 'L'],
  ['H', 'Q', 'B', 'J', 'G', 'C', 'F', 'V'],
  ['B', 'L', 'S', 'T', 'Q', 'F', 'G'],
  ['V', 'Z', 'C', 'G', 'L'],
  ['G', 'L', 'N'],
  ['C', 'H', 'F', 'J'],
];

export const day5 = () => {
  return pipe(
    data,
    S.split('\n'),
    RNEA.map(flow(S.split(' '), (x) => [x[1], x[3], x[5]], A.map(Number))),
    RNEA.reduce(containers, (current, instructions) => {
      const [quantity, from, to] = instructions;
      const fromC = current[from - 1];
      const toC = current[to - 1];
      const [toMove, newFromC] = A.splitAt(quantity)(fromC);
      // const reversed = A.reverse(toMove);
      const newToC = pipe(/*reversed*/ toMove, A.concat(toC));
      const tmp = A.unsafeUpdateAt(from - 1, newFromC, current);
      return A.unsafeUpdateAt(to - 1, newToC, tmp);
    }),
    A.map((x) => x[0]),
    (x) => x.join('')
  );

  // return instructions.forEach(([quantity, from, to]) => {});
};
