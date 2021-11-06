import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';

export default function CalculatorScreen({navigation}) {
  
  const plusbuttonPressed= () => {
    const res = Number(text1)+Number(text2);
    setResult(res);
    const text = `${text1} + ${text2} = ${res}`;
    setData([...data, { key: text }]);
    setText1('');
    setText2('');
  }
  const minusbuttonPressed= () =>{
    const res = Number(text1)-Number(text2);
    setResult(res);
    const text = `${text1} - ${text2} = ${res}`;
    setData([...data, { key: text }]);
    setText1('');
    setText2('');
  }

  const[text1, setText1] = useState('');
  const[text2, setText2] = useState('');
  const[result, setResult] = useState('');
  const[data, setData] = useState([]);

  return (
    <View style={styles.container}>
        <View style={{paddingVertical: 30}} />
        <View style={styles.fieldcontainer}>
          <Text>{`Result: ${result}`}</Text>
          <View style={{paddingVertical: 6}} />
          <TextInput keyboardType='numeric' style={{width:200, borderColor:'gray', borderWidth:1}} onChangeText={text1=> setText1(text1)} value={text1}/>
          <View style={{paddingVertical: 6}} />
          <TextInput keyboardType='numeric' style={{width:200, borderColor:'gray', borderWidth:1}} onChangeText={text2=> setText2(text2)} value={text2}/>
        </View>
        <View style={{paddingVertical: 6}} />
        <View style={styles.buttoncontainer}>
          <View />
          <View />
          <Button title="+" onPress={plusbuttonPressed} />
          <Button title="-" onPress={minusbuttonPressed} />
          <Button 
            title="History" 
            onPress={() => navigation.navigate('History', {data})} 
          />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinput: {
    width:200 , 
    borderColor: 'gray', 
    borderWidth: 1,
  },
  buttoncontainer: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-evenly',
  },
});