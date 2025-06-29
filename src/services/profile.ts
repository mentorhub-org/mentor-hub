'use server'

import prisma from '@/db/prisma'
import type { Profile, SocialLinks } from '@prisma/client'
import { getAuth } from './auth'

export const getAllProfiles = async () => {
  return await prisma.profile.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export const getProfile = async (id?: string) => {
  const user = await getAuth()

  if (!user) throw new Error('Unauthorized')

  const userId = id || user.id
  const profile = await prisma.profile.findUnique({
    where: { userId },
  })

  if (!profile) throw new Error('Profile not found')
  return profile
}

export const getProfileByUserEmail = async (email: string) => {
  return await prisma.profile.findUnique({
    where: { email },
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

export const getProfileSocialLinks = async (profileId: string) => {
  const user = await getAuth()
  if (!user) throw new Error('Unauthorized')

  if (!profileId) throw new Error('No profileId provided')

  let socialLinks = await prisma.socialLinks.findUnique({
    where: { profileId: profileId },
  })

  if (!socialLinks) {
    socialLinks = await prisma.socialLinks.create({
      data: {
        profileId,
        github: '',
        linkedin: '',
        x: '',
        behance: '',
        dribbble: '',
        facebook: '',
        instagram: '',
        pinterest: '',
        telegram: '',
        whatsapp: '',
        youtube: '',
      },
    })
  }

  return socialLinks
}

export const updateProfileSocialLinks = async (
  data: Partial<SocialLinks>,
  profileId: string,
) => {
  const user = await getAuth()

  if (!user) throw new Error('Unauthorized')
  if (!data) throw new Error('No data provided')

  await prisma.socialLinks.update({
    where: { profileId: profileId },
    data,
  })
}
