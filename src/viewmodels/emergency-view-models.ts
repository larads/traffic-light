import { emergencyService } from '@/services/emergency'
import * as Location from 'expo-location'

interface EmergencyState {
  location: Location.LocationObject | null
  errorMsg: string | null
  isRequesting: boolean
  lastRequest: {
    trafficLightId: string
    street: string
    status: string
  } | null
}

export class EmergencyViewModel {
  private state: EmergencyState = {
    location: null,
    errorMsg: null,
    isRequesting: false,
    lastRequest: null
  }

  async initializeLocation() {
    try {
      console.log('Iniciando obtenção de localização...')
      
      const { status } = await Location.requestForegroundPermissionsAsync()
      console.log('Status da permissão:', status)
      
      if (status !== 'granted') {
        this.state.errorMsg = 'Permissão para acessar localização foi negada'
        return
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
      })
      
      console.log('Localização obtida:', {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timestamp: new Date(location.timestamp).toLocaleString()
      })

      this.state.location = location
    } catch (error) {
      console.error('Erro ao obter localização:', error)
      this.state.errorMsg = 'Erro ao obter localização: ' + (error instanceof Error ? error.message : 'Erro desconhecido')
    }
  }

  async requestEmergencyPassage() {
    if (!this.state.location) {
      throw new Error('Localização não disponível')
    }

    const response = await emergencyService.requestEmergencyPassage({
      latitude: this.state.location.coords.latitude,
      longitude: this.state.location.coords.longitude,
      timestamp: new Date().toISOString()
    })

    this.state.lastRequest = {
      trafficLightId: response.trafficLightId,
      street: response.street,
      status: response.status
    }

    return response
  }

  async logEmergencyClick(timestamp: string) {
    await emergencyService.logEmergencyClick(timestamp)
  }

  setIsRequesting(value: boolean) {
    this.state.isRequesting = value
  }

  getLocation() {
    return this.state.location
  }

  getError() {
    return this.state.errorMsg
  }

  getIsRequesting() {
    return this.state.isRequesting
  }

  getLastRequest() {
    return this.state.lastRequest
  }

  getFormattedLocation() {
    if (!this.state.location) return null

    return {
      latitude: this.state.location.coords.latitude.toFixed(6),
      longitude: this.state.location.coords.longitude.toFixed(6)
    }
  }
} 