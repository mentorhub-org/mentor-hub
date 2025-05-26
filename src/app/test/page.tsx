'use client'

import { useStream } from '@/hooks/streamIO/useStream'
import { useVideoClient } from '@/hooks/streamIO/useVideoClient'
import { StreamVideo } from '@stream-io/video-react-sdk'
import '@stream-io/video-react-sdk/dist/css/styles.css'
import { Chat } from 'stream-chat-react'
import 'stream-chat-react/dist/css/v2/index.css'
import ChatLayout from './components/ChatLayout'
import ChatSidebar from './components/ChatSidebar'
import ErrorScreen from './components/ErrorScreen'
import LoadingScreen from './components/LoadingScreen'
import VideoCallUI from './VideoCallUI'

export default function Chats() {
  const stream = useStream()
  const {
    videoClient,
    loading: videoLoading,
    error: videoError,
  } = useVideoClient()

  // Handle loading states
  if (!stream) {
    return <LoadingScreen message="Initializing chat..." />
  }

  const { profileLoading, profileError, client, homeState } = stream

  if (profileLoading || !homeState) {
    return <LoadingScreen message="Loading profile..." />
  }

  if (profileError) {
    return <ErrorScreen message={profileError.message || 'Profile error'} />
  }

  if (videoLoading) {
    return <LoadingScreen message="Setting up video capabilities..." />
  }

  if (videoError) {
    return <ErrorScreen message={videoError || 'Video client error'} />
  }

  if (!client || !videoClient) {
    return <LoadingScreen message="Connecting to Stream services..." />
  }

  return (
    <div className="container mx-auto">
      <Chat client={client}>
        <StreamVideo client={videoClient}>
          <div className="flex relative h-[98vh] rounded-2xl overflow-hidden">
            <ChatSidebar />
            <ChatLayout videoClient={videoClient} />
          </div>
          <VideoCallUI />
        </StreamVideo>
      </Chat>
    </div>
  )
}
