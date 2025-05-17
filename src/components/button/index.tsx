import { cva, type VariantProps } from 'class-variance-authority'
import { ReactNode } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'

import { cn } from '@/lib/cn'

const buttonVariants = cva(
  'flex flex-row items-center justify-center rounded-xl',
  {
    variants: {
      variant: {
        default: 'bg-[#b4ab2a] w-full',
        outline: 'bg-white w-full',
      },
      size: {
        default: 'p-5 rounded-lg',
        sm: 'h-10 w-10',
        lg: 'h-14 px-8',
      },
      opacity: {
        default: 'opacity-100',
        semi: 'opacity-50',
        low: 'opacity-25',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      opacity: 'semi',
    },
  }
)


interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
    VariantProps<typeof buttonVariants> {
  label?: string
  labelClasses?: string
  icon?: ReactNode
  isLoading?: boolean
  opacity?: VariantProps<typeof buttonVariants>['opacity']
}

const buttonTextVariants = cva('text-center font-medium', {
  variants: {
    variant: {
      default: 'text-white w-full',
      outline: 'text-black',
    },
    size: {
      default: 'text-base',
      sm: 'text-sm',
      lg: 'text-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

function Button({
  label,
  labelClasses,
  className,
  variant,
  size,
  icon,
  opacity,
  isLoading = false,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={cn(buttonVariants({ variant, size, opacity, className }))}
      disabled={isLoading || props.disabled}
      {...props}
    >
      <View className="flex-row items-center justify-evenly">
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <>
            <Text
              className={cn(
                buttonTextVariants({ variant, size, className: labelClasses })
              )}
            >
              {label}
            </Text>
            {icon && <View>{icon}</View>}
          </>
        )}
      </View>
    </TouchableOpacity>
  )
}

export { Button, buttonTextVariants, buttonVariants }

