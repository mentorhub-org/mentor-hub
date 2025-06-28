import prisma from '@/db/prisma'
import { getProfile } from '@/services/profile'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const session = await prisma.review.create({
      data: {
        description: body.description,
        rating: body.rating,
        sessionId: body.sessionId,
        mentorId: body.mentorId,
        menteeId: body.menteeId,
      },
    })
    return NextResponse.json(session)
  } catch (error) {
    console.error('Error creating mentoring session:', error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
}

export async function GET() {
  const profile = await getProfile()

  if (!profile) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const sessions = await prisma.review.findMany({
      where: {
        mentorId: profile.id,
      },
      include: {
        mentee: true,
      },
    })

    return NextResponse.json(sessions)
  } catch (error) {
    console.error('Error getting mentoring sessions:', error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
