import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import{ Header, Input, Button, ListItem, Icon } from 'react-native-elements';

export default function App() {

  const[item, setItem] = useState({id: '', product: '', amount: ''});
  const[data, setData] = useState([]);

  const productChanged = (value) => {
    setItem({...item, "product": value});
  }

  const amountChanged = (value) => {
    setItem({...item, "amount": value});
  }

  const saveItem= () =>{
    setData([...data, {
      id: Date.now(), product: item.product, amount: item.amount
      }]);

      setItem({id: '', product: '', amount: ''})
  }

  const deleteItem = (id) => {
    setData(data.filter(item => item.id != id))
  }

  return (
    <View style={styles.container}>
        <Header
          leftComponent={{}}
          centerComponent={{text:'SHOPPINGLIST',style:{color:'#fff'}}}
          rightComponent={{}}
        />
        <View style={{paddingVertical: 30}} />
        <View style={styles.fieldcontainer}>
          <Input placeholder='Type product' label='Product' onChangeText={productChanged} value={item.product}/>
          <Input placeholder='Type amount' label='Amount' onChangeText={amountChanged} value={item.amount}/>
        </View>
        <View style={{paddingVertical: 6}} />
        <View style={styles.buttoncontainer}>
          <View />
          <View />
          <Button raised icon={{name:'save', color: 'white'}} onPress={saveItem} title="SAVE"/>
          <View />
          <View />
        </View>
        <View style={{paddingVertical: 15}} />
        <View>
          <FlatList 
            keyExtractor={item => item.id}
            data={data} 
            renderItem={({item}) => (
              <ListItem bottomDivider > 
                <ListItem.Content>
                  <ListItem.Title>{item.product}</ListItem.Title>
                  <ListItem.Subtitle >{item.amount}</ListItem.Subtitle>
                </ListItem.Content>
                <Icon
                  name='delete' color='red' onPress={() => deleteItem(item.id)}/>
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
    justifyContent:'center',
  },
});

