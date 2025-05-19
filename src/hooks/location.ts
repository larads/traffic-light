import * as Location from 'expo-location'
import { useEffect, useState } from 'react'
import { Alert } from 'react-native'

type LocalizationProps = {
  latitude: number
  longitude: number
}

export const useLocalization = () => {
  const [loadingLocation, setLoadingLocation] = useState(true)
  const [localization, setLocalization] = useState<LocalizationProps | null>(null)
  const [locationForegroundPermission, requestPermission] = Location.useForegroundPermissions()

  // Solicita permissão e pega a localização inicial
  const getLocalization = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('Aviso', 'A permissão para acessar o local foi negada')
      setLoadingLocation(false)
      return
    }
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      })
      setLocalization({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
    } catch (error) {
      Alert.alert('Erro', 'Erro ao obter localização')
    }
    setLoadingLocation(false)
  }

  // Atualização em tempo real
  useEffect(() => {
    if (!locationForegroundPermission?.granted) return

    let subscription: Location.LocationSubscription
    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (location) => {
        setLocalization({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
      }
    ).then((response) => (subscription = response))

    return () => subscription && subscription.remove()
  }, [locationForegroundPermission?.granted])

  useEffect(() => {
    getLocalization()
  }, [])

  return { localization, getLocalization, loadingLocation }
}
