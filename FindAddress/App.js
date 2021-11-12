import React, {useState} from 'react';
import { StyleSheet, StatusBar, View, Button, TextInput, Alert} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {

  const [keyword, setKeyword] = useState('')
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

  const buttonPressed = ()  => {
    fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${apikey}&location=${keyword}`)
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
      <TextInput style={{margin: 5, borderBottomWidth: 1}} onChangeText={keyword=> setKeyword(keyword)} value={keyword}/>
      <Button title="SHOW" onPress={buttonPressed} />
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