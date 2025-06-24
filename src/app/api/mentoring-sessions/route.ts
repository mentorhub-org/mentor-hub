import {
  createMentoringSession,
  getMyLearnings,
  getMyMentorships,
} from '@/services/mentoring-session'
import { getProfile } from '@/services/profile'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const session = await createMentoringSession(body)
    return NextResponse.json(session)
  } catch (error) {
    console.error('Error creating mentoring session:', error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const profile = await getProfile()
  const { searchParams } = new URL(request.url)
  const userType = searchParams.get('userType') as 'mentor' | 'mentee'

  if (!profile) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!userType) {
    return NextResponse.json(
      { error: 'userType is required in request body' },
      { status: 400 },
    )
  }

  try {
    const sessions =
      userType === 'mentor' ? await getMyMentorships() : await getMyLearnings()

    return NextResponse.json(sessions)
  } catch (error) {
    console.error('Error getting mentoring sessions:', error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
