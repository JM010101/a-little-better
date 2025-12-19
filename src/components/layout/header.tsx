import Link from 'next/link'
import { Container } from './container'
import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { UserMenu } from '@/components/dashboard/user-menu'
import { getUser } from '@/lib/auth'

export async function Header() {
  const user = await getUser()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              Contact
            </Link>
            <Link
              href="/continuous-improvement-framework"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              Framework
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/profile">
                  <Button variant="ghost" size="sm">
                    Profile
                  </Button>
                </Link>
                <UserMenu userEmail={user.email} />
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary" size="sm">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  )
}

