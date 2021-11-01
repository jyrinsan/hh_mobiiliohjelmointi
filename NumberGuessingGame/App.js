import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert} from 'react-native';
import { StatusBar } from 'expo-status-bar';

let randomnumber = Math.floor(Math.random() * 100) + 1;
let counter = 0;

export default function App() {

  const buttonPressed= () => {
    counter++;
    if (number == randomnumber) {
      Alert.alert(`You guessed the number in ${counter} guesses`);
      counter = 0;
      randomnumber = Math.floor(Math.random() * 100) + 1;
    }
    else if (number < randomnumber)
      setText(`Your guess ${number} is too low`);
    else 
      setText(`Your guess ${number} is too high`);
  }

  const [text, setText] = useState('Guess a number between 1-100');
  const [number, setNumber] = useState('');

  return (
    <View style={styles.container}>
          <Text>{text}</Text>
          <View style={{paddingVertical: 6}} />
          <TextInput keyboardType='numeric' style={styles.input}  onChangeText={number=> setNumber(number)} value={number}/>
          <View style={{paddingVertical: 6}} />
          <Button title="MAKE GUESS" onPress={buttonPressed} />
          <View style={{paddingVertical: 6}} />
          <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width:200 , 
    borderColor: 'gray', 
    borderWidth: 1,
  },
});
