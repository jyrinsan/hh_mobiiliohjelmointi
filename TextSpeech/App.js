import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, StatusBar} from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {

  const [text, setText] = useState('');

  const hearSpeech = ()  => {
    Speech.speak(text);
  }

  return (
    <View style={styles.container}>
      <View style={styles.fieldcontainer}>
        <TextInput style={styles.textinput}
          multiline={true}
          numberOfLines={4}
          onChangeText={text=> setText(text)} value={text}/>
          </View>
      <View style={styles.buttoncontainer}>
        <Button title="PRESS TO HEAR TEXT" onPress={hearSpeech} />
      </View>
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fieldcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinput: {
    width:200 , 
    borderColor: 'gray', 
    borderWidth: 1,
    margin: 10,
  },
  buttoncontainer: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'center',
  },
});

