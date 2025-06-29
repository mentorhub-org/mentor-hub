'use client'

import type { MentoringSession } from '@prisma/client'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

const CheckoutSuccess = () => {
  const searchParams = useSearchParams()
  const sessionData = Object.fromEntries(
    searchParams.entries(),
  ) as unknown as MentoringSession

  try {
    const createSession = async () => {
      const response = await fetch('/api/mentoring-sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error('Failed to create session')
      }
      toast.success('Session created successfully')
    }
    createSession()
  } catch (error) {
    toast.error('Something went wrong, please try again')
  }

  return (
    <div className="mx-auto mt-32 w-fit bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <div className="mb-8">
          <CheckCircle className="mx-auto text-6xl text-green-500" />
        </div>
        <h1 className="mb-4 font-bold text-3xl text-gray-900">
          Order created successfully
        </h1>
        <p className="mb-8 text-gray-600">
          Your order has been created successfully. Check you Learnings page
        </p>
        <div className="space-y-4">
          <Link
            href="/profile/my-learnings"
            className="block w-full rounded-md bg-green-500 px-4 py-3 text-white transition-colors hover:bg-green-600">
            View Learnings
          </Link>
          <Link
            href="/"
            className="block w-full rounded-md bg-gray-100 px-4 py-3 text-gray-700 transition-colors hover:bg-gray-200">
            Open Profile
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSuccess
