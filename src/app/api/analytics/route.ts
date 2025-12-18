import { NextRequest, NextResponse } from 'next/server'
import { Analytics } from '@/lib/analytics'
import { getClientIP } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const { event_type, page_path, metadata } = await request.json()

    if (!event_type || !page_path) {
      return NextResponse.json(
        { error: 'event_type and page_path are required' },
        { status: 400 }
      )
    }

    const userAgent = request.headers.get('user-agent')
    const ipAddress = getClientIP(request)

    await Analytics.trackEvent({
      event_type,
      page_path,
      user_agent: userAgent,
      ip_address: ipAddress,
      metadata,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    )
  }
}