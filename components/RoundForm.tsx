import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, SafeAreaView, useColorScheme, Pressable } from 'react-native';
import { Round } from '../interfaces';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface RoundModalProps {
  team1Name: string;
  team2Name: string;
  onFormSave: (teamRounds: { team1: Round; team2: Round }) => void;
}

interface RoundFormFields {
  team1: {
    kanastas: string;
    cards: string;
  };
  team2: {
    kanastas: string;
    cards: string;
  };
}

export const RoundForm: React.FC<RoundModalProps> = ({ team1Name, team2Name, onFormSave }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };

  const [round, setRound] = useState<RoundFormFields>({
    team1: { kanastas: '', cards: '' },
    team2: { kanastas: '', cards: '' }
  });

  const updateRound = (value: string, team: 'team1' | 'team2', field: 'kanastas' | 'cards') => {
    setRound(state => {
      const updated = { ...state };
      updated[team][field] = value;
      return updated;
    });
  };

  const saveRound = () => {
    onFormSave({
      team1: {
        kanastaPoints: Number(round.team1.kanastas),
        cardPoints: Number(round.team1.cards)
      } as Round,
      team2: {
        kanastaPoints: Number(round.team2.kanastas),
        cardPoints: Number(round.team2.cards)
      } as Round
    });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Pressable onPress={() => saveRound()}>
        <Text style={styles.saveButton}>Save</Text>
      </Pressable>
      <View style={styles.container}>
        <View style={styles.group}>
          <Text style={styles.teamName}>{team1Name}</Text>
          <View>
            <Text style={styles.label}>Kanasta Points</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              placeholder="Enter points"
              onChangeText={value => updateRound(value, 'team1', 'kanastas')}
              value={round.team1.kanastas}
            />
          </View>
          <View>
            <Text style={styles.label}>Card Points</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              placeholder="Enter points"
              onChangeText={value => updateRound(value, 'team1', 'cards')}
              value={round.team1.cards}
            />
          </View>
        </View>
        <View style={styles.group}>
          <Text style={styles.teamName}>{team2Name}</Text>
          <View>
            <Text style={styles.label}>Kanasta Points</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              placeholder="Enter points"
              onChangeText={value => updateRound(value, 'team2', 'kanastas')}
              value={round.team2.kanastas}
            />
          </View>
          <View>
            <Text style={styles.label}>Card Points</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              placeholder="Enter points"
              onChangeText={value => updateRound(value, 'team2', 'cards')}
              value={round.team2.cards}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24
  },
  group: {
    paddingBottom: 24
  },
  teamName: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8
  },
  label: {
    fontSize: 18,
    fontWeight: '300',
    marginTop: 8
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 12,
    borderRadius: 4,
    borderColor: '#555555170'
  },
  saveButton: {
    textAlign: 'right',
    fontSize: 18,
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 16,
    color: '#007AFF'
  }
});
