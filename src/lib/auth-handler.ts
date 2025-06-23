'use server'

import { Login, Register } from '@/schema/auth'
import { redirect } from 'next/navigation'
import { auth } from './auth'

export const signUpEmail = async (data: Register) => {
  const { firstName, lastName, ...rest } = data
  auth.api.signUpEmail({
    body: {
      ...rest,
      name: `${firstName} ${lastName}`,
    },
  })
}

export const signInEmail = async (data: Login) => {
  auth.api.signInEmail({ body: data })
}

export const signOut = async () => {
  auth.api.signOut({ headers: {} })
}

const signInSocial = async (provider: 'google' | 'linkedin' | 'github') => {
  const { url } = await auth.api.signInSocial({
    body: { callbackURL: `${process.env.BASE_URL}/profile`, provider },
  })
  if (!url) {
    throw new Error('No URL returned from signInSocial')
  }
  redirect(url)
}

export const signInGoogle = async () => {
  await signInSocial('google')
}

export const signInGithub = async () => {
  await signInSocial('github')
}

export const signInLinkedIn = async () => {
  await signInSocial('linkedin')
}

export const signInFn = async (data: Login) => {
  try {
    await auth.api.signInEmail({
      body: data,
    })
  } catch (error) {
    console.log('error', error)
  }
  redirect('/profile/me')
}
