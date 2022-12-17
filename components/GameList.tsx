import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Score } from '../interfaces';

interface GameListProps {
  games: Score[];
}

export const GameList: React.FC<GameListProps> = ({ games }) => {
  return (
    <View style={styles.list}>
      <Text style={styles.title}>Saved Games</Text>
      {games.map(game => (
        <View key={game.gameId} style={styles.game}>
          <Text style={styles.versus}>
            {game.team1Name} vs. {game.team2Name}
          </Text>
          <Text style={styles.date}>{new Date(game.lastUpdated).toLocaleDateString()}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 24,
    borderTopWidth: 1,
    borderColor: '#CCCCCC'
  },
  title: {
    fontSize: 21,
    fontWeight: '600',
    marginBottom: 16
  },
  game: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    backgroundColor: '#DDDDDD',
    borderRadius: 4
  },
  versus: {
    fontSize: 18,
    fontWeight: '600'
  },
  date: {
    fontSize: 16,
    fontWeight: '300'
  }
});