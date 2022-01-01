import React, {useState, useEffect} from 'react';
import { StyleSheet, StatusBar, View, Text } from 'react-native';
import { Input, Button, ListItem, Avatar, Icon } from 'react-native-elements';
import { WebView} from 'react-native-webview'
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('makeupdb.db');

export default function ProductScreen({ route, navigation}) {

  const { item } = route.params;
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    findFavorite();
  }, []);

  const findFavorite = () => {
    db.transaction(tx => {
      tx.executeSql('select count(*) as lkm from favorites where id=?;', [item.id], (_, {rows}) => {
        console.log("oliko tämä product favorite", rows._array[0].lkm>0);
        setFavorite(rows._array[0].lkm>0)
        }, () => console.log('find error'), () => console.log('find onnistui')
      ); 
    });
  }
  
  const saveFavorite = (favo) => {
    if (favo) {
    db.transaction(tx => {
      tx.executeSql('insert into favorites (id, name, brand, product_type, image_link, product_link) values (?, ?, ?, ?, ?, ?);',[item.id, item.name, item.brand, item.product_type, item.image_link, item.product_link]);    
    }, (error) => console.log(error), () => console.log('insert onnistui'));
  } else {
    db.transaction(tx => {
      tx.executeSql('delete from favorites where id=?;',[item.id]);
    }, (error) => console.log(error), () => console.log('delete onnistui'));    
  }

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