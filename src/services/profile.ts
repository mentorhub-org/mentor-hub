import prisma from '@/db/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export const getProfile = async () => {
  'use server'
  const session = await auth.api.getSession({ headers: await headers() })

  const profile = await prisma.profile.findUnique({
    where: { userId: session?.user.id },
  })

  return { profile, session }
}
