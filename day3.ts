import { data } from './day3_data';
import { sumArray } from './utils';
import * as A from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';

const splitInHalf = (s: string): [string, string] => {
  const s1 = s.substring(0, s.length / 2);
  const s2 = s.substring(s.length / 2);
  return [s1, s2];
};

// A-Z => 65-90
// a-z => 97-122
const toPriority = (s: string) => {
  const charCode = s.charCodeAt(0);

  if (charCode <= 90) return charCode - 64 + 26;
  return charCode - 96;
};

const commonChars = (s1: string, s2: string) => {
  const a = Array.from(s1);
  const b = Array.from(s2);
  const res = a.filter((x) => b.includes(x));
  return res;
};

const commonChar = (s1: string, s2: string) => {
  return commonChars(s1, s2)[0];
};

const commonChar3 = (s1: string, s2: string, s3: string) => {
  const s12 = commonChars(s1, s2).join();
  return commonChar(s12, s3);
};

export const day3 = () => {
  return sumArray(
    data.split('\n').map((s) => {
      const [s1, s2] = splitInHalf(s);
      return toPriority(commonChar(s1, s2));
    })
  );
};

export const day3b = () => {
  return pipe(
    data.split('\n'),
    A.chunksOf(3),
    A.map(([s1, s2, s3]) => commonChar3(s1, s2, s3)),
    A.map(toPriority),
    sumArray
  );
};
