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
  const [markers, setMarkers] = useState([])

  const apikey = 'OLTC270Ac3dbDdFT8FEr7UnEEzakcXmM'
  const apikey2 = 'AIzaSyDG-hBHN4az6kikDQWzC1O8YO65S0le8a8'

  const buttonPressed = ()  => {
    fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${apikey}&location=${keyword}`)
    .then(response=> response.json())
    .then(responseData=> {
      const latitude = responseData.results[0].locations[0].latLng.lat
      const longitude = responseData.results[0].locations[0].latLng.lng
      setRegion({
        ...region, latitude: latitude, longitude: longitude,
      })
      setCoordinates({
        latitude: latitude,
        longitude: longitude
      })

      fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}%2C${longitude}&radius=1500&type=restaurant&key=${apikey2}`)
      .then(response=> response.json())
      .then(responseData=> {
        const markers = []
        {responseData.results.map((restaurant) => (
          markers.push({title: restaurant.name, description: restaurant.vicinity, coordinates: {latitude: restaurant.geometry.location.lat, longitude: restaurant.geometry.location.lng}})
        ))}
        setMarkers(markers)
      })
      .catch (err=> {
        Alert.alert('Error')
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
      {markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={marker.coordinates}
          title={marker.title}
          description={marker.description}
        />
      ))}
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