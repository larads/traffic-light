import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons'
import { Text, TouchableOpacity } from 'react-native'

interface ButtonPedestrianProps {
  onPress: () => void
  state: 'waiting' | 'stop' | 'go' | 'loading'
}

export function ButtonPedestrian({ onPress, state }: ButtonPedestrianProps) {
  const buttonStyle = {
    stop: {
      background: 'bg-red-600',
      border: 'border-red-700',
      text: 'Pare!',
      icon: 'hand' as const,
      iconFamily: FontAwesome6,
    },
    go: {
      background: 'bg-green-600',
      border: 'border-green-700',
      text: 'Pode atravessar',
      icon: 'person-walking' as const,
      iconFamily: FontAwesome6,
    },
    waiting: {
      background: 'bg-[#2e2b09]',
      border: 'border-[#1a1805]',
      text: 'Acionar sinal',
      icon: 'traffic-light' as const,
      iconFamily: FontAwesome5,
    },
    loading: {
      background: 'bg-yellow-500',
      border: 'border-yellow-600',
      text: 'Verificando sinal...',
      icon: 'clock' as const,
      iconFamily: FontAwesome6,
    },
  }

  const currentStyle = buttonStyle[state]
  const Icon = currentStyle.iconFamily

  return (
    <TouchableOpacity
      className={`w-48 h-48 border-2 ${currentStyle.border} rounded-full ${currentStyle.background} items-center justify-center shadow-xl active:scale-95 mb-8 flex-col`}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={state !== 'waiting'}
      style={{
        elevation: 8,
      }}
    >
      <Icon name={currentStyle.icon} size={32} color="#fff" />
      <Text className="text-white text-2xl font-semibold mt-2 text-center px-2">
        {currentStyle.text}
      </Text>
    </TouchableOpacity>
  )
}
