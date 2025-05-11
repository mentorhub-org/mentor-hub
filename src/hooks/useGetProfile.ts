import type { Profile } from '@prisma/client'
import { useEffect, useState } from 'react'

export const useGetProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [profileLoading, setProfileLoading] = useState(true)
  const [profileError, setProfileError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setProfileLoading(true)
        const response = await fetch('/api/profile')

        if (!response.ok) {
          throw new Error('Failed to fetch profile')
        }

        const data = await response.json()
        setProfile(data)
      } catch (err) {
        setProfileError(
          err instanceof Error ? err.message : 'An error occurred',
        )
      } finally {
        setProfileLoading(false)
      }
    }

    fetchProfile()
  }, [])

  return { profile, profileLoading, profileError }
}
