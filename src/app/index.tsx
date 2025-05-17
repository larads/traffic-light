import { Button } from '@/components/button'
import { router } from 'expo-router'
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  View,
} from 'react-native'

export default function Index() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <ImageBackground
        source={require('@/assets/background.jpg')}
        resizeMode="cover"
        className="flex-1"
        style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}
      >
        <View className="flex-1 px-6 bg-white/20">
          <Text className="text-['#2e2b09'] text-5xl font-bold py-4 mt-10">
            Semaforo
          </Text>
          <Text className="text-['#2e2b09'] text-justify font-semiBold text-3xl">
            Interligado a chamada de emergencia.
          </Text>

          <View className="flex-1 justify-center items-center mt-8">
            <Button
              label="Vamos lá"
              variant="default"
              size="lg"
              isLoading={false}
              className="mt-6"
              opacity="default"
              onPress={() => router.navigate('/(home)')}
            />
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}
