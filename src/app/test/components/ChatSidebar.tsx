'use client'

import { useState } from 'react'
import { ChannelList } from 'stream-chat-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useRequest } from 'ahooks'
import { getProfileByUserEmail } from '@/services/profile'
import { useCreateChannel } from '@/hooks/streamIO/useCreateChannel'

const ChatSidebar = () => {
  const [targetEmail, setTargetEmail] = useState<string>('')
  const { loading: getProfileLoading, runAsync: getProfile } = useRequest(
    getProfileByUserEmail,
    {
      manual: true,
    }
  )
  
  const channelHook = useCreateChannel()
  
  if (!channelHook) return <div>Channel creation unavailable</div>
  
  const { createChannel, isLoading: channelCreateLoading } = channelHook

  const handleAddChat = async () => {
    if (!targetEmail) return
    const res = await getProfile(targetEmail)
    if (!res) return
    createChannel({ memberProfiles: [res] })
  }

  return (
    <div className="mb-24">
      <ChannelList filters={{}} />
      <Input
        type="text"
        value={targetEmail}
        onChange={e => setTargetEmail(e.target.value)}
        placeholder="Enter email"
        className="h-11"
      />
      <Button
        onClick={handleAddChat}
        disabled={channelCreateLoading || getProfileLoading}
        className="w-full mt-2 h-11"
        variant="default"
      >
        {channelCreateLoading || getProfileLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading
          </>
        ) : (
          'Add Chat'
        )}
      </Button>
    </div>
  )
}

export default ChatSidebar