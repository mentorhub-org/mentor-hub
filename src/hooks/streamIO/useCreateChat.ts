'use client'

import type { Profile } from '@prisma/client'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useGetProfile } from '../useGetProfile'
import { useStream } from './useStream'

export const useCreateChat = () => {
  const streamChat = useStream()
  const { profile, profileError, profileLoading } = useGetProfile()

  if (!streamChat) return null
  const { client } = streamChat
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const createChannel = async ({
    memberProfiles,
  }: {
    memberProfiles: Array<Profile>
  }) => {
    setIsLoading(true)
    setError(null)

    try {
      if (!client) throw new Error('Stream client not initialized')
      if (!profile) throw new Error('Current user not found' + profileError)

      // Generate a unique channel ID
      const channelId = uuidv4()

      // Extract member IDs and ensure current user is included
      const memberIds = [
        ...new Set([
          ...memberProfiles.map(profile => profile.userId),
          profile.userId,
        ]),
      ]

      // Generate channel name based on members
      let channelName = ''
      if (memberProfiles.length === 1) {
        // If there's only one other member, use their name
        channelName = memberProfiles[0].name
      } else {
        // For group chats, use 'Group' with a random number
        const randomNum = Math.floor(Math.random() * 1000)
        channelName = `Group ${randomNum}`
      }

      const channel = client.channel('messaging', channelId, {
        members: memberIds,
        name: channelName,
      })

      await channel.create()
      setIsLoading(false)
      return channel
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to create channel'),
      )
      setIsLoading(false)
      throw err
    }
  }

  return {
    createChannel,
    isLoading,
    error,
  }
}
