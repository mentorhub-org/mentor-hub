'use client'

import { useSession } from 'better-auth/react' // better-auth hook for session
import { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'

interface Message {
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

interface ChatWindowProps {
  chatId: string
}

export default function ChatWindow({ chatId }: ChatWindowProps) {
  const { data: session, status } = useSession() // Get session from better-auth
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState<string>('')
  const [socket, setSocket] = useState<Socket | null>(null)

  // Fetch initial chat data and messages
  const fetchMessages = async () => {
    const res = await fetch(`/api/messages?chatId=${chatId}`, {
      headers: {
        Authorization: `Bearer ${session?.sessionToken}`,
      },
    })
    if (res.ok) {
      const data: Message[] = await res.json()
      setMessages(data)
    }
  }

  useEffect(() => {
    if (status !== 'authenticated' || !session?.user) return

    // Initialize Socket.io with session token
    const newSocket = io({
      auth: {
        token: session.sessionToken, // Pass session token for authentication
      },
    })

    setSocket(newSocket)

    // Fetch initial messages
    fetchMessages()

    // Join chat
    newSocket.emit('join-chat', chatId)

    // Listen for new messages
    newSocket.on('new-message', (message: Message) => {
      setMessages(prev => [...prev, message])
    })

    // Handle errors
    newSocket.on('error', (error: string) => {
      console.error('Socket error:', error)
    })

    // Cleanup
    return () => {
      newSocket.disconnect()
      setSocket(null)
    }
  }, [chatId, status, session])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !session?.user || !socket) return

    const messageData: MessageData = {
      content: newMessage,
      chatId,
      senderId: session.user.id,
    }

    socket.emit('send-message', messageData)
    setNewMessage('')
  }

  if (status === 'loading') return <div>Loading...</div>
  if (status === 'unauthenticated') return <div>Please sign in to chat</div>

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`message ${msg.senderId === session?.user.id ? 'sent' : 'received'}`}>
            <span>
              {msg.sender.name}: {msg.content}
            </span>
            <small>{new Date(msg.createdAt).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
