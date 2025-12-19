import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/auth'

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Ensure user is authenticated
  await requireAuth()

  return <>{children}</>
}

