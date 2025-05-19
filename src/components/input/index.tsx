import { cn } from '@/lib/cn'
import { Text, TextInput, TextInputProps, View } from 'react-native'

interface InputProps extends TextInputProps {
  label?: string
  error?: string
  containerClassName?: string
}

export function Input({
  label,
  error,
  containerClassName,
  className,
  ...props
}: InputProps) {
  return (
    <View className={cn('w-full', containerClassName)}>
      {label && (
        <Text className="text-sm font-medium text-gray-700 mb-1">{label}</Text>
      )}
      <TextInput
        className={cn(
          'w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-gray-900',
          'focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20',
          error && 'border-red-500',
          className
        )}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
      {error && <Text className="text-sm text-red-500 mt-1">{error}</Text>}
    </View>
  )
}
