import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomePage, GamePage } from './pages';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Kanasta Scorecards">
        <Stack.Screen name="Kanasta Scorecards" component={HomePage} />
        <Stack.Screen name="Play" component={GamePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
