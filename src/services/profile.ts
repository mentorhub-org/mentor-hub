'use server'

import prisma from '@/db/prisma'
import type { Profile } from '@prisma/client'
import { getAuth } from './auth'

export const getProfile = async () => {
  const user = await getAuth()

  return await prisma.profile.findUnique({
    where: { userId: user.id },
  })
}

export const updateProfile = async (data: Partial<Profile>) => {
  const user = await getAuth()

  if (!user) throw new Error('Unauthorized')
  if (!data) throw new Error('No data provided')

  await prisma.profile.update({
    where: { userId: user.id },
    data,
  })
}
