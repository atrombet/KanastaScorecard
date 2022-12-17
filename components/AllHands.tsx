import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Score } from '../interfaces';

interface AllHandsProps {
  score: Score;
}

export const AllHands: React.FC<AllHandsProps> = ({ score }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completed hands</Text>
      {score.team1.map((_, index: number) => (
        <View key={index.toString()} style={styles.row}>
          <Text>{score.team1[index].kanastaPoints + score.team1[index].cardPoints}</Text>
          <Text style={styles.roundLabel}>Hand {index + 1}</Text>
          <Text>{score.team2[index].kanastaPoints + score.team2[index].cardPoints}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: '#CCCCCC',
    paddingVertical: 24,
    paddingHorizontal: 48
  },
  title: {
    fontSize: 21,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  roundLabel: {
    fontSize: 18,
    fontWeight: '600',
    flexGrow: 1,
    textAlign: 'center'
  }
});
