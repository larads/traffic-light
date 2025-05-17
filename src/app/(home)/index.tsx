import { ButtonBack } from "@/components/button/button-back"
import { router } from "expo-router"

import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View
} from "react-native"

export default function Home() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-48">
        <ButtonBack onPress={() => router.back()} />
      </View>

      <View className="flex-1 bg-white/80 rounded-t-3xl p-6 mt-40 justify-center">

        <Text className="text-4xl font-semibold text-[#b4ab2a]">
          Bem-vindo de volta!
        </Text>
        <Text className="text-gray-500 mb-6">Aperte o botão para acionar o sinal</Text>

        

        

       
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}
