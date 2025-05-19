import { Button } from '@/components/button'
import { ButtonBack } from '@/components/button/button-back'
import { Input } from '@/components/input'
import { colors } from '@/styles/colors'
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

export default function Login() {
  const [matricula, setMatricula] = useState('')
  const [senha, setSenha] = useState('')

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
          <View className="px-4 py-6 mb-10">
            <ButtonBack onPress={() => router.back()} />
          </View>

          <View className="bg-white/20 flex-1 px-6 rounded-3xl">
            <View className="w-full py-6">
              <Text
                className={`text-3xl font-bold text-[${colors.traffic.main}] mb-6`}
              >
                Bem-vindo de volta!
              </Text>

              <Input
                label="Matrícula"
                placeholder="Digite sua matrícula"
                value={matricula}
                onChangeText={setMatricula}
                keyboardType="numeric"
                className="mb-4"
              />

              <Input
                label="Senha"
                placeholder="Digite sua senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                className="mb-6"
              />

              <Button
                label="Entrar"
                variant="default"
                size="lg"
                isLoading={false}
                className="mt-2"
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
