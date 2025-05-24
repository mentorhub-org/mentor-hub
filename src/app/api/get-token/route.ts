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

  const userId = body.id
  const mail = body.email

  if (!userId || !mail) {
    return new Response('Missing required parameters', { status: 400 })
  }

  const token = serverClient.createToken(userId)

  return Response.json({ userId, token })
}
