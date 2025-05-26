import type { StreamVideoClient } from '@stream-io/video-react-sdk'
import { ChannelHeader } from 'stream-chat-react'
import CreateCallButton from './create-call-button'

const EnhancedChannelHeader = ({
  videoClient,
}: {
  videoClient: StreamVideoClient
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <ChannelHeader />
      <div className="flex gap-2">
        <CreateCallButton isVideo={false} videoClient={videoClient} />
        <CreateCallButton isVideo={true} videoClient={videoClient} />
      </div>
    </div>
  )
}

export default EnhancedChannelHeader
