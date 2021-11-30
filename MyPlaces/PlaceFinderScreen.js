import React, {useState, useEffect} from 'react';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import{ Input, Button, ListItem, Icon} from 'react-native-elements';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('myplacesdb.db');

export default function PlaceFinderScreen({navigation}) {
  const [address, setAddress] = useState('');
  const [data, setData] = useState([]);

  useEffect(() =>{
    db.transaction(tx => {
      tx.executeSql('create table if not exists places (id integer primary key not null, address text);');
    });
    updateList();  
    console.log("useEffect") 
    }, []);

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from places;', [], (_, { rows }) => {
        setData(rows._array)
      }
      ); 
    });
  }

  const deleteAddress = (id)  => {
    Alert.alert(
      "Do you want to remove the address?",
      "The address will be deleted permanently",
      [
        {
          text: "Cancel",
        },
        { text: "OK", onPress: () => {
          db.transaction(tx => {
            tx.executeSql(`delete from places where id=${id}`);    
          }, null)
    
          updateList();   
        }}
      ])
  }

  const navigateAddress = (saveEnabled, address)  => {
    navigation.navigate('Map', {saveEnabled, address, updateList});
  }

  return (
    <View style={styles.container}>
        <View style={styles.fieldcontainer}>
          <Input placeholder='Type address' label='PLACEFINDER' onChangeText={(text) => setAddress(text)} value={address}/>
        </View>
        <View style={styles.buttoncontainer}>
          <Button 
            raised title="SHOW ON MAP" 
            onPress={() => navigateAddress(true, address)} 
          />
          </View>
          <View>
          <FlatList 
            keyExtractor={item => item.id}
            data={data} 
            renderItem={({item}) => (
              <ListItem bottomDivider onPress={() => navigateAddress(false, item.address)} onLongPress={() => deleteAddress(item.id)}> 
                <ListItem.Content>
                  <ListItem.Title>{item.address}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Subtitle>Show on map</ListItem.Subtitle>
                <ListItem.Chevron />
              </ListItem>
              )} />
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