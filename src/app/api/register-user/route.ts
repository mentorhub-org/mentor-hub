import prisma from '@/db/prisma'
import { StreamChat } from 'stream-chat'

export async function POST(request: Request) {
  const apiKey = process.env.STREAM_API_KEY

  if (!apiKey) {
    return new Response('No API key found', { status: 500 })
  }

  const serverClient = StreamChat.getInstance(
    apiKey,
    process.env.STREAM_API_SECRET,
  )
  const body = await request.json()

  const userId = body.userId
  const mail = body.email

  if (!userId || !mail) {
    return new Response('No user ID or email found', { status: 400 })
  }

  await serverClient.upsertUser({
    id: userId,
    role: 'user',
    name: mail,
    imgUrl:
      'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/9.jpg',
  })

  const updateUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: { role: 'user', streamRegistered: true },
  })
  console.log(updateUser)

  const response = {
    userid: userId,
    userName: mail,
  }

  return Response.json(response, { status: 200 })
}
