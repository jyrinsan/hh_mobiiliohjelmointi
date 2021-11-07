import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function App() {

  const apikey = '92d802066b349d9d806189ee5b131ba1';
  const [selectedValuutta, setSelectedValuutta] = useState('GBP')
  const [kurssit, setKurssit] = useState([])
  const [maara, setMaara] = useState('')
  const [tulos, setTulos] = useState('')

  React.useEffect(()=>{
    fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${apikey}`)
    .then(response=>response.json())
    .then(responseData=> {
      setKurssit(responseData.rates)
    })
    .catch (err=> Alert.alert('Error', error) )
  },[])

  
  const buttonPressed = ()  => {
    {Object.entries(kurssit).map((item) => {
      if (item[0] == selectedValuutta) {
        return setTulos(item[1] * maara);
      }
   })}

  }

  return (
    <View style={styles.container}>
      <Image source={require('./img/euro.png')} />
      <Text style={{fontSize: 24 , fontWeight: "bold", padding: '5%'}}>{`${Number(tulos).toFixed(2)} €`}</Text>
      <View style={styles.rowcontainer}>
        <TextInput style={{width:100, borderColor:'gray', borderWidth:1}} onChangeText={maara=> setMaara(maara)} value={maara}/>
 
        <Picker
          style = {{width: 150}}
          selectedValue={selectedValuutta}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValuutta(itemValue)}}>
          
            {Object.keys(kurssit).map((item) => {
               return (<Picker.Item label={item} value={item} key={item}/>)
            })}
        </Picker>
      </View>
        <Button title="CONVERT" onPress={buttonPressed} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
  },
  rowcontainer: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'center',
  },
});

