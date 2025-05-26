'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCreateChannel } from '@/hooks/streamIO/useCreateChannel'
import { useStream } from '@/hooks/streamIO/useStream'
import { useGetHomeState } from '@/hooks/useGetHomeState'
import { getProfileByUserEmail } from '@/services/profile'
import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk'
import '@stream-io/video-react-sdk/dist/css/styles.css'
import { useRequest } from 'ahooks'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
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
import EnhancedChannelHeader from './EnhancedChannelHeader'
import VideoCallUI from './VideoCallUI'

type Props = {}

export default function Chats({}: Props) {
  const { data } = useGetHomeState()
  const stream = useStream()
  const [targetEmail, setTargetEmail] = useState<string>('')
  const { loading: getProfileLoading, runAsync: getProfile } = useRequest(
    getProfileByUserEmail,
    {
      manual: true,
    },
  )
  const [videoClient, setVideoClient] = useState<StreamVideoClient>()
  const temp = useCreateChannel()

  useEffect(() => {
    if (stream?.client && data) {
      const _client = new StreamVideoClient({
        apiKey: data.apiKey,
        user: {
          id: data.profile.userId,
          name: data.profile.name,
        },
        token: data.token, // Add the missing token
      })
      setVideoClient(_client)

      return () => {
        _client.disconnectUser()
        setVideoClient(undefined)
      }
    }
  }, [stream?.client, data]) // Add proper dependencies

  if (!temp) return <div>There is a problem in useCreateChannel hook</div>

  const { createChannel, isLoading: channleCreateLoading } = temp

  if (!stream) return <div>loading...</div>
  const { homeState, profileError, profileLoading, client } = stream

  if (profileLoading || !homeState) {
    return (
      <main className="flex justify-center w-full items-center h-screen bg-gray-100">
        <LoadingIndicator />
      </main>
    )
  } else if (profileError) {
    return <div>error</div>
  }

  if (!client || !videoClient) {
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
  }
  return (
    <div className="container mx-auto">
      <Chat client={client}>
        <StreamVideo client={videoClient}>
          <div className="flex relative h-[98vh] rounded-2xl overflow-hidden">
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
                  <EnhancedChannelHeader videoClient={videoClient} />
                  <MessageList />
                  <MessageInput />
                </Window>
              </Channel>
            </div>
          </div>
          <VideoCallUI />
        </StreamVideo>
      </Chat>
    </div>
  )
}
