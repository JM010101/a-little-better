import { NextRequest, NextResponse } from 'next/server'
import { setupDatabaseDirect } from '@/lib/database-setup'

export async function POST(request: NextRequest) {
  try {
    // Simple authentication - only allow in development
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Setup only available in development' },
        { status: 403 }
      )
    }

    const result = await setupDatabaseDirect()
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Database setup completed successfully!'
      })
    } else if (result.needsManualSetup) {
      return NextResponse.json({
        success: false,
        message: 'Manual SQL setup required',
        needsManualSetup: true
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Database setup failed',
        error: result.error
      })
    }
    
  } catch (error) {
    console.error('Setup API error:', error)
    return NextResponse.json(
      { error: 'Failed to setup database' },
      { status: 500 }
    )
  }
}