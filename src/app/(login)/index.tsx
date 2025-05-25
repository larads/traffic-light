import { Button } from '@/components/button'
import { router } from 'expo-router'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, StatusBar, Text, TextInput, View } from 'react-native'

export default function Login() {
  const [matricula, setMatricula] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (matricula === '123' && senha === '123') {
      router.push('/(emergency)')
    } else {
      setError('Matrícula ou senha inválida')
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View className="flex-1 px-6 justify-center">
        <Text className="text-3xl font-bold text-center mb-8 text-[#2e2b09]">
          Login de Emergência
        </Text>

        <View className="space-y-4">
          <View>
            <Text className="text-lg font-medium text-white mb-1">Matrícula</Text>
            <TextInput
              className="w-full px-4 py-3 border bg-white border-gray-300 rounded-lg focus:border-[#2e2b09] mb-4"
              placeholder="Digite sua matrícula"
              value={matricula}
              onChangeText={setMatricula}
              keyboardType="numeric"
            />
          </View>

          <View>
            <Text className="text-lg font-medium text-white mb-1">Senha</Text>
            <TextInput
              className="w-full px-4 py-3 border bg-white border-gray-300 rounded-lg focus:border-[#2e2b09]"
              placeholder="Digite sua senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
            />
          </View>

          {error ? (
            <Text className="text-red-500 text-lg font-bold ml-2">{error}</Text>
          ) : null}

          <Button
            label="Entrar"
            variant="default"
            size="lg"
            className="mt-6"
            onPress={handleLogin}
          />

          <Button
            size="lg"
            label="Voltar"
            variant="outline"
            className="mt-2"
            onPress={() => router.back()}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
} 