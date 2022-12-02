import { data } from './day2_data';
import { sumArray } from './utils';

enum Hand {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}

type HandCode = 'A' | 'B' | 'C' | 'X' | 'Y' | 'Z';

const mapping: Record<HandCode, Hand> = {
  A: Hand.Rock,
  B: Hand.Paper,
  C: Hand.Scissors,
  X: Hand.Rock,
  Y: Hand.Paper,
  Z: Hand.Scissors,
};

enum Outcome {
  Lost = 0,
  Draw = 3,
  Win = 6,
}

type Game = [HandCode, HandCode];

const score = ([theirs_, ours_]: Game) => {
  const theirs = mapping[theirs_];
  const ours = mapping[ours_];
  const handScore = Number(ours);
  let outcome: Outcome;
  switch (ours - theirs) {
    case 0:
      outcome = Outcome.Draw;
      break;
    case 1:
    case -2:
      outcome = Outcome.Win;
      break;
    default:
      outcome = Outcome.Lost;
      break;
  }
  const outcomeScore = Number(outcome);
  return outcomeScore + handScore;
};

export const day2 = () => {
  const games = data.split('\n').map((game) => game.split(' ')) as Game[];
  return sumArray(games.map(score));
};
