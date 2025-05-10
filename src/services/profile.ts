'use server'

import prisma from '@/db/prisma'
import type { Profile, SocialLinks } from '@prisma/client'
import { getAuth } from './auth'

export const getProfile = async () => {
  'use server'
  console.log('getProfile')
  const user = await getAuth()

  if (!user) throw new Error('Unauthorized')

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
