'use client'

import type { StreamVideoClient } from '@stream-io/video-react-sdk'
import { ChannelHeader } from 'stream-chat-react'
import CreateCallButton from '../create-call-button'

const EnhancedChannelHeader = ({
  videoClient,
}: {
  videoClient: StreamVideoClient
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <ChannelHeader />
      <div className="flex gap-2">
        <CreateCallButton videoClient={videoClient} isVideo={false} />
        <CreateCallButton videoClient={videoClient} isVideo={true} />
      </div>
    </div>
  )
}

export default EnhancedChannelHeader
