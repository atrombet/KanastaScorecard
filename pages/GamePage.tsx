import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  Text,
  StyleSheet,
  View,
  Button,
  Modal,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Scorecard, RoundForm, AllHands } from '../components';
import { Score, Round } from '../interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface GamePageProps {
  route: any;
  navigation: any;
}

export const GamePage: React.FC<GamePageProps> = ({ route, navigation }) => {
  /***************************************
   * Route Params
   ***************************************/
  const { game } = route.params;

  /***************************************
   * Setup
   ***************************************/
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };

  const [score, setScore] = useState<Score>(game);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  /***************************************
   * Methods
   ***************************************/
  const team1Total = useCallback(() => {
    return score.team1.length
      ? score.team1.reduce((set: number, round: Round): number => {
          return set + round.kanastaPoints + round.cardPoints;
        }, 0)
      : 0;
  }, [score]);

  const team2Total = useCallback(() => {
    return score.team2.length
      ? score.team2.reduce((set: number, round: Round): number => {
          return set + round.kanastaPoints + round.cardPoints;
        }, 0)
      : 0;
  }, [score]);

  const determineWinner = useCallback(() => {
    const total1 = team1Total();
    const total2 = team2Total();
    if (total1 >= 20000 || total2 >= 20000) {
      return total1 > total2 ? 'team1' : 'team2';
    } else {
      return null;
    }
  }, [team1Total, team2Total]);

  const onFormSave = (teamRounds: { team1: Round; team2: Round }) => {
    setScore(state => {
      const newScore = { ...state };
      newScore.team1.push(teamRounds.team1);
      newScore.team2.push(teamRounds.team2);
      return newScore;
    });
    setModalVisible(false);
  };

  const saveGame = useCallback(() => {
    const saveTime = new Date().toISOString();
    const winner = determineWinner();
    const save = async () => {
      return await AsyncStorage.setItem(
        score.gameId,
        JSON.stringify({
          ...score,
          lastUpdated: saveTime,
          winner
        })
      );
    };
    setSaving(true);
    save()
      .then(() => {
        setScore(state => ({
          ...state,
          lastUpdated: saveTime,
          winner
        }));
      })
      .catch(() => {
        Alert.alert('There was a problem saving the game.');
      })
      .finally(() => {
        setSaving(false);
      });
  }, [setSaving, score, determineWinner]);

  /***************************************
   * Hooks
   ***************************************/
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={() => saveGame()} title="Save" />
    });
  }, [navigation, saveGame]);

  /***************************************
   * Render
   ***************************************/
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <Modal
          animationType="slide"
          presentationStyle="formSheet"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <RoundForm team1Name={score.team1Name} team2Name={score.team2Name} onFormSave={onFormSave} />
        </Modal>
        <View style={styles.loaderWrapper}>
          {saving ? (
            <View style={styles.loader}>
              <Text>Saving game</Text>
              <ActivityIndicator />
            </View>
          ) : (
            <View />
          )}
        </View>
        <View style={styles.container}>
          <View style={styles.teamColumn}>
            {determineWinner() === 'team1' ? <Text style={styles.winner}>Winner!</Text> : <></>}
            <Text style={styles.teamName}>{score.team1Name}</Text>
            <Scorecard total={team1Total()} />
          </View>
          <View style={styles.teamColumn}>
            {determineWinner() === 'team2' ? <Text style={styles.winner}>Winner!</Text> : <></>}
            <Text style={styles.teamName}>{score.team2Name}</Text>
            <Scorecard total={team2Total()} />
          </View>
        </View>
        <View style={styles.recordButton}>
          <Button title="Record a hand" onPress={() => setModalVisible(true)} />
        </View>
        <AllHands score={score} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loaderWrapper: {
    marginVertical: 8
  },
  loader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flexDirection: 'row',
    paddingTop: 24
  },
  teamColumn: {
    width: '50%',
    paddingHorizontal: 8
  },
  winner: {
    fontSize: 16,
    fontWeight: '300',
    marginTop: -20,
    textAlign: 'center'
  },
  teamName: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600'
  },
  recordButton: {
    padding: 24
  }
});
