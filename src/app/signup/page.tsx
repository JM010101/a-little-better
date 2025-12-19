import { Metadata } from 'next'
import Link from 'next/link'
import { AuthContainer } from '@/components/auth/auth-container'
import { SignupForm } from '@/components/auth/signup-form'
import { OAuthButtons } from '@/components/auth/oauth-buttons'
import { Tabs } from '@/components/auth/tabs'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create a new account',
  robots: {
    index: false,
    follow: false,
  },
}

export default function SignupPage() {
  return (
    <AuthContainer
      title="Create an account"
      subtitle="Get started with A Little Better"
    >
      <Tabs
        tabs={[
          {
            id: 'email',
            label: 'Email',
            content: (
              <>
                <SignupForm />
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                      Sign in
                    </Link>
                  </p>
                </div>
              </>
            ),
          },
        ]}
      />
      <div className="mt-6">
        <OAuthButtons />
      </div>
    </AuthContainer>
  )
}

