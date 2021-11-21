import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList} from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('coursedb.db');

export default function App() {

  const[item, setItem] = useState({id: '', product: '', amount: ''});
  const[data, setData] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists item (id integer primary key not null, product text, amount text);');
    });
    updateList();    
  }, []);
  
  // Update shopping list
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from item;', [], (_, { rows }) =>
        setData(rows._array)
      ); 
    });
  }

  // Save item
  const saveItem = () => {
    db.transaction(tx => {
        tx.executeSql('insert into item (product, amount) values (?, ?);', [item.product, item.amount]);    
      }, null, updateList
    )
  }

  // Delete course
  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from item where id = ?;`, [id]);
      }, null, updateList
    )    
  }

  const productChanged = (value) => {
    setItem({...item, "product": value});
  }

  const amountChanged = (value) => {
    setItem({...item, "amount": value});
  }

  return (
    <View style={styles.container}>
        <View style={{paddingVertical: 30}} />
        <View style={styles.fieldcontainer}>
          <TextInput style={{width:200, borderColor:'gray', borderWidth:1}} onChangeText={productChanged} value={item.product}/>
          <TextInput style={{width:200, borderColor:'gray', borderWidth:1}} onChangeText={amountChanged} value={item.amount} />
         </View>
        <View style={{paddingVertical: 6}} />
        <View style={styles.buttoncontainer}>
          <View />
          <View />
          <Button title="ADD" onPress={saveItem} />
          <View />
          <View />
        </View>
        <View style={{paddingVertical: 15}} />
        <View style={styles.fieldcontainer}>
          <Text>Shopping List</Text>
          <FlatList 
            data ={data} 
            renderItem={({item}) => {
              return (
                <View>
                  <Text>{`${item.product}, ${item.amount}   `}
                    <Text style={{color: 'blue'}} onPress={() => 
                      deleteItem(item.id)
                    }>
                      Bought</Text>
                  </Text>
                </View>)}} />
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

