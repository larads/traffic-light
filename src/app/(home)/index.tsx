import { WazeMap } from '@/components/WazeMap'
import { ButtonBack } from '@/components/button/button-back'
import { router } from 'expo-router'
import { SafeAreaView, StatusBar, View } from 'react-native'

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={{ paddingHorizontal: 16, paddingTop: 24, paddingBottom: 8 }}>
        <ButtonBack onPress={() => router.back()} />
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 64,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          overflow: 'hidden',
        }}
      >
        <WazeMap />
      </View>
    </SafeAreaView>
  )
}
