import React, {useState} from 'react';
import { Alert, Text } from 'react-native';
import {
  Select,
  Stack,
  Row,
  CheckIcon,
  Center,
  NativeBaseProvider,
  Button,
  FormControl,
  Slider,
} from "native-base"
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('makeupapp.db');

export default function SearchScreen({navigation}) {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedProductType, setSelectedProductType] = useState('');
  const [selectedLessThanPrice, setSelectedLessThanPrice] = useState(200);
  const [selectedGreaterThanPrice, setSelectedGreaterThanPrice] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const navigateToResults = ()  => {
    setLoading(true);
    fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${selectedBrand}&product_type=${selectedProductType}&price_less_than=${selectedLessThanPrice}&price_greater_than=${selectedGreaterThanPrice}`)
    .then(response=> response.json())
    .then(responseData=> {
      navigation.navigate('Results', {responseData});
      setLoading(false);
    })
    .catch (err=> Alert.alert('Error', err ))  
  }

  const clearForm = () => {
    setSelectedBrand('');
    setSelectedProductType('');
    setSelectedLessThanPrice(200);
    setSelectedGreaterThanPrice(0);
  }

  const brands = [
    { label: 'Anna sui', value: 'anna sui' },
    { label: 'Annabelle', value: 'annabelle' },
    { label: 'Benefit', value: 'benefit' },
    { label: "C'est moi", value: "c'est moi" },
    { label: "Cargo cosmetics", value: "cargo cosmetics" },
    { label: "Clinique", value: "clinique" },
    { label: "Covergirl", value: "covergirl" },
    { label: "Dior", value: "Dior" },
    { label: "Dr. hauschka", value: "Dr. hauschka" },
    { label: "Glossier", value: "glossier" },
    { label: "L'oreal", value: "l'oreal" },
    { label: 'Maybelline', value: 'maybelline' },
  ];

  const productTypes = [
    { label: 'Blush', value: 'blush' },
    { label: 'Bronzer', value: 'bronzer' },
    { label: 'Eyebrow', value: 'eyebrow' },
    { label: 'Eyeliner', value: 'eyeliner' },
    { label: 'Eyeshadow', value: 'eyeshadow' },
    { label: 'Foundation', value: 'foundation' },
    { label: 'Lip liner', value: 'lip liner' },
    { label: 'Lipstick', value: 'lipstick' },
    { label: 'Mascara', value: 'mascara' },
    { label: 'Nail polish', value: 'nail polish' },
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
            <FormControl.Label>Price less than</FormControl.Label>
            <Text
              style={{ color: "pink" }} 
              textAlign="center">
              {selectedLessThanPrice}
            </Text>
            <Slider
              defaultValue={selectedLessThanPrice}
              minValue={0}
              maxValue={200}
              step={1}
              colorScheme="pink"
              onChangeEnd={(value) => {
                value && setSelectedLessThanPrice(Math.floor(value))
              }}
            >
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>
          </Stack>
        </FormControl>
        <Row height="5"/>
        <FormControl>
          <Stack mx="4">
            <FormControl.Label>Price greater than</FormControl.Label>
            <Text
              style={{ color: "pink" }} 
              textAlign="center">
              {selectedGreaterThanPrice}
            </Text>
            <Slider
              defaultValue={selectedGreaterThanPrice}
              minValue={0}
              maxValue={200}
              step={1}
              colorScheme="pink"
              onChangeEnd={(value) => {
                value && setSelectedGreaterThanPrice(Math.floor(value))
              }}
            >
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>
          </Stack>
        </FormControl>
        <Row height="5"/>
        <Row space={3} alignItems="center">
          <Button colorScheme="secondary"
              onPress={() => clearForm()} >CLEAR</Button>
          <Button isLoading={isLoading} colorScheme="secondary"
              onPress={() => navigateToResults()} >SEARCH</Button>
        </Row>
      </Center>
    </NativeBaseProvider>
  );
}
