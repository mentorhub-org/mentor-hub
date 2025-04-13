import prisma from '@/db/prisma'
import { Server as HttpServer } from 'http'
import { Server, Socket } from 'socket.io'
import { auth } from './auth'

interface MessageData {
  content: string
  chatId: string
  senderId: string
}

interface SavedMessage {
  id: string
  content: string
  chatId: string
  senderId: string
  createdAt: Date
  isRead: boolean
  sender: {
    id: string
    name: string
  }
}

// Extend Socket with session data
interface AuthenticatedSocket extends Socket {
  user?: { id: string; name: string }
}

export function initSocket(server: HttpServer): Server {
  const io = new Server(server)

  // Middleware to authenticate socket connections
  io.use(async (socket: AuthenticatedSocket, next) => {
    const sessionToken = socket.handshake.auth.token
    if (!sessionToken) {
      return next(new Error('Authentication token missing'))
    }

    try {
      const session = await auth.api.getSession({
        headers: sessionToken,
      })
      if (!session || !session.user) {
        return next(new Error('Invalid or expired session'))
      }

      socket.user = {
        id: session.user.id,
        name: session.user.name,
      }
      next()
    } catch (error) {
      next(new Error('Authentication failed', error?.message))
    }
  })

  io.on('connection', (socket: AuthenticatedSocket) => {
    console.log(`User ${socket.user?.id} connected`)

    socket.on('join-chat', (chatId: string) => {
      // Verify user is a member of the chat
      prisma.chatMembership
        .findFirst({
          where: { chatId, userId: socket.user!.id },
        })
        .then(membership => {
          if (membership) {
            socket.join(chatId)
            console.log(`User ${socket.user!.id} joined chat ${chatId}`)
          } else {
            socket.emit('error', 'Not a member of this chat')
          }
        })
    })

    socket.on('send-message', async (message: MessageData) => {
      try {
        // Ensure senderId matches authenticated user
        if (message.senderId !== socket.user!.id) {
          socket.emit('error', 'Unauthorized sender')
          return
        }

        const savedMessage: SavedMessage = await prisma.message.create({
          data: {
            content: message.content,
            chatId: message.chatId,
            senderId: socket.user!.id,
          },
          include: { sender: true },
        })

        io.to(message.chatId).emit('new-message', savedMessage)
      } catch (error) {
        console.error('Error saving message:', error)
        socket.emit('error', 'Failed to send message')
      }
    })

    socket.on('disconnect', () => {
      console.log(`User ${socket.user?.id} disconnected`)
    })
  })

  return io
}
