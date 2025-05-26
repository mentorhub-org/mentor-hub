'use client'

import type { Profile } from '@prisma/client'
import { useEffect, useState } from 'react'
import type { TokenProvider } from 'stream-chat'

export interface HomeStateData {
  apiKey: string
  profile: Profile
  token: TokenProvider
}

export interface UseHomeStateResult {
  data: HomeStateData | null
  loading: boolean
  error: string | null
}

export function useGetHomeState(): UseHomeStateResult {
  const [data, setData] = useState<HomeStateData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        const apiKeyPromise = new Promise<string>((resolve, reject) => {
          if (process.env.NEXT_PUBLIC_STREAM_API_KEY) {
            resolve(process.env.NEXT_PUBLIC_STREAM_API_KEY)
          } else {
            reject(
              new Error('Stream API key not found in environment variables'),
            )
          }
        })

        const profilePromise = fetch('/api/profile', { method: 'GET' }).then(
          async res => {
            if (!res.ok) {
              throw new Error(
                `Failed to fetch profile: ${res.status} ${res.statusText}`,
              )
            }
            return res.json() as Promise<Profile>
          },
        )

        const [apiKey, profile] = await Promise.all([
          apiKeyPromise,
          profilePromise,
        ])

        if (!profile?.userId || !profile?.email) {
          throw new Error('Profile data incomplete, cannot get token')
        }

        const apiTokenResponse = await fetch('/api/get-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: profile.userId,
            email: profile.email,
          }),
        })

        if (!apiTokenResponse.ok) {
          throw new Error(
            `Failed to get token: ${apiTokenResponse.status} ${apiTokenResponse.statusText}`,
          )
        }

        const apiTokenBody = await apiTokenResponse.json()
        const token = apiTokenBody.token as TokenProvider

        if (!token) {
          throw new Error('No token returned from API')
        }

        setData({ apiKey, profile, token })
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred',
        )
        setData(null) // Clear data on error
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, []) // Empty dependency array means this effect runs once on mount

  return { data, loading, error }
}
