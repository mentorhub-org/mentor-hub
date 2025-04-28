'use client'

import { useSession } from '@/hooks/useSession'
import { useCallback, useState } from 'react'
import { User } from 'stream-chat'
import { LoadingIndicator } from 'stream-chat-react'

type HomeState = {
  apiKey: string
  user: User
  token: string
}

export default function Home() {
  const [homeState, setHomeState] = useState<HomeState>()
  const { data, error, isLoading } = useSession()

  const registerUser = useCallback(
    async function registerUser() {
      if (!data?.session.userId || data?.user.email) return
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
      const responseBody = response.json()
      return responseBody
    },
    [data?.session.userId, data?.user.email],
  )

  async function getToken() {
    const response = await fetch('/api/get-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: data?.session.userId,
      }),
    })
    const responseBody = response.json()
    const token = responseBody.token

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

    const apikey = process.env.STREAM_API_KEY

    if (!apikey) {
      console.error('No API key found')
      return
    }

    setHomeState({
      apiKey: apikey,
      user: user,
      token: token,
    })
  }

  if (!isLoading || !homeState) {
    return <LoadingIndicator />
  } else if (error) {
    return <div>error</div>
  }

  return <div>welcome to discord</div>
}
