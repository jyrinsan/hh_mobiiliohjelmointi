import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Image, Alert} from 'react-native';

export default function App() {
  
  const buttonPressed= () =>{
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response=>response.json())
    .then(responseData=> {
      console.log(responseData.meals)
      setData(responseData.meals)
    })
    .catch (err=> Alert.alert('Error', error) )
  }

  const[keyword, setKeyword] = useState('');
  const[data, setData] = useState([]);

  return (
    <View style={styles.container}>
        <FlatList 
            style={{margin: "10%"}}
            keyExtractor={(item,  index) => index.toString()}
            data ={data} 
            renderItem={({item}) => 
              <View>
                <Text style={{fontSize: 18 , fontWeight: "bold"}}>{item.strMeal}</Text>
                <Image style={styles.logo} source={{uri:item.strMealThumb,}} />
              </View>}/>
        <TextInput style={{width:200, borderColor:'gray', borderWidth:1}} onChangeText={keyword=> setKeyword(keyword)} value={keyword}/>
        <Button title="FIND" onPress={buttonPressed} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'space-around',
  },
  logo: {
    width: 66,
    height: 58,
  },
});

