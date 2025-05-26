import { Button } from '@/components/ui/button'
import {
  StreamVideoClient,
  type MemberRequest,
} from '@stream-io/video-react-sdk'
import { Phone, Video } from 'lucide-react'
import { useChannelStateContext } from 'stream-chat-react'

const CreateCallButton = ({
  isVideo = false,
  videoClient,
}: {
  isVideo?: boolean
  videoClient: StreamVideoClient
}) => {
  const { channel } = useChannelStateContext()

  const createCall = () => {
    if (!videoClient || !channel)
      return console.log('No video client or channel')

    const meetingId = () => `call-${Date.now()}`

    videoClient.call('default', meetingId()).getOrCreate({
      ring: true,
      data: {
        custom: {
          channelCid: channel.cid,
        },
        members: Object.values(channel.state.members).map<MemberRequest>(
          member => ({ user_id: member.user_id! }),
        ),
      },
    })
  }

  return (
    <Button
      onClick={createCall}
      disabled={!videoClient}
      size="sm"
      variant="outline">
      {isVideo ? <Video className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
    </Button>
  )
}

export default CreateCallButton
