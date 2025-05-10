'use server'

import prisma from '@/db/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export const getAuth = async () => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) throw new Error('Unauthorized')

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  })

  if (!user) throw new Error('Unauthorized')

  return user
}
