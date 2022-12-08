import { pipe } from 'fp-ts/lib/function';
import { data } from './day6_data';
import * as A from 'fp-ts/Array';
import * as S from 'fp-ts/string';

export const day6 = () => {
  const msgLength = 14;
  for (let i = msgLength; i < data.length; i++) {
    const x = data.substring(i - msgLength, i);
    const s = pipe(Array.from(x), A.uniq(S.Eq));
    if (s.length === msgLength) {
      console.log(x);
      return i;
    }
  }
};
