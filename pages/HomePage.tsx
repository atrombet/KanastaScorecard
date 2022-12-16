import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, useColorScheme, StyleSheet, Button, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types';
import { Score } from '../interfaces';

interface HomePageProps {
  navigation: any;
}

export const HomePage: React.FC<HomePageProps> = ({ navigation }) => {
  /***************************************
   * Setup
   ***************************************/
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };

  const [games, setGames] = useState<Score[]>([]);
  const [loadingGames, setLoadingGames] = useState<boolean>(false);

  /***************************************
   * Methods
   ***************************************/
  const newGame = () => {
    const gameId = `@KanastaScore_${uuid.v4()}`;
    navigation.navigate('Play', { gameId, isNewGame: true });
  };

  /***************************************
   * On Load
   ***************************************/
  useEffect(() => {
    const getGames = async (): Promise<readonly KeyValuePair[]> => {
      const keys = await AsyncStorage.getAllKeys();
      const filteredKeys = keys.filter(key => key.indexOf('@KanastaScore_') > -1);
      return filteredKeys.length ? await AsyncStorage.multiGet(filteredKeys) : Promise.resolve([]);
    };

    setLoadingGames(true);
    getGames()
      .then((stringGames: readonly KeyValuePair[]) => {
        setGames(stringGames.map((keyVal: KeyValuePair) => ({ ...JSON.parse(keyVal[1] || ''), gameId: keyVal[0] })));
      })
      .catch(() => {})
      .finally(() => {
        setLoadingGames(false);
      });
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View style={styles.newGameButton}>
          <Button title="Start a new game" onPress={() => newGame()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  newGameButton: {
    padding: 24
  }
});
