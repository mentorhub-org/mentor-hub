'use client'
import { ReviewModal } from '@/app/(main)/session/[sessionId]/ReviewModal'
import { useJoinCall } from '@/hooks/streamIO/useJoinCall'
import {
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
} from '@stream-io/video-react-sdk'
import { redirect } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function Session() {
  const ref = useRef(false)
  const { call, videoClient, isLoading } = useJoinCall()

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
  const [review, setReview] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleLeave = () => {
    call?.leave()
    setShowReview(true)
  }

  const handleSubmitReview = async () => {
    setSubmitting(true)
    // TODO: Send review to API/backend here
    setShowReview(false)
    setSubmitting(false)
    redirect('/')
  }

  if (isLoading || !call || !videoClient) {
    return <p>Loading...</p>
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
        review={review}
        setReview={setReview}
        submitting={submitting}
        onSubmit={handleSubmitReview}
      />
    </>
  )
}
