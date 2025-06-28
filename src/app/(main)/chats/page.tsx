'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCreateChat } from '@/hooks/streamIO/useCreateChat'
import { useStream } from '@/hooks/streamIO/useStream'
import { getProfileByUserEmail } from '@/services/profile'
import { useRequest } from 'ahooks'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
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

type Props = {}

export default function Chats({}: Props) {
  const stream = useStream()
  const { loading: getProfileLoading, runAsync: getProfile } = useRequest(
    getProfileByUserEmail,
    {
      manual: true,
    },
  )
  const [targetEmail, setTargetEmail] = useState<string>('')
  const temp = useCreateChat()
  const filters = { members: { $in: ['jimmy'] } }
  const options = { limit: 10 }

  if (!temp) return <div>There is a problem in useCreateChat hook</div>

  const { createChannel, isLoading: channleCreateLoading } = temp

  if (!stream) return <div>loading...</div>
  const { homeState, profileError, profileLoading, client } = stream

  if (profileLoading || !homeState) {
    return (
      <main className="flex justify-center w-full items-center h-[calc(100vh-95px)] bg-gray-100">
        <LoadingIndicator />
      </main>
    )
  } else if (profileError) {
    return <div>error</div>
  }

  if (!client) {
    return (
      <main className="flex justify-center w-full items-center h-screen bg-gray-100">
        <LoadingIndicator />
      </main>
    )
  }

  const handleAddChat = async () => {
    if (!targetEmail) return
    const res = await getProfile(targetEmail)
    if (!res) return
    createChannel({ memberProfiles: [res] })
    setTargetEmail('')
  }

  return (
    <div className="container mx-auto">
      <Chat client={client} theme="str-chat-theme-dark">
        <div className="flex relative h-[calc(100vh-95px)] rounded-2xl overflow-hidden">
          <div className="mb-24 min-w-[15rem]">
            <ChannelList
              filters={filters}
              sort={{ last_message_at: -1 }}
              options={options}
            />
            <Input
              type="text"
              value={targetEmail}
              onChange={e => setTargetEmail(e.target.value)}
              placeholder="Enter email"
              className="h-11"
            />
            <Button
              onClick={handleAddChat}
              disabled={channleCreateLoading || getProfileLoading}
              className="w-full mt-2 h-11"
              variant="default">
              {channleCreateLoading || getProfileLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading
                </>
              ) : (
                'Add Chat'
              )}
            </Button>
          </div>
          <div className="w-full rounded-2xl">
            <Channel>
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
              </Window>
            </Channel>
          </div>
        </div>
      </Chat>
    </div>
  )
}
