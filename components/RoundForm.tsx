import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from 'react-native';
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
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          <Text style={styles.teamName}>{team1Name}</Text>
          <View style={styles.teamGroup}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Canastas</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter points"
                returnKeyType="done"
                onChangeText={value => updateRound(value, 'team1', 'kanastas')}
                value={round.team1.kanastas}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Cards</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter points"
                returnKeyType="done"
                onChangeText={value => updateRound(value, 'team1', 'cards')}
                value={round.team1.cards}
              />
            </View>
          </View>
          <Text style={styles.teamName}>{team2Name}</Text>
          <View style={styles.teamGroup}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Canastas</Text>
              <TextInput
                style={styles.input}
                keyboardType="number-pad"
                placeholder="Enter points"
                returnKeyType="done"
                onChangeText={value => updateRound(value, 'team2', 'kanastas')}
                value={round.team2.kanastas}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Cards</Text>
              <TextInput
                style={styles.input}
                keyboardType="number-pad"
                placeholder="Enter points"
                returnKeyType="done"
                onChangeText={value => updateRound(value, 'team2', 'cards')}
                value={round.team2.cards}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 36
  },
  teamGroup: {
    paddingBottom: 24,
    flexDirection: 'row',
    gap: 8
  },
  inputGroup: {
    flex: 1
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
    borderColor: '#555555'
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
