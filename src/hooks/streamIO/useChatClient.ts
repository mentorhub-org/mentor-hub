'use client'

import { useGetHomeState } from '@/hooks/useGetHomeState'
import { useCallback, useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat'

export const useChatClient = () => {
  const { data, loading, error } = useGetHomeState()
  const [chatClient, setChatClient] = useState<StreamChat>()

  const registerUser = useCallback(
    async function () {
      try {
        if (!data?.profile?.userId || !data?.profile?.email) {
          console.warn('Profile data incomplete, cannot register user')
          return null
        }

        const response = await fetch('/api/register-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: data.profile.userId,
            email: data.profile.email,
            name: data.profile.name,
            image: data.profile?.imgUrl,
          }),
        })

        if (!response.ok) {
          throw new Error(
            `Failed to register user: ${response.status} ${response.statusText}`,
          )
        }

        const responseBody = await response.json()
        return responseBody
      } catch (error) {
        console.error('Error registering user:', error)
        return null
      }
    },
    [data],
  )

  useEffect(() => {
    if (!data?.profile.userId) {
      registerUser()
    }
  }, [data, registerUser])

  useEffect(() => {
    if (!data) return

    const _client = StreamChat.getInstance(data.apiKey)

    const connectUser = async () => {
      try {
        await _client.connectUser({ id: data.profile.userId }, data.token)
        console.log('Successfully connected to Stream chat')
        setChatClient(_client)
      } catch (error) {
        console.error('Error connecting user:', error)
      }
    }

    connectUser()

    return () => {
      if (chatClient) {
        chatClient.disconnectUser().catch(err => {
          console.error('Error disconnecting user:', err)
        })
      }
    }
  }, [data])

  return {
    chatClient,
    loading,
    error,
  }
}
