'use client'
import { useJoinCall } from '@/hooks/streamIO/useJoinCall'
import {
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
} from '@stream-io/video-react-sdk'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function Session() {
  const { call, videoClient, isLoading } = useJoinCall()

  // useEffect(() => {
  //   window.location.reload()
  // }, [])

  useEffect(() => {
    call?.join({ create: true })
  }, [call])

  if (isLoading || !call || !videoClient) {
    return <p>Loading...</p>
  }

  return (
    <StreamVideo client={videoClient}>
      <StreamCall call={call}>
        <StreamTheme className="light">
          <SpeakerLayout />
          <CallControls
            onLeave={() => {
              call?.leave()
              redirect('/')
            }}
          />
        </StreamTheme>
      </StreamCall>
    </StreamVideo>
  )
}
