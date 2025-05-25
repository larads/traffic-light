import { Button } from '@/components/button'
import * as Location from 'expo-location'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Alert, StatusBar, Text, View } from 'react-native'

export default function Emergency() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [isRequesting, setIsRequesting] = useState(false)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar localização foi negada')
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)
      console.log('Localização atual:', {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timestamp: new Date(location.timestamp).toLocaleString()
      })
    })()
  }, [])

  const handleEmergencyRequest = async () => {
    setIsRequesting(true)
    
    // Simulate checking nearby traffic lights
    const nearbyTrafficLight = {
      id: 'TL001',
      status: 'red',
      distance: '50m',
      street: 'Rua Principal'
    }

    console.log('Verificando semáforo próximo:', nearbyTrafficLight)
    
    // Simulate emergency request
    setTimeout(() => {
      Alert.alert(
        'Solicitação de Emergência',
        `Semáforo ${nearbyTrafficLight.id} na ${nearbyTrafficLight.street} será alterado para verde em 10 segundos.`,
        [{ text: 'OK' }]
      )
      setIsRequesting(false)
    }, 2000)
  }

  return (
    <View className="flex-1">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      
      <View className="flex-1 px-6 pt-12">
        <Text className="text-3xl font-bold text-[#2e2b09] mb-6">
          Solicitar Passagem
        </Text>

        <View className="bg-white/80 p-4 rounded-xl border-2 border-[#2e2b09] mb-6">
          <Text className="text-lg font-medium text-gray-800 mb-2">
            Status da Localização:
          </Text>
          {errorMsg ? (
            <Text className="text-red-500">{errorMsg}</Text>
          ) : location ? (
            <Text className="text-gray-600">
              Latitude: {location.coords.latitude.toFixed(6)}{'\n'}
              Longitude: {location.coords.longitude.toFixed(6)}
            </Text>
          ) : (
            <Text className="text-gray-600">Obtendo localização...</Text>
          )}
        </View>

        <View className="flex-1 justify-center">
          <Button
            label={isRequesting ? "Processando..." : "Solicitar Passagem de Emergência"}
            variant="default"
            size="lg"
            isLoading={isRequesting}
            className="mb-4"
            onPress={handleEmergencyRequest}
          />

          <Button
            label="Voltar"
            variant="outline"
            size="lg"
            onPress={() => router.back()}
          />
        </View>
      </View>
    </View>
  )
} 