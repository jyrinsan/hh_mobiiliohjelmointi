import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList} from 'react-native';

export default function App() {
  
  const plusbuttonPressed= () => {
    const res = Number(text1)+Number(text2);
    setResult(res);
    const text = `${text1} + ${text2} = ${res}`;
    setData([...data, { key: text }]);
  }
  const minusbuttonPressed= () =>{
    const res = Number(text1)-Number(text2);
    setResult(res);
    const text = `${text1} - ${text2} = ${res}`;
    setData([...data, { key: text }]);
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
          <View />
          <View />
        </View>
        <View style={{paddingVertical: 15}} />
        <View style={styles.fieldcontainer}>
          <Text>History</Text>
          <FlatList 
            data ={data} 
            renderItem={({item}) => 
              <Text>{item.key}</ Text>} />
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

