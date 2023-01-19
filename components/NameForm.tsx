import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, SafeAreaView, useColorScheme, Pressable } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface NameFormProps {
  onFormSave: (team1Name: string, team2Name: string) => void;
  initValues: NameFormFields;
}

interface NameFormFields {
  team1Name: string;
  team2Name: string;
}

export const NameForm: React.FC<NameFormProps> = ({ initValues, onFormSave }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };

  const [names, setNames] = useState<NameFormFields>(initValues);

  const saveNames = () => {
    onFormSave(names.team1Name, names.team2Name);
  };

  const updateName = (name: string, prop: 'team1Name' | 'team2Name') => {
    setNames(state => ({ ...state, [prop]: name }));
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Pressable onPress={() => saveNames()}>
        <Text style={styles.saveButton}>Save</Text>
      </Pressable>
      <View style={styles.container}>
        <View style={styles.group}>
          <Text style={styles.teamName}>Team 1 Name</Text>
          <TextInput
            style={styles.input}
            returnKeyType="done"
            placeholder="Enter team name"
            onChangeText={value => updateName(value, 'team1Name')}
            value={names.team1Name}
          />
        </View>
        <View style={styles.group}>
          <Text style={styles.teamName}>Team 2 Name</Text>
          <TextInput
            style={styles.input}
            returnKeyType="done"
            placeholder="Enter team name"
            onChangeText={value => updateName(value, 'team2Name')}
            value={names.team2Name}
          />
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
