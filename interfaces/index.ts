export interface Round {
  kanastaPoints: number;
  cardPoints: number;
}

export interface Score {
  gameId: string;
  lastUpdated: string;
  team1Name: string;
  team1: Round[];
  team2Name: string;
  team2: Round[];
}
