import React from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';

export default function HistoryScreen({ route, navigation}) {
  const{ data} = route.params;
    return (
      <View style={styles.container}>
        <Text>History</Text>
        <FlatList 
            data ={data} 
            renderItem={({item}) => 
              <Text>{item.key}</ Text>} />
        </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

