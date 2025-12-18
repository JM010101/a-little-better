import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getClientIP } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const { email, source } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Insert into early_users table
    const { data, error } = await supabase
      .from('early_users')
      .insert([
        {
          email,
          source: source || 'homepage',
        }
      ])
      .select()
      .single()

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 409 }
        )
      }
      
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to register email' },
        { status: 500 }
      )
    }

    // Track successful signup
    const userAgent = request.headers.get('user-agent')
    const ipAddress = getClientIP(request)
    
    await supabase
      .from('analytics_events')
      .insert([
        {
          event_type: 'waitlist_signup',
          page_path: '/waitlist',
          user_agent: userAgent,
          ip_address: ipAddress,
          metadata: { email, source },
        }
      ])

    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist!',
      data,
    })
  } catch (error) {
    console.error('Waitlist API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}