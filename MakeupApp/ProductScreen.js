import React, {useState, useEffect} from 'react';
import { StyleSheet, StatusBar, View, ScrollView} from 'react-native';
import { Button, Icon, Rating, Text, useTheme, Card, PricingCard, FAB} from 'react-native-elements';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('makeupdb.db');

export default function ProductScreen({ route, navigation}) {

  const { item } = route.params;
  const [favorite, setFavorite] = useState(false);
  const [product, setProduct] = useState();
  const { theme } = useTheme();

  useEffect(() => {
    findFavorite();
    findProduct();
  }, [item]);

  const findFavorite = () => {
    db.transaction(tx => {
      tx.executeSql('select * from favorites where id=?;', [item.id], (_, {rows}) => {
        setFavorite(rows._array.length>0)
        }, () => console.log('find error'), () => console.log('find onnistui')
      ); 
    });
  }

  const findProduct = () => {
    fetch(item.product_api_url)
      .then(response=> response.json())
      .then(responseData=> {
        console.log("avataan product", responseData)
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
    }, (error) => console.log(error), () => console.log('insert onnistui'));
  } else {
    db.transaction(tx => {
      tx.executeSql('delete from favorites where id=?;',[item.id]);
    }, (error) => console.log(error), () => console.log('delete onnistui'));    
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
  cardcontainer: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'center',
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