'use client'

import { useGetHomeState } from '@/hooks/useGetHomeState'
import { StreamVideoClient } from '@stream-io/video-react-sdk'
import { useEffect, useState } from 'react'

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
        token: data.token.toString(),
        options: {
          onConnectUserError: error => {
            console.error('Khaled Error : ', error)
          },
        },
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
    error,
  }
}
