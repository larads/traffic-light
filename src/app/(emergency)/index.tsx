import { Button } from '@/components/button'
import { EmergencyViewModel } from '@/viewmodels/emergency-view-models'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Alert, StatusBar, Text, View } from 'react-native'

export default function Emergency() {
  const [viewModel] = useState(() => new EmergencyViewModel())
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const initLocation = async () => {
      try {
        await viewModel.initializeLocation()
        setIsInitialized(true)
      } catch (error) {
        console.error('Erro ao inicializar localização:', error)
      }
    }

    initLocation()
  }, [])

  const handleEmergencyRequest = async () => {
    try {
      const response = await viewModel.requestEmergencyPassage()
      Alert.alert(
        'Solicitação de Emergência',
        response.message,
        [{ text: 'OK' }]
      )
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível solicitar a passagem de emergência. Tente novamente.'
      )
    }
  }

  const location = viewModel.getFormattedLocation()
  const errorMsg = viewModel.getError()
  const isRequesting = viewModel.getIsRequesting()
  const lastRequest = viewModel.getLastRequest()

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

        <View className="bg-gray-50 p-4 rounded-lg mb-6">
          <Text className="text-lg font-medium text-gray-800 mb-2">
            Status da Localização:
          </Text>
          {errorMsg ? (
            <Text className="text-red-500">{errorMsg}</Text>
          ) : !isInitialized ? (
            <Text className="text-gray-600">Inicializando localização...</Text>
          ) : location ? (
            <Text className="text-gray-600">
              Latitude: {location.latitude}{'\n'}
              Longitude: {location.longitude}
            </Text>
          ) : (
            <Text className="text-gray-600">Obtendo localização...</Text>
          )}
        </View>

        {lastRequest && (
          <View className="bg-green-50 p-4 rounded-lg mb-6">
            <Text className="text-lg font-medium text-gray-800 mb-2">
              Última Solicitação:
            </Text>
            <Text className="text-gray-600">
              Semáforo: {lastRequest.trafficLightId}{'\n'}
              Rua: {lastRequest.street}{'\n'}
              Status: {lastRequest.status}
            </Text>
          </View>
        )}

        <View className="flex-1 justify-center">
          <Button
            label={isRequesting ? "Processando..." : "Solicitar Passagem de Emergência"}
            variant="default"
            size="lg"
            isLoading={isRequesting}
            className="mb-4"
            onPress={handleEmergencyRequest}
            disabled={!location || isRequesting}
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
