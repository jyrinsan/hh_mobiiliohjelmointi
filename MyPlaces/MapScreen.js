import React, {useState, useEffect} from 'react';
import { StyleSheet, StatusBar, View, Button, TextInput, Alert} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from'expo-location';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('myplacesdb.db');

export default function MapScreen({ route, navigation}) {

  const { address, updateList } = route.params;

  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221
  })
  const [coordinates, setCoordinates] = useState({
    latitude: 60.201373,
    longitude: 24.934041
  })

  const apikey = 'OLTC270Ac3dbDdFT8FEr7UnEEzakcXmM'

  useEffect(() =>{
    fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${apikey}&location=${address}`)
    .then(response=> response.json())
    .then(responseData=> {
      setRegion({
        ...region, latitude: responseData.results[0].locations[0].latLng.lat,
        longitude: responseData.results[0].locations[0].latLng.lng,
      })
      setCoordinates({
        latitude: responseData.results[0].locations[0].latLng.lat,
        longitude: responseData.results[0].locations[0].latLng.lng
      })
    })
    .catch (err=> Alert.alert('Error', err ))  
    }, []);

  const save = ()  => {
    db.transaction(tx => {
        tx.executeSql('insert into places (address) values (?);',[address]);    
      }, null, updateList)

      updateList();
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        region={region}
      >
        <Marker
          coordinate={coordinates}
          title='Haaga-Helia'
        />
      </MapView>
      <Button title="SAVE LOCATION" onPress={save} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%"
  }
});