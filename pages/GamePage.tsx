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
  const { gameId, isNewGame } = route.params;

  /***************************************
   * Setup
   ***************************************/
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };

  const [score, setScore] = useState<Score>({ gameId, team1Name: 'Team 1', team1: [], team2Name: 'Team 2', team2: [] });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  /***************************************
   * Methods
   ***************************************/
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
    const save = async () => {
      return await AsyncStorage.setItem(gameId, JSON.stringify(score));
    };
    setSaving(true);
    save()
      .catch(() => {
        Alert.alert('There was a problem saving the game.');
      })
      .finally(() => {
        setSaving(false);
      });
  }, [setSaving, gameId, score]);

  /***************************************
   * On Load
   ***************************************/
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={() => saveGame()} title="Save" />
    });
    console.log(gameId);
    if (!isNewGame) {
      const fetchGame = async (): Promise<Score | null> => {
        const gameString = await AsyncStorage.getItem(gameId);
        if (gameString) {
          return JSON.parse(gameString) as Score;
        } else {
          return null;
        }
      };
      setLoading(true);
      fetchGame()
        .then((savedGame: Score | null) => {
          if (savedGame) {
            setScore(savedGame);
          }
        })
        .catch(() => {
          Alert.alert('Could not read game data.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [gameId, isNewGame, navigation, saveGame]);

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
          <RoundForm team1Name="Team 1" team2Name="Team 2" onFormSave={onFormSave} />
        </Modal>
        <View style={styles.loaderWrapper}>
          {saving || loading ? (
            <View style={styles.loader}>
              <Text>{saving ? 'Saving' : 'Loading'}</Text>
              <ActivityIndicator />
            </View>
          ) : (
            <View />
          )}
        </View>
        <View style={styles.container}>
          <View style={styles.teamColumn}>
            <Text style={styles.teamName}>Team 1</Text>
            <Scorecard rounds={score.team1} />
          </View>
          <View style={styles.teamColumn}>
            <Text style={styles.teamName}>Team 2</Text>
            <Scorecard rounds={score.team2} />
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
  teamName: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600'
  },
  recordButton: {
    padding: 24
  }
});
