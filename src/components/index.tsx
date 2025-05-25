import MapView from 'react-native-maps'

export function Map() {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: -22.9006,
        longitude: -43.1906,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      showsUserLocation
      showsMyLocationButton
    >
    </MapView>
  )
} 