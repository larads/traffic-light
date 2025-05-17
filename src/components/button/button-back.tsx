import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { TouchableOpacity } from "react-native"

interface ButtonBackProps {
  onPress: () => void
}

export const ButtonBack: React.FC<ButtonBackProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-14 h-14 rounded-full bg-white/80 justify-center items-center absolute top-4 left-2 z-10"
      style={{ shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4 }}
    >
      <Ionicons name="chevron-back" size={24} color="black" className="opacity-50" />
    </TouchableOpacity>
  )
}
