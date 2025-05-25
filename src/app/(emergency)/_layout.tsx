import { Slot } from "expo-router"
import { ImageBackground, Platform, StatusBar } from "react-native"

export default function LoginLayout() {
    return (
        <ImageBackground
            source={require('@/assets/background.jpg')}
            resizeMode="cover"
            className="flex-1"
            style={{
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            }}
        >
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <Slot />
        </ImageBackground>
    )
}