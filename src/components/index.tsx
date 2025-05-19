import MapView from 'react-native-maps'

const trafficLights = [
  { id: 1, latitude: -22.9006, longitude: -43.1906 },
  { id: 2, latitude: -22.9010, longitude: -43.1912 },
  { id: 3, latitude: -22.8995, longitude: -43.1920 },
  { id: 4, latitude: -22.9000, longitude: -43.1930 },
  { id: 5, latitude: -22.9015, longitude: -43.1900 },
]

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
      {/* {trafficLights.map(light => (
        <Marker
          key={light.id}
          coordinate={{ latitude: light.latitude, longitude: light.longitude }}
          title={`Semáforo ${light.id}`}
        >
          <FontAwesome5 name="traffic-light" size={32} color={colors.traffic.main} />
        </Marker>
      ))} */}
    </MapView>
  )
} 