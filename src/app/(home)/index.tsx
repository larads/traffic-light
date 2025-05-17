import { ButtonBack } from '@/components/button/button-back'
import { ButtonPedestrian } from '@/components/button/button-pedestrian'
import { colors } from '@/styles/colors'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'

import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native'

export default function Home() {
  const [buttonState, setButtonState] = useState<
    'waiting' | 'stop' | 'go' | 'loading'
  >('waiting')

  function handlePedestrianPress() {
    if (buttonState === 'waiting') {
      // Primeiro estado: Verificando
      setButtonState('loading')

      // Após 2 segundos, mostra o sinal vermelho
      setTimeout(() => {
        setButtonState('stop')

        // Após 5 segundos no vermelho, muda para verde
        setTimeout(() => {
          setButtonState('go')

          // Mantém no verde por 10 segundos
          setTimeout(() => {
            setButtonState('waiting')
          }, 10000)
        }, 5000)
      }, 2000)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="px-4 py-6">
            <ButtonBack onPress={() => router.back()} />
          </View>
          <View className="bg-white/20 flex-1 px-6 mt-10 rounded-t-3xl">
            <View className="w-full items-center">
              <Feather
                name="alert-circle"
                size={48}
                color={colors.traffic.mainLight}
                className="mt-5"
              />
              <Text
                className={`text-4xl font-bold text-[${colors.traffic.main}] mb-2 mt-4`}
              >
                Bem-vindo de volta!
              </Text>

              <Text
                className={`text-[${colors.text.gray}] text-center text-lg mb-12`}
              >
                Controle o sinal de trânsito com apenas um toque
              </Text>

              <ButtonPedestrian
                onPress={handlePedestrianPress}
                state={buttonState}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
