'use server'

import prisma from '@/db/prisma'
import { auth } from '@/lib/auth'
import { SessionStatus } from '@prisma/client'
import { headers } from 'next/headers'
import { getProfile } from './profile'

export async function createMentoringSession(data: {
  mentorId: string
  menteeId: string
  name: string
  description?: string
  price?: string
  thumbnail?: string
  startTime: Date
  notes?: string
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  return await prisma.mentoringSession.create({
    data: {
      ...data,
      status: SessionStatus.PENDING,
    },
    include: {
      mentor: {
        select: {
          id: true,
          name: true,
          email: true,
          imgUrl: true,
        },
      },
      mentee: {
        select: {
          id: true,
          name: true,
          email: true,
          imgUrl: true,
        },
      },
    },
  })
}

export async function getMyLearnings() {
  const profile = await getProfile()

  return await prisma.mentoringSession.findMany({
    where: {
      menteeId: profile?.id,
    },
    include: {
      mentor: {
        select: {
          id: true,
          name: true,
          email: true,
          imgUrl: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function getMyMentorships() {
  const profile = await getProfile()

  return prisma.mentoringSession.findMany({
    where: {
      mentorId: profile?.id,
    },
    include: {
      mentee: {
        select: {
          id: true,
          name: true,
          email: true,
          imgUrl: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function updateSessionStatus(
  sessionId: string,
  status: SessionStatus,
) {
  const profile = await getProfile()

  // Verify the user is the mentor for this session
  const mentoringSession = await prisma.mentoringSession.findFirst({
    where: {
      id: sessionId,
      mentorId: profile?.id,
    },
  })

  if (!mentoringSession) {
    throw new Error('Session not found or unauthorized')
  }

  return await prisma.mentoringSession.update({
    where: { id: sessionId },
    data: { status },
    include: {
      mentor: {
        select: {
          id: true,
          name: true,
          email: true,
          imgUrl: true,
        },
      },
      mentee: {
        select: {
          id: true,
          name: true,
          email: true,
          imgUrl: true,
        },
      },
    },
  })
}
