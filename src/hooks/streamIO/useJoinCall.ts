'use client'

import { useParams } from 'next/navigation'
import { useVideoClient } from './useVideoClient'

export function useJoinCall() {
  const { sessionId } = useParams()
  const { videoClient } = useVideoClient()

  if (!sessionId) {
    return { call: null, videoClient: null, isLoading: true }
  }

  const id = typeof sessionId === 'string' ? sessionId : sessionId[0]

  const call = videoClient?.call('default', id)

  return { call, videoClient }
}
