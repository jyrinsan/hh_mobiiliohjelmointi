import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';

export default function App() {
  
  const plusbuttonPressed= () => {
    setResult(Number(text1)+Number(text2));
  }
  const minusbuttonPressed= () =>{
    setResult(Number(text1)-Number(text2));
  }

  const[text1, setText1] = useState('');
  const[text2, setText2] = useState('');
  const[result, setResult] = useState('');

  return (
    <View style={styles.container}>
        <View style={styles.fieldcontainer}>
          <Text>{`Result: ${result}`}</Text>
          <TextInput keyboardType='numeric' style={{width:200, borderColor:'gray', borderWidth:1}} onChangeText={text1=> setText1(text1)} value={text1}/>
          <TextInput keyboardType='numeric' style={{width:200, borderColor:'gray', borderWidth:1}} onChangeText={text2=> setText2(text2)} value={text2}/>
        </View>
        <View style={styles.buttoncontainer}>
          <View />
          <View />
          <Button title="+" onPress={plusbuttonPressed} />
          <Button title="-" onPress={minusbuttonPressed} />
          <View />
          <View />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fieldcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textinput: {
    width:200 , 
    borderColor: 'gray', 
    borderWidth: 1,
  },
  buttoncontainer: {
    flex: 1,
    flexDirection:'row',
    alignItems: 'flex-start',
    justifyContent:'space-evenly',
  },
});
