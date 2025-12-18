import React from 'react'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showText?: boolean
}

const Logo: React.FC<LogoProps> = ({
  size = 'md',
  className,
  showText = false
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  }

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  }

  return (
    <div className={cn('flex items-center space-x-3', className)}>
      <div className={cn(
        'bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl flex items-center justify-center shadow-lg',
        sizes[size]
      )}>
        <span className={cn('text-white font-bold', textSizes[size])}>
          ALB
        </span>
      </div>
      {showText && (
        <span className={cn('font-bold text-gray-900', textSizes[size])}>
          A Little Better
        </span>
      )}
    </div>
  )
}

export { Logo }