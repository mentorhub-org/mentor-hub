import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'
import { StreamChat } from 'stream-chat'
export async function POST(request: Request) {
  try {
    const apiKey = process.env.STREAM_API_KEY
    const apiSecret = process.env.STREAM_API_SECRET

    if (!apiKey || !apiSecret) {
      return NextResponse.json(
        { error: 'Stream API configuration missing' },
        { status: 500 },
      )
    }

    const serverClient = StreamChat.getInstance(apiKey, apiSecret)

    let body
    try {
      body = await request.json()
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 },
      )
    }

    const { id: userId, email: mail } = body

    if (!userId || !mail) {
      return NextResponse.json(
        { error: 'User ID and email are required' },
        { status: 400 },
      )
    }

    try {
      const res = await serverClient.upsertUser({
        id: userId,
        role: 'user',
        name: mail,
        imgUrl:
          'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/9.jpg',
      })
    } catch (error) {
      console.error('Error registering user with Stream:', error)
      return NextResponse.json(
        { error: 'Failed to register user with Stream' },
        { status: 500 },
      )
    }

    try {
      await prisma.profile.update({
        where: { userId: userId },
        data: { streamRegistered: true },
      })
    } catch (error) {
      // Attempt to rollback Stream user creation
      // await serverClient.deleteUser(userId)
      console.error('Error updating user profile:', error)
      return NextResponse.json(
        { error: 'Failed to update user profile' },
        { status: 500 },
      )
    }

    return NextResponse.json(
      {
        userid: userId,
        userName: mail,
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
