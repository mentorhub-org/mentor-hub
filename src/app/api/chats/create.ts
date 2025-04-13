import prisma from '@/db/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { userIds, isPublic, name } = req.body

  try {
    if (!isPublic && userIds.length !== 2) {
      return res
        .status(400)
        .json({ message: 'Private chats must have exactly 2 participants' })
    }

    const chat = await prisma.chat.create({
      data: {
        name: isPublic ? name : null, // Name is optional for private chats
        isPublic,
        members: {
          create: userIds.map((userId: string) => ({
            userId,
          })),
        },
      },
      include: {
        members: {
          include: { user: true },
        },
      },
    })

    return res.status(201).json(chat)
  } catch (error) {
    return res.status(500).json({ message: 'Error creating chat', error })
  }
}
