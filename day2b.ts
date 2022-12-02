import { data } from './day2_data';
import { sumArray } from './utils';

enum Hand {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}

type HandCode = 'A' | 'B' | 'C';
type OutcomeCode = 'X' | 'Y' | 'Z';

const mappingHand: Record<HandCode, Hand> = {
  A: Hand.Rock,
  B: Hand.Paper,
  C: Hand.Scissors,
};

enum Outcome {
  Lost = 0,
  Draw = 3,
  Win = 6,
}

const mappingOutcome: Record<OutcomeCode, Outcome> = {
  X: Outcome.Lost,
  Y: Outcome.Draw,
  Z: Outcome.Win,
};

type Game = [HandCode, OutcomeCode];

const score = ([theirs_, ours_]: Game) => {
  const theirs = mappingHand[theirs_];
  const outcome = mappingOutcome[ours_];
  const outcomeScore = Number(outcome);
  let ours: Hand;
  switch (outcome) {
    case Outcome.Draw:
      ours = theirs;
      break;
    case Outcome.Win:
      let tmp = Number(theirs) + 1;
      if (tmp === 4) tmp = 1;
      ours = tmp as Hand;
      break;
    case Outcome.Lost:
      let tmp_ = Number(theirs) - 1;
      if (tmp_ === 0) tmp_ = 3;
      ours = tmp_ as Hand;
  }
  const ourScore = Number(ours);
  return outcomeScore + ourScore;
};

export const day2b = () => {
  const games = data.split('\n').map((game) => game.split(' ')) as Game[];
  return sumArray(games.map(score));
};
