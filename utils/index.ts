import { Round, Score } from '../interfaces';

export const newGame = (gameId: string): Score => ({
  gameId,
  lastUpdated: '',
  team1Name: 'Team 1',
  team1: [] as Round[],
  team2Name: 'Team 2',
  team2: [] as Round[],
  winner: null
});
