import React, {useState, useEffect} from 'react';
import { StyleSheet, StatusBar, View, Text } from 'react-native';
import { Input, Button, ListItem, Avatar, Icon } from 'react-native-elements';
import { WebView} from 'react-native-webview'
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('myplacesdb.db');

export default function ProductScreen({ route, navigation}) {

  const { item } = route.params;
  const [favorite, setFavorite] = useState(false);

  useEffect(() =>{
    db.transaction(tx => {
      tx.executeSql('create table if not exists favorites (id integer primary key not null, itemId integer, name text);');
    });

    updateList();
    }, []);

    const updateList = () => {
      db.transaction(tx => {
        tx.executeSql('select * from favorites where itemId=?', [item.id], (_, { rows }) => {
          //setData(rows._array)
          console.log("löytyi favoriteja", rows._array)
        }
        ); 
      });
    }

  const saveFavorite = (favo) => {
    console.log(`saving item id: ${item.id}, name: ${item.name} to favorites`)
    db.transaction(tx => {
      tx.executeSql('insert into favorites (name) values (?, ?);',[item.id, item.name]);    
    }, null)

    setFavorite(favo);
  }

  return (
    <View style={styles.container}>
      <Icon
        reverse
        name= {favorite ? 'heart' : 'heart-outline'}
        type='material-community'
        color='#517fa4'
        onPress={() => saveFavorite(!favorite)} />
      <WebView
        source={{ uri: item.product_link }}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  buttoncontainer: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'center',
  },
});