'use client'

import { useEffect, useState } from 'react'
import { StreamVideoClient } from '@stream-io/video-react-sdk'
import { useGetHomeState } from '@/hooks/useGetHomeState'

export const useVideoClient = () => {
  const { data, loading, error } = useGetHomeState()
  const [videoClient, setVideoClient] = useState<StreamVideoClient>()

  useEffect(() => {
    if (data) {
      const client = new StreamVideoClient({
        apiKey: data.apiKey,
        user: {
          id: data.profile.userId,
          name: data.profile.name,
        },
        token: data.token,
      })
      setVideoClient(client)

      return () => {
        client.disconnectUser()
        setVideoClient(undefined)
      }
    }
  }, [data])

  return {
    videoClient,
    loading,
    error
  }
}