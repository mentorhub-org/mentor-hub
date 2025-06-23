'use client'

import { Button } from '@/components/ui/button'
import Image, { type StaticImageData } from 'next/image'
import { useState } from 'react'
import CreateSessionDialog from './CreateSessionDialog'

type ProfileInfoProps = {
  name: string
  title: string
  id: string
  rating: number
  profileImage: string | StaticImageData
}

export default function ProfileInfo({
  name,
  title,
  id,
  rating,
  profileImage,
}: ProfileInfoProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSessionDialogOpen, setIsSessionDialogOpen] = useState(false)

  const handleChatRequest = async () => {
    setIsLoading(true)
    // API call to initiate chat would go here
    setIsLoading(false)
  }

  const handleSessionRequest = () => {
    setIsSessionDialogOpen(true)
  }

  return (
    <div className="text-center">
      <Image
        src={profileImage || '/default-profile-image.png'}
        alt={`${name}'s profile`}
        width={128}
        height={128}
        className="rounded-full mx-auto w-24 h-24 md:w-32 md:h-32 object-cover"
      />
      <h2 className="text-2xl font-bold mt-4 text-gray-800">{name}</h2>
      <p className="text-darkblue font-medium">{title}</p>
      <p className="text-gray-500 text-sm">ID: {id}</p>
      <div className="flex justify-center items-center mt-3">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-lg ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
            ★
          </span>
        ))}
        <span className="ml-2 text-gray-600 font-medium">
          {rating.toFixed(1)}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full mt-4">
        <Button onClick={handleChatRequest} disabled={isLoading}>
          Chat With Me
        </Button>
        <Button
          variant="secondary"
          onClick={handleSessionRequest}
          disabled={isLoading}>
          Create Session
        </Button>
      </div>

      {/* Session Dialog */}
      <CreateSessionDialog
        isOpen={isSessionDialogOpen}
        onClose={() => setIsSessionDialogOpen(false)}
        mentorId={id}
        mentorName={name}
      />
    </div>
  )
}
