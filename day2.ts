enum Hand {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}

const mapping = {
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
