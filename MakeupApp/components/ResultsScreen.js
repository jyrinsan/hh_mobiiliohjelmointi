import React from 'react';
import { StyleSheet, StatusBar, View, FlatList} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

export default function ResultsScreen({ route, navigation}) {

  const { responseData } = route.params;

  const navigateToProductScreen = (id) => {
    responseData.map((responseItem) => {
      const item = {id: responseItem.id, product_api_url: responseItem.product_api_url}
      item.id === id ? navigation.navigate('Product', {item}) : '';
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.listcontainer}>
      {responseData &&
      <FlatList 
            keyExtractor={item => item.id}
            data={responseData} 
            renderItem={({item}) => (
              <ListItem bottomDivider onPress={() => navigateToProductScreen(item.id)}> 
                <Avatar
                    rounded
                    size="large"
                    source={{
                      uri:
                      item.image_link,
                    }}
                  />
                  <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{`${item.brand}, ${item.product_type}`}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
              )} /> }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
  },
  listcontainer: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'center',
  },
});