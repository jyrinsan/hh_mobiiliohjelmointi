import React, {useEffect} from 'react';
import { StyleSheet, View, FlatList} from 'react-native';
import { Tile, Image, Text } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('makeupdb.db');

export default function HomeScreen() {

  useEffect(() =>{
    db.transaction(tx => {
      tx.executeSql('drop table if exists favorites;');
    },(error) => console.log(error), console.log('table dropped'));
    db.transaction(tx => {
      tx.executeSql('create table if not exists favorites (id integer primary key not null, name text, brand text, product_type text, image_link text, product_api_url);');
    },(error) => console.log(error), console.log('table created'));
  });

  const images = [
    {id: 1, uri: 'http://makeup-api.herokuapp.com/assets/lips-c35ec4a3350ec779c6bf6a785981ad9ef2e21bd9fe26a2be1c766d56edb2e11f.png'},
    {id: 2, uri: 'http://makeup-api.herokuapp.com/assets/lips-c35ec4a3350ec779c6bf6a785981ad9ef2e21bd9fe26a2be1c766d56edb2e11f.png'},
    {id: 3, uri: 'http://makeup-api.herokuapp.com/assets/lips-c35ec4a3350ec779c6bf6a785981ad9ef2e21bd9fe26a2be1c766d56edb2e11f.png'},
    {id: 4, uri: 'http://makeup-api.herokuapp.com/assets/lips-c35ec4a3350ec779c6bf6a785981ad9ef2e21bd9fe26a2be1c766d56edb2e11f.png'},
    {id: 5, uri: 'http://makeup-api.herokuapp.com/assets/lips-c35ec4a3350ec779c6bf6a785981ad9ef2e21bd9fe26a2be1c766d56edb2e11f.png'},
    {id: 6, uri: 'http://makeup-api.herokuapp.com/assets/lips-c35ec4a3350ec779c6bf6a785981ad9ef2e21bd9fe26a2be1c766d56edb2e11f.png'}
  ]

  return (
    <View>
      <Text>{images[0].uri}</Text>
      <FlatList
        data={images}
        renderItem={(item) => 
          <Image
          source={{
            uri:
              item.uri,
          }}
          style={{width: 200, height: 200}}
        />}
        keyExtractor={(item) => item.id}
        numColumns = {2}
      />

    </View>
  );
}

const styles = StyleSheet.create({
list: {
  width: '100%',
  backgroundColor: '#000',
},
item: {
  aspectRatio: 1,
  width: '100%',
  flex: 1,
},
});
