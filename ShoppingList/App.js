import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList} from 'react-native';

export default function App() {
  
  const addbuttonPressed= () =>{
    setData([...data, { key: text }]);
  }

  const clearbuttonPressed= () =>{
    setData([]);
  }

  const[text, setText] = useState('');
  const[data, setData] = useState([]);

  return (
    <View style={styles.container}>
        <View style={{paddingVertical: 30}} />
        <View style={styles.fieldcontainer}>
          <TextInput style={{width:200, borderColor:'gray', borderWidth:1}} onChangeText={text=> setText(text)} value={text}/>
         </View>
        <View style={{paddingVertical: 6}} />
        <View style={styles.buttoncontainer}>
          <View />
          <View />
          <Button title="ADD" onPress={addbuttonPressed} />
          <Button title="CLEAR" onPress={clearbuttonPressed} />
          <View />
          <View />
        </View>
        <View style={{paddingVertical: 15}} />
        <View style={styles.fieldcontainer}>
          <Text>Shopping List</Text>
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
    justifyContent:'center',
  },
});

