'use client'

import { getProfile } from '@/services/profile'
import { useRequest } from 'ahooks'
import { useCallback, useEffect, useState } from 'react'
import { StreamChat, User } from 'stream-chat'

type HomeState = {
  apiKey: string
  user: User
  token: () => Promise<string>
}

export const useStream = () => {
  const {
    data: profile,
    loading: profileLoading,
    error: profileError,
  } = useRequest(getProfile)
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY
  const [client, setClient] = useState<StreamChat | null>(null)
  const [homeState, setHomeState] = useState<HomeState>()
  const [connectionError, setConnectionError] = useState<Error | null>(null)

  if (!apiKey) {
    console.error('No Stream API key found in environment variables')
    return {
      client: null,
      registerUser: null,
      homeState: undefined,
      profileError: new Error('Stream API key is missing'),
      profileLoading,
      connectionError: new Error('Stream API key is missing'),
    }
  }

  const getToken = useCallback(async () => {
    try {
      if (!profile?.userId || !profile?.email) {
        console.warn('Profile data incomplete, cannot get token')
        return
      }

      const response = await fetch('/api/get-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: profile.userId,
          email: profile.email,
        }),
      })

      if (!response.ok) {
        throw new Error(
          `Failed to get token: ${response.status} ${response.statusText}`,
        )
      }

      const responseBody = await response.json()
      const token = responseBody.token

      if (!token) {
        throw new Error('No token returned from API')
      }

      const user = {
        id: profile.userId,
        name: profile.name,
      } as User

      setHomeState({
        apiKey: apiKey,
        user: user,
        token: token,
      })
    } catch (error) {
      console.error('Error getting token:', error)
      setConnectionError(
        error instanceof Error ? error : new Error('Failed to get token'),
      )
    }
  }, [profile, apiKey])

  const registerUser = useCallback(
    async function () {
      try {
        if (!profile?.userId || !profile?.email) {
          console.warn('Profile data incomplete, cannot register user')
          return null
        }

        const response = await fetch('/api/register-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: profile.userId,
            email: profile.email,
            name: profile.name,
            image: profile?.imgUrl,
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
        setConnectionError(
          error instanceof Error ? error : new Error('Failed to register user'),
        )
        return null
      }
    },
    [profile],
  )

  useEffect(() => {
    if (profile?.userId) {
      registerUser().then(result => {
        if (result) {
          getToken()
        }
      })
    }
  }, [profile, getToken, registerUser])

  useEffect(() => {
    if (!homeState?.user?.id || !homeState?.token) {
      return
    }

    // Clean up previous client if it exists
    if (client) {
      client.disconnectUser().catch(err => {
        console.error('Error disconnecting previous user:', err)
      })
      setClient(null)
    }

    let isActive = true
    const streamClient = StreamChat.getInstance(apiKey)
    setConnectionError(null)

    const connectUser = async () => {
      try {
        await streamClient.connectUser(homeState.user, homeState.token)

        if (isActive) {
          console.log('Successfully connected to Stream chat')
          setClient(streamClient)
        }
      } catch (error) {
        console.error('Error connecting user:', error)
        if (isActive) {
          setConnectionError(
            error instanceof Error
              ? error
              : new Error('Failed to connect user'),
          )
          setClient(null)
        }
      }
    }

    // Add a small delay before connecting to ensure previous connections are closed
    const timer = setTimeout(() => {
      connectUser()
    }, 300)

    return () => {
      isActive = false
      clearTimeout(timer)

      // Only disconnect if we have a client
      if (streamClient) {
        streamClient.disconnectUser().catch(err => {
          console.error('Error disconnecting user:', err)
        })
      }

      setClient(null)
    }
  }, [apiKey, homeState])

  return {
    client,
    registerUser,
    homeState,
    profileError,
    profileLoading,
    connectionError,
  }
}
