'use client'

import { LoadingIndicator } from 'stream-chat-react'

interface LoadingScreenProps {
  message?: string
}

const LoadingScreen = ({ message = 'Loading...' }: LoadingScreenProps) => {
  return (
    <main className="flex flex-col justify-center items-center w-full h-screen bg-gray-100">
      <LoadingIndicator />
      {message && <p className="mt-4 text-gray-600">{message}</p>}
    </main>
  )
}

export default LoadingScreen