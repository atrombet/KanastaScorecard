import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface ScorecardProps {
  total: number;
}

export const Scorecard: React.FC<ScorecardProps> = ({ total }) => {
  const laydown = (currentScore: number) => {
    if (currentScore < 3000) {
      return 50;
    } else if (currentScore < 6000) {
      return 90;
    } else if (currentScore < 9000) {
      return 120;
    } else if (currentScore < 12000) {
      return 150;
    } else if (currentScore < 15000) {
      return 170;
    } else if (currentScore < 20000) {
      return 190;
    } else {
      return null;
    }
  };

  return (
    <>
      <View style={styles.group}>
        <Text style={styles.label}>Score</Text>
        <Text style={styles.value}>{total}</Text>
      </View>
      <View style={styles.group}>
        <Text style={styles.label}>To lay down</Text>
        <Text style={styles.value}>{laydown(total) || '-'}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  group: {
    paddingBottom: 16
  },
  label: {
    fontWeight: '300',
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 24
  },
  value: {
    fontSize: 21,
    fontWeight: '600',
    textAlign: 'center'
  }
});
