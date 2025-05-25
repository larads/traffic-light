import api from '@/api';

interface EmergencyRequest {
  latitude: number;
  longitude: number;
  timestamp: string;
}

interface EmergencyResponse {
  success: boolean;
  trafficLightId: string;
  street: string;
  status: string;
  message: string;
}

const FAKE_TRAFFIC_LIGHTS = [
  { id: 'TL001', street: 'Rua Principal', status: 'red' },
  { id: 'TL002', street: 'Avenida Central', status: 'green' },
  { id: 'TL003', street: 'Rua das Flores', status: 'yellow' },
]

export const emergencyService = {
  async requestEmergencyPassage(location: EmergencyRequest): Promise<EmergencyResponse> {
    try {
      await api.post('/traffic-light/log', {
        timestamp: location.timestamp,
        action: 'emergency_button_clicked'
      });

      const randomTrafficLight = FAKE_TRAFFIC_LIGHTS[Math.floor(Math.random() * FAKE_TRAFFIC_LIGHTS.length)];
      
      return {
        success: true,
        trafficLightId: randomTrafficLight.id,
        street: randomTrafficLight.street,
        status: 'green',
        message: `Semáforo ${randomTrafficLight.id} na ${randomTrafficLight.street} será alterado para verde em 10 segundos.`
      };
    } catch (error) {
      console.error('Erro ao registrar clique:', error);
      const randomTrafficLight = FAKE_TRAFFIC_LIGHTS[Math.floor(Math.random() * FAKE_TRAFFIC_LIGHTS.length)];
      return {
        success: true,
        trafficLightId: randomTrafficLight.id,
        street: randomTrafficLight.street,
        status: 'green',
        message: `Semáforo ${randomTrafficLight.id} na ${randomTrafficLight.street} será alterado para verde em 10 segundos.`
      };
    }
  }
}; 