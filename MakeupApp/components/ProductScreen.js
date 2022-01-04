import React, {useState, useEffect} from 'react';
import { StyleSheet, View, ScrollView, ToastAndroid} from 'react-native';
import { Icon, Rating, Text, Card, PricingCard, FAB} from 'react-native-elements';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('makeupdb.db');

export default function ProductScreen({ route, navigation}) {

  const { item } = route.params;
  const [favorite, setFavorite] = useState(false);
  const [product, setProduct] = useState();

  useEffect(() => {
    findFavorite();
    findProduct();
  }, [item]);

  const showToast = (text) => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };

  const findFavorite = () => {
    db.transaction(tx => {
      tx.executeSql('select * from favorites where id=?;', [item.id], (_, {rows}) => {
        setFavorite(rows._array.length>0)
        }, (err) => Alert.alert('Error', err ), (null)
      ); 
    });
  }

  const findProduct = () => {
    fetch(item.product_api_url)
      .then(response=> response.json())
      .then(responseData=> {
        setProduct(responseData);
      })
      .catch (err=> Alert.alert('Error', err ))  
  }

  const navigateToProductWebView = () => {
    navigation.navigate('ProductWebView', {product});
  }
  
  const saveFavorite = (favo) => {
    if (favo) {
    db.transaction(tx => {
      tx.executeSql('insert into favorites (id, name, brand, product_type, image_link, product_api_url) values (?, ?, ?, ?, ?, ?);',[product.id, product.name, product.brand, product.product_type, product.image_link, product.product_api_url]);    
    }, err=> Alert.alert('Error', err ), null);
    showToast('Added to favorites');
  } else {
    db.transaction(tx => {
      tx.executeSql('delete from favorites where id=?;',[item.id]);
    }, err=> Alert.alert('Error', err ), () => null);    
    showToast('Removed from favorites');
  }

    setFavorite(favo);
  }

  return (
    <View style={styles.container}>
      <Icon
          reverse
          name= {favorite ? 'heart' : 'heart-outline'}
          type='material-community'
          color='#517fa4'
          onPress={() => saveFavorite(!favorite)} />
      {product &&
      <ScrollView><Card>
        <Card.Title>
        {product.name}
        </Card.Title>
        <Card.Divider />
        <Card.Image
          style={styles.image}
          source={{
            uri: product.image_link,
          }}
        />
        <Text
          style={styles.text}
        >
          {product.description.trim()}
        </Text>
        <View style={styles.colorcontainer}>
          {product.product_colors.map((color) => 
          <FAB key={color.hex_value} size="small"
          color={color.hex_value}
          />)}
          </View>
        <Rating
              startingValue={product.rating}
              readonly
              fractions="{1}"
              imageSize={20}
              type='custom'
              ratingColor='red'
              style={{ paddingVertical: 10 }}
            />
        <PricingCard
          price={`${product.price}${product.currency ? product.currency : ' $'}`}
          color= 'pink'
          textColor='green'
          button={{ title: '  SHOP  ', icon: 'storefront'}}
          onButtonPress={navigateToProductWebView}
          pricingStyle={{color: 'black', fontSize: 20}}
          titleStyle={{fontSize: 2}}
        />
      </Card></ScrollView>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
  },
  image: {
    marginRight: '10%',
    marginLeft: '10%',
    resizeMode: 'contain'
  },
  colorcontainer: {
    paddingVertical: 10,
    flexDirection:'row', 
    alignItems: 'center',
    justifyContent:'center',
  }
});