'use client'

import { Button } from '@/components/ui/button'
import type { MentoringSession } from '@prisma/client'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function ReviewForm({ session }: { session: MentoringSession }) {
  const [reviewText, setReviewText] = useState('')
  const [rating, setRating] = useState(5)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!reviewText.trim()) {
      toast.error('Please write a review before submitting')
      return
    }

    try {
      async function rateSession() {
        setIsSubmitting(true)
        const sessionRate = {
          rating,
          description: reviewText,
          sessionId: session.id,
          mentorId: session.mentorId,
          menteeId: session.menteeId,
        }

        const response = await fetch('/api/review', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sessionRate),
        })
        if (!response.ok) {
          throw new Error('Failed to rate session')
        }
        toast.success('Review submitted successfully')
        redirect('/')
      }
      rateSession()
    } catch (error) {
      toast.error('Failed to submit review. Please try again.')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white p-6 flex flex-col gap-4">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
        Give Us Your Review
      </h3>

      <div className="flex items-center mb-2">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="text-3xl focus:outline-none">
            <span
              className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}>
              ★
            </span>
          </button>
        ))}
      </div>

      <textarea
        className="w-full h-24 p-3 bg-gray-100 rounded-lg outline-none text-gray-600 text-sm sm:text-base resize-none focus:ring-2 focus:ring-blue-300"
        placeholder="Write your review here..."
        value={reviewText}
        onChange={e => setReviewText(e.target.value)}
      />

      <Button
        onClick={handleSubmit}
        disabled={isSubmitting || !reviewText.trim()}>
        {isSubmitting ? 'Submitting...' : 'Post Review'}
      </Button>
    </div>
  )
}
