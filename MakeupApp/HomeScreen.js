import React, {useEffect} from 'react';
import { View, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('makeupdb.db');

export default function HomeScreen() {

  useEffect(() =>{
    db.transaction(tx => {
      tx.executeSql('drop table favorites;');
    },(error) => console.log(error), console.log('table dropped'));
    db.transaction(tx => {
      tx.executeSql('create table if not exists favorites (id integer primary key not null, name text, brand text, product_type text, image_link text, product_link text);');
    },(error) => console.log(error), console.log('table created'));
  });

  return (
    <View><Text>Moi</Text></View>
  );
}
