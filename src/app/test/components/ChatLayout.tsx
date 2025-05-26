'use client'

import { StreamVideoClient } from '@stream-io/video-react-sdk'
import { Channel, MessageInput, MessageList, Window } from 'stream-chat-react'
import EnhancedChannelHeader from './EnhancedChannelHeader'

interface ChatLayoutProps {
  videoClient: StreamVideoClient
}

const ChatLayout = ({ videoClient }: ChatLayoutProps) => {
  return (
    <div className="w-full rounded-2xl">
      <Channel>
        <Window>
          <EnhancedChannelHeader videoClient={videoClient} />
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </div>
  )
}

export default ChatLayout
