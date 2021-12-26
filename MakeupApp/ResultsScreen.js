import React, {useState, useEffect} from 'react';
import { StyleSheet, StatusBar, View, TextInput, Alert, FlatList} from 'react-native';
import { Input, Button, ListItem, Avatar } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('myplacesdb.db');

export default function ResultsScreen({ route, navigation}) {

  const { responseData } = route.params;

  const navigateToProductScreen = (id) => {
    responseData.map((item) => {
      item.id === id ? navigation.navigate('Product', {item}) : '';
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttoncontainer}>
      <FlatList 
            keyExtractor={item => item.id}
            data={responseData} 
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
              )} />
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