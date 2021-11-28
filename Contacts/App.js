import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, StatusBar} from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {

  const [contacts, setContacts] = useState([]);

  const getContacts= async() => { 
    const { status} = await Contacts.requestPermissionsAsync();
    if (status=== 'granted') {
      const { data } = await Contacts.getContactsAsync({fields:[Contacts.Fields.PhoneNumbers],});
      let array = []
      for (let person of data) {
        const firstName = (person.firstName === undefined) ? '' : person.firstName;
        const lastName = (person.lastName === undefined) ? '' : person.lastName;
        const phoneNumbers = (person.phoneNumbers === undefined) ? [] : person.phoneNumbers;
        const number = phoneNumbers.length > 0 ? phoneNumbers[0].number : ''
        array.push({id: person.id, firstName: firstName, lastName: lastName, number: number});
      }
      setContacts(array)
    }
    
  }

  return (
    <View style={styles.container}>
      <FlatList 
        keyExtractor={item => item.id}
        data ={contacts} 
        renderItem={({item}) => 
          <Text>{`${item.firstName} ${item.lastName} ${item.number}`}</Text>
        }/>
      <Button title="GetContact" onPress={getContacts} />
      <StatusBar style="auto"/>
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

