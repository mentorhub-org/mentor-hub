import prisma from '@/db/prisma'
import { auth } from '@/lib/auth'
import { NextApiRequest, NextApiResponse } from 'next'

export default auth.handler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const session = req.session // Provided by better-auth middleware
    if (!session?.user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' })
    }

    const { chatId } = req.query

    if (typeof chatId !== 'string') {
      return res.status(400).json({ error: 'Invalid chatId' })
    }

    // Verify user is a member of the chat
    const membership = await prisma.chatMembership.findFirst({
      where: { chatId, userId: session.user.id },
    })

    if (!membership) {
      return res.status(403).json({ error: 'Not a member of this chat' })
    }

    const messages = await prisma.message.findMany({
      where: { chatId },
      include: { sender: true },
      orderBy: { createdAt: 'asc' },
    })

    res.status(200).json(messages)
  },
)
