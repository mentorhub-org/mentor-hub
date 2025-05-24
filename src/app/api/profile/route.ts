import prisma from '@/db/prisma'
import { getAuth } from '@/services/auth'

export async function GET() {
  try {
    const user = await getAuth()
    if (!user)
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      })

    const profile = await prisma.profile.findUnique({
      where: {
        userId: user.id,
      },
    })

    if (!profile) {
      return new Response(JSON.stringify({ error: 'Profile not found' }), {
        status: 404,
      })
    }

    return new Response(JSON.stringify(profile), {
      status: 200,
    })
  } catch (error) {
    console.error('Error fetching profile:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    })
  }
}
