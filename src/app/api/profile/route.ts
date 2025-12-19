import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { requireAuth } from '@/lib/auth'

export async function PATCH(request: NextRequest) {
  try {
    // Ensure user is authenticated
    const session = await requireAuth()
    
    const { display_name } = await request.json()

    const supabase = await createServerSupabaseClient()

    // Update user metadata
    const { error } = await supabase.auth.updateUser({
      data: {
        display_name: display_name || null,
      },
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
    })
  } catch (error) {
    console.error('Profile update API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

