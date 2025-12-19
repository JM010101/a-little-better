import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/auth'
import { Container } from '@/components/layout/container'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Ensure user is authenticated
  await requireAuth()

  return (
    <main className="flex-grow">
      {children}
    </main>
  )
}

