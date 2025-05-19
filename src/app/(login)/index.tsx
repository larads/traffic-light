import { Button } from '@/components/button'
import { ButtonBack } from '@/components/button/button-back'
import { colors } from '@/styles/colors'
import { router } from 'expo-router'

import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View
} from 'react-native'

export default function Login() {
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
           <View className="w-full">
              <Text
                className={`text-4xl font-bold text-[${colors.traffic.main}] mb-2 mt-4`}
              >
                Coloque sua Matricula e senha.
              </Text>
              <Button
                label="Entrar"
                variant="default"
                size="lg"
                isLoading={false}
                className="mt-6"
                opacity="default"
                onPress={() => router.navigate('/(home)')}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
