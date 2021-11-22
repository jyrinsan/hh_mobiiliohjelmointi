import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList} from 'react-native';
import { initializeApp} from 'firebase/app';
import { getDatabase, push, del, ref, onValue} from "firebase/database";

const firebaseConfig= {
  apiKey:"AIzaSyCTUZ1xIFnGLlMCQgEgm7BUO87LcBAx_3w",
  authDomain:"sshoppinglist-f01f5.appspot.com",
  databaseURL:"https://shoppinglist-f01f5-default-rtdb.firebaseio.com",
  projectId:"shoppinglist-f01f5",
  storageBucket:"shoppinglist-f01f5.appspot.com",
  messagingSenderId:"54449XX3822XX"
  };

  const app= initializeApp(firebaseConfig);
  const database= getDatabase(app);

export default function App() {

  const[item, setItem] = useState({id: '', product: '', amount: ''});
  const[data, setData] = useState([]);

  useEffect(() =>{
    const itemsRef= ref(database, 'items/')
    onValue(itemsRef, (snapshot) =>{
    const data= snapshot.val();
    console.log("saatiin data",data);
    if (data != null)
      setData(Object.values(data));
    })
    }, []);

  // Save item
  const saveItem = () => {
    push(ref(database, 'items/'), {
      'product':item.product, 'amount':item.amount
      });

    setItem({id: '', product: '', amount: ''});
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
                  <Text key={item.id}>{`${item.product}, ${item.amount}`}
                  </Text>
            )}} />
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

