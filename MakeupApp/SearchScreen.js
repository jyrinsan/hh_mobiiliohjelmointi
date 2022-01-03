import React, {useState, useEffect} from 'react';
import { StyleSheet, Alert } from 'react-native';
import{ Header } from 'react-native-elements';
import {
  Select,
  VStack,
  CheckIcon,
  Center,
  NativeBaseProvider,
  Button
} from "native-base"
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('makeupapp.db');

export default function SearchScreen({navigation}) {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedProductType, setSelectedProductType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const navigateToResults = ()  => {
    fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${selectedBrand}&product_type=${selectedProductType}&category=${selectedCategory}&tag=${selectedTag}`)
    .then(response=> response.json())
    .then(responseData=> {
      navigation.navigate('Results', {responseData});
    })
    .catch (err=> Alert.alert('Error', err ))  
  }

  const brands = [
    { label: 'Maybelline', value: 'maybelline' },
    { label: 'Almay', value: 'almay' },
    { label: 'Alva', value: 'alva' },
    { label: 'Anna sui', value: 'anna sui' },
    { label: 'Annabelle', value: 'annabelle' },
    { label: 'Benefit', value: 'benefit' },
  ];

  const productTypes = [
    { label: 'Blush', value: 'blush' },
    { label: 'Bronzer', value: 'bronzer' },
  ];

  const categories= [
    { label: 'Liquid', value: 'liquid' },
    { label: 'Cream', value: 'cream' },
    { label: 'Powder', value: 'powder' },
  ];

  const tags = [
    { label: 'Vegan', value: 'vegan' },
    { label: 'Natural', value: 'natural' },
  ];

  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Select
          width='100%'
          variant='underlined'
          color='secondary.600'
          borderColor='secondary.600'
          placeholderTextColor='secondary.300'
          selectedValue={selectedBrand}
          placeholder="Choose Brand"
          _selectedItem={{
            bg: "secondary.600",
            endIcon: <CheckIcon size="5" />,
          }}
          _item={{
            bg: "secondary.100",
          }}
          mt={1}
          mb={1}
          onValueChange={(itemValue) => setSelectedBrand(itemValue)}
        >
          {Object.values(brands).map((item) => {
            return (<Select.Item label={item.label} value={item.value} key={item.value}/>)
          })}
        </Select>
        <Select
          width='100%'
          variant='underlined'
          color='secondary.600'
          placeholderTextColor='secondary.300'
          borderColor='secondary.600'
          selectedValue={selectedProductType}
          placeholder="Choose Product type"
          _selectedItem={{
            bg: "secondary.600",
            endIcon: <CheckIcon size="5" />,
          }}
          _item={{
            bg: "secondary.100",
          }}
          mt={1}
          mb={1}
          onValueChange={(itemValue) => setSelectedProductType(itemValue)}
        >
          {Object.values(productTypes).map((item) => {
            return (<Select.Item label={item.label} value={item.value} key={item.value}/>)
          })}
        </Select>
        <Select
          width='100%'
          variant='underlined'
          color='secondary.600'
          placeholderTextColor='secondary.300'
          borderColor='secondary.600'
          selectedValue={selectedCategory}
          placeholder="Choose Category"
          _selectedItem={{
            bg: "secondary.600",
            endIcon: <CheckIcon size="5" />,
          }}
          _item={{
            bg: "secondary.100",
          }}
          mt={1}
          mb={1}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        >
          {Object.values(categories).map((item) => {
            return (<Select.Item label={item.label} value={item.value} key={item.value}/>)
          })}
        </Select>
        <Select
          width='100%'
          variant='underlined'
          color='secondary.600'
          placeholderTextColor='secondary.300'
          borderColor='secondary.600'
          selectedValue={selectedTag}
          placeholder="Choose Tag"
          _selectedItem={{
            bg: "secondary.600",
            endIcon: <CheckIcon size="5" />,
          }}
          _item={{
            bg: "secondary.100",
          }}
          mt={1}
          mb={1}
          onValueChange={(itemValue) => setSelectedTag(itemValue)}
        >
          {Object.values(tags).map((item) => {
            return (<Select.Item label={item.label} value={item.value} key={item.value}/>)
          })}
        </Select>
        <Button colorScheme="secondary"
            onPress={() => navigateToResults()} 
          >SEARCH</Button>
      </Center>
    </NativeBaseProvider>
  );
}
