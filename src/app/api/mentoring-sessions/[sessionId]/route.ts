import { updateSessionStatus } from '@/services/mentoring-session'
import { SessionStatus } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { status } = await request.json()
    const session = await updateSessionStatus(params.sessionId, status as SessionStatus)
    return NextResponse.json(session)
  } catch (error) {
    console.error('Error updating session status:', error)
    return NextResponse.json(
      { error: 'Failed to update session' },
      { status: 500 }
    )
  }
}