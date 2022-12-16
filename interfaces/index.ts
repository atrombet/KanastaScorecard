export interface Round {
  kanastaPoints: number;
  cardPoints: number;
}

export interface Score {
  team1: Round[];
  team2: Round[];
}
