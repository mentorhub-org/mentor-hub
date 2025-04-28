import prisma from '@/db/prisma'
import { getProfile } from '@/services/profile'
import { redirect } from 'next/navigation'

export default async function Setup() {
  const { profile } = await getProfile()
  const server = await prisma.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  })

  if (server) {
    return redirect(`/server/${server.id}`)
  }

  return <div>Create a Server </div>
}
