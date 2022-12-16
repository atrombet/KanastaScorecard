import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, useColorScheme, StyleSheet, Button, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const HomePage: React.FC = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View style={styles.newGameButton}>
          <Button title="Start a new game" onPress={() => navigation.navigate('Play')} />
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
