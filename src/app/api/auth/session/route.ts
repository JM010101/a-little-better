import { NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json(
        { user: null },
        { status: 200 }
      )
    }

    return NextResponse.json({
      user: session.user,
    })
  } catch (error) {
    console.error('Session API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

