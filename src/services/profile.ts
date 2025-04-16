import prisma from '@/db/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export const getProfile = async () => {
  const session = await auth.api.getSession({ headers: await headers() })

  const res = prisma.profile.findUnique({
    where: { id: session?.user.id },
  })

  return res
}
