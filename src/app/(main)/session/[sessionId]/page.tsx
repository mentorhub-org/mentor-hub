'use client'

import { ReviewModal } from '@/app/(main)/session/[sessionId]/ReviewModal'
import { useJoinCall } from '@/hooks/streamIO/useJoinCall'
import { useGetProfile } from '@/hooks/useGetProfile'
import type { MentoringSession } from '@prisma/client'
import {
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
} from '@stream-io/video-react-sdk'
import { redirect, useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function Session() {
  const { sessionId } = useParams()
  const { profile } = useGetProfile()
  const ref = useRef(false)
  const [session, setSession] = useState<MentoringSession>()
  const [sessionLoading, setSessionLoading] = useState(true)
  const { call, videoClient, isLoading } = useJoinCall()

  useEffect(() => {
    try {
      const fetchSession = async () => {
        setSessionLoading(true)
        const session = await fetch(
          `/api/mentoring-sessions/${sessionId}`,
        ).then(res => res.json())

        setSession(session)
        setSessionLoading(false)
      }
      fetchSession()
    } catch (error) {
      console.error('Error fetching session:', error)
    }
  }, [])

  useEffect(() => {
    const joinCall = async () => {
      if (!ref.current && call) {
        await call.join({ create: true })
        ref.current = true
      }
    }
    joinCall()
  }, [call])

  const [showReview, setShowReview] = useState(false)
  if (isLoading || !call || !videoClient || sessionLoading || !session) {
    return <p>Loading...</p>
  }

  const handleLeave = () => {
    call?.leave()
    if (profile?.id == session?.mentorId) {
      redirect('/')
    }
    setShowReview(true)
  }

  return (
    <>
      <StreamVideo client={videoClient}>
        <StreamCall call={call}>
          <StreamTheme className="light">
            <SpeakerLayout />
            <CallControls onLeave={handleLeave} />
          </StreamTheme>
        </StreamCall>
      </StreamVideo>
      <ReviewModal
        open={showReview}
        onOpenChange={setShowReview}
        session={session}
      />
    </>
  )
}
