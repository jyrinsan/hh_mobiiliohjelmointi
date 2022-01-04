import React, {useState} from 'react';
import { Alert } from 'react-native';
import {
  Select,
  Stack,
  Row,
  CheckIcon,
  Center,
  NativeBaseProvider,
  Button,
  FormControl,
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

  const clearForm = () => {
    setSelectedBrand('');
    setSelectedProductType('');
    setSelectedCategory('');
    setSelectedTag('');
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
        <FormControl>
          <Stack mx="4">
            <FormControl.Label>Brand</FormControl.Label>
            <Select
              width='100%'
              variant='underlined'
              color='secondary.600'
              placeholderTextColor='secondary.300'
              borderColor='secondary.600'
              selectedValue={selectedBrand}
              placeholder="Select brand"
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
          </Stack>
        </FormControl>
        <Row height="5"/>
        <FormControl>
          <Stack mx="4">
            <FormControl.Label>Product type</FormControl.Label>
            <Select
              width='100%'
              variant='underlined'
              color='secondary.600'
              placeholderTextColor='secondary.300'
              borderColor='secondary.600'
              selectedValue={selectedProductType}
              placeholder="Select Product type"
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
          </Stack>
        </FormControl>
        <Row height="5"/>
        <FormControl>
          <Stack mx="4">
            <FormControl.Label>Category</FormControl.Label>
            <Select
              width='100%'
              variant='underlined'
              color='secondary.600'
              placeholderTextColor='secondary.300'
              borderColor='secondary.600'
              selectedValue={selectedCategory}
              placeholder="Select category"
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
          </Stack>
        </FormControl>
        <Row height="5"/>
        <FormControl>
          <Stack mx="4">
            <FormControl.Label>Tag</FormControl.Label>
            <Select
            width='100%'
            variant='underlined'
            color='secondary.600'
            placeholderTextColor='secondary.300'
            borderColor='secondary.600'
            selectedValue={selectedTag}
            placeholder="Select Tag"
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
          </Stack>
        </FormControl>
        <Row height="5"/>
        <Row space={3} alignItems="center">
          <Button colorScheme="secondary"
              onPress={() => clearForm()} >CLEAR</Button>
          <Button colorScheme="secondary"
              onPress={() => navigateToResults()} >SEARCH</Button>
        </Row>
      </Center>
    </NativeBaseProvider>
  );
}
