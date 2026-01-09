import React from 'react'
import Image from 'next/image'
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
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  }

  return (
    <div className={cn('flex items-center space-x-3', className)}>
      <div className={cn('relative', sizes[size])}>
        <Image
          src="/logo.png"
          alt="A Little Better Logo"
          fill
          className="object-contain"
          priority
        />
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