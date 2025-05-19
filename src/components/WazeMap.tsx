import { useLocalization } from '@/hooks/location'
import { colors } from '@/styles/colors'
import { FontAwesome5 } from '@expo/vector-icons'
import React, { useRef } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import MapView, {
  MapViewProps,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps'

const METERS_TO_DEGREES = 0.000018 // Aproximadamente 2 metros
const SEMAPHORE_OFFSETS = [
  { lat: METERS_TO_DEGREES, lng: 0 },
  { lat: -METERS_TO_DEGREES, lng: 0 },
]

const FAMETRO_UNIDADE5 = { latitude: -3.101944, longitude: -60.025833 }

const mapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f5f5' }] },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#bdbdbd' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#eeeeee' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#757575' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#e5e5e5' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9e9e9e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#757575' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#dadada' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#616161' }],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9e9e9e' }],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [{ color: '#e5e5e5' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [{ color: '#eeeeee' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#c9c9c9' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9e9e9e' }],
  },
]

export function WazeMap(props: MapViewProps) {
  const mapRef = useRef<MapView>(null)
  const { localization, loadingLocation } = useLocalization()

  const center = localization || FAMETRO_UNIDADE5

  const trafficLights = SEMAPHORE_OFFSETS.map((offset, idx) => ({
    id: idx + 1,
    latitude: center.latitude + offset.lat,
    longitude: center.longitude + offset.lng,
  }))

  function centerOnUser() {
    if (center) {
      mapRef.current?.animateToRegion(
        {
          latitude: center.latitude,
          longitude: center.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      )
    }
  }

  if (loadingLocation) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.traffic.main} />
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: center.latitude,
          longitude: center.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        customMapStyle={mapStyle}
        showsUserLocation
        showsMyLocationButton={false}
        {...props}
      >
        <Marker coordinate={center} title="Você está aqui">
          <View style={styles.userMarker} />
        </Marker>

        {trafficLights.map(light => (
          <Marker
            key={light.id}
            coordinate={{
              latitude: light.latitude,
              longitude: light.longitude,
            }}
            title={`Semáforo ${light.id}`}
          >
            <FontAwesome5
              name="traffic-light"
              size={32}
              color={colors.traffic.main}
            />
          </Marker>
        ))}
      </MapView>

      <TouchableOpacity onPress={centerOnUser} style={styles.locationButton}>
        <FontAwesome5
          name="location-arrow"
          size={20}
          color={colors.traffic.main}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userMarker: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: '#fff',
  },
  locationButton: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    backgroundColor: '#fff',
    borderRadius: 32,
    padding: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
})
