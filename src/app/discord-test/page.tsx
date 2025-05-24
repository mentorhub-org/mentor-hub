'use client'

import { useStream } from '@/hooks/streamIO/useStream'
import { User } from 'stream-chat'
import { LoadingIndicator } from 'stream-chat-react'
import MyChat from './components/my-chat'

export type HomeState = {
  apiKey: string
  user: User
  token: () => Promise<string>
}

export default function DiscordTest() {
  const stream = useStream()
  if (!stream) return <div>loading...</div>
  const { homeState, error, isLoading } = stream

  if (isLoading || !homeState) {
    return (
      <main className="flex justify-center w-full items-center h-screen bg-gray-100">
        <LoadingIndicator />
      </main>
    )
  } else if (error) {
    return <div>error</div>
  }

  return <MyChat {...homeState} />
}
