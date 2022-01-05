import React, {useState, useEffect} from 'react';
import { StyleSheet, StatusBar, View, FlatList } from 'react-native';
import { ListItem, Avatar, Text } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('makeupdb.db');

export default function FavoriteScreen({ route, navigation}) {

  const [data, setData] = useState([]);

  useEffect(() => {
    updateList();
  });

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from favorites;', [], (_, { rows }) => {
        setData(rows._array);
        }
      ); 
    });
  }

  const navigateToProductScreen = (id) => {
    data.map((favorite) => {
      const item = {id: favorite.id, product_api_url: favorite.product_api_url}
      item.id === id ? navigation.navigate('Product', {item}) : '';
    })
  }

  return (
    <View style={styles.container}>
      {data.length < 1  && 
      <View style={styles.textcontainer}>
        <Text h4 h4Style={{color: 'pink', textAlign: 'center'}}>{'No favorites found !'}</Text> 
      </View> }
      <View style={styles.listcontainer}>
      {data.length > 0 &&
      <FlatList 
            keyExtractor={item => item.id}
            data={data} 
            renderItem={({item}) => (
              <ListItem bottomDivider onPress={() => navigateToProductScreen(item.id)}> 
                <Avatar
                    rounded
                    size="large"
                    source={{
                      uri:
                      item.image_link,
                    }}
                  />
                  <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{`${item.brand}, ${item.product_type}`}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
              )} /> }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
  },
  listcontainer: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'center',
  },
  textcontainer: {
    alignItems: 'center',
    justifyContent:'center',
  },
});