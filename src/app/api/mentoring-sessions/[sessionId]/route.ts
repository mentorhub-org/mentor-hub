import prisma from '@/db/prisma'
import { updateSessionStatus } from '@/services/mentoring-session'
import { SessionStatus } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { sessionId: string } },
) {
  try {
    const { status } = await request.json()
    const sessionId = await params
    const session = await updateSessionStatus(
      sessionId.sessionId,
      status as SessionStatus,
    )
    return NextResponse.json(session)
  } catch (error) {
    console.error('Error updating session status:', error)
    return NextResponse.json(
      { error: 'Failed to update session' },
      { status: 500 },
    )
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { sessionId: string } },
) {
  const sessionId = await params.sessionId
  console.log(sessionId)
  try {
    const session = await prisma.mentoringSession.findUnique({
      where: {
        id: sessionId,
      },
    })
    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }
    return NextResponse.json(session)
  } catch (error) {
    console.error('Error getting session:', error)
    return NextResponse.json(
      { error: 'Failed to get session' },
      { status: 500 },
    )
  }
}
