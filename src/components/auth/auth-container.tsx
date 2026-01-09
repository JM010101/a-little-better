import * as React from 'react'
import { Container } from '@/components/layout/container'
import { Logo } from '@/components/ui/logo'

interface AuthContainerProps {
  children: React.ReactNode
  title: string
  subtitle?: string
}

export function AuthContainer({ children, title, subtitle }: AuthContainerProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <Container className="max-w-lg w-full">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <Logo size="lg" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{title}</h1>
            {subtitle && (
              <p className="text-sm sm:text-base text-gray-600">{subtitle}</p>
            )}
          </div>
          {children}
        </div>
      </Container>
    </div>
  )
}

