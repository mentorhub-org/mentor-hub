'use client'

import { useClient } from '@/hooks/streamIO/useClient'
import { useEffect, useState } from 'react'
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Window,
} from 'stream-chat-react'
import 'stream-chat-react/dist/css/v2/index.css'
import { HomeState } from '../page'

type Props = HomeState & {}

export default function MyChat({ apiKey, token, user }: Props) {
  const chatClient = useClient({ apiKey, user, token })
  const [channel, setChannel] = useState(null)

  useEffect(() => {
    if (!chatClient || !chatClient.userID) return

    const initChannel = async () => {
      const targetUserId = 'BPBKaKOv1am4uJgePwaz3BZH4N50KReJ' // Replace with dynamic user ID
      const newChannel = chatClient.channel('messaging', {
        members: [chatClient.userID, targetUserId],
        name: `Chat with ${targetUserId}`,
      })
      await newChannel.create()
      await newChannel.watch()
      setChannel(newChannel)
    }

    initChannel()
  }, [chatClient])

  if (!chatClient) return <div>Loading...</div>

  if (!chatClient) {
    return (
      <main className="flex justify-center w-full items-center h-screen bg-gray-100">
        <LoadingIndicator />
      </main>
    )
  }

  return (
    <Chat client={chatClient} theme="str-chat-theme-dark">
      <ChannelList filters={{ members: { $in: [apiKey] } }} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </Chat>
  )
}
