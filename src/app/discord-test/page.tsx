'use client'

import { useSession } from '@/hooks/useSession'
import { useCallback, useEffect, useState } from 'react'
import { User } from 'stream-chat'
import { LoadingIndicator } from 'stream-chat-react'
import MyChat from './components/my-chat'

export type HomeState = {
  apiKey: string
  user: User
  token: () => Promise<string>
}

export default function DiscordTest() {
  const [homeState, setHomeState] = useState<HomeState>()
  const { data, error, isLoading } = useSession()
  const registerUser = useCallback(
    async function () {
      if (!data?.session.userId || !data?.user.email) {
        console.error('No user id or email found')
        return
      }
      const response = await fetch('/api/register-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: data?.session.userId,
          email: data?.user.email,
        }),
      })
      const responseBody = await response.json()

      return responseBody
    },
    [data?.session.userId, data?.user.email],
  )

  const getToken = useCallback(async () => {
    const response = await fetch('/api/get-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: data?.session.userId,
        email: data?.user.email,
      }),
    })
    const responseBody = await response.json()
    const token = responseBody.token
    console.log('token', token)
    console.log('responseBody', responseBody)

    if (!token) {
      console.error('No token found')
      return
    }

    if (!data?.session.userId) {
      console.error('No user id found')
      return
    }

    const user: User = {
      id: data?.session.userId,
      name: data?.user.name,
      image:
        data?.user.image ||
        `https://getstream.io/random_png/?id=${data.user.id}&name=${data.user.name}`,
    }

    const apikey = process.env.NEXT_PUBLIC_STREAM_API_KEY

    if (!apikey) {
      console.error('No API key found')
      return
    }

    setHomeState({
      apiKey: apikey,
      user: user,
      token: token,
    })
  }, [
    data?.session.userId,
    data?.user.email,
    data?.user.name,
    data?.user.image,
    data?.user.id,
  ])

  useEffect(() => {
    if (data?.session.userId) {
      registerUser().then(() => {
        getToken()
      })
    }
  }, [
    data?.session.userId,
    data?.user?.streamRegistered,
    getToken,
    registerUser,
  ])

  if (isLoading || !homeState) {
    return (
      <main className="flex justify-center w-full items-center h-screen bg-gray-100">
        <LoadingIndicator />
      </main>
    )
  } else if (error) {
    return <div>error</div>
  }

  return <MyChat {...homeState} />
}
