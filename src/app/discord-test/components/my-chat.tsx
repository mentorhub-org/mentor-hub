'use client'

import { useClient } from '@/hooks/streamIO/useClient'
import {
  Channel,
  ChannelList,
  Chat,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Window,
} from 'stream-chat-react'
import 'stream-chat-react/dist/css/v2/index.css'
import { HomeState } from '../page'
import ServerList from './server-list/server-list'

type Props = HomeState & {}

export default function MyChat({ apiKey, token, user }: Props) {
  const chatClient = useClient({ apiKey, user, token })

  if (!chatClient) {
    return (
      <main className="flex justify-center w-full items-center h-screen bg-gray-100">
        <LoadingIndicator />
      </main>
    )
  }

  return (
    <Chat client={chatClient} theme="str-chat-theme-dark">
      <section className="flex h-screen w-full layout">
        <ServerList />
        <ChannelList />
        <Channel>
          <Window>
            <MessageList />
            <MessageInput />
          </Window>
        </Channel>
      </section>
    </Chat>
  )
}
