'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useGetProfile } from '@/hooks/useGetProfile'
import { useState } from 'react'

interface CreateSessionDialogProps {
  isOpen: boolean
  onClose: () => void
  mentorId: string
  mentorName: string
}

export default function CreateSessionDialog({
  isOpen,
  onClose,
  mentorId,
  mentorName,
}: CreateSessionDialogProps) {
  const { profile } = useGetProfile()

  const [sessionData, setSessionData] = useState({
    name: '',
    date: new Date(),
    duration: 60,
    price: '',
    description: '',
    notes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setThumbnailFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/mentoring-sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...sessionData,
          mentorId,
          menteeId: profile?.id,
          thumbnail: thumbnailPreview,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create session')
      }

      // Close the dialog and reset form
      onClose()
      setSessionData({
        name: '',
        date: new Date(),
        duration: 60,
        price: '',
        description: '',
        notes: '',
      })
      setThumbnailFile(null)
      setThumbnailPreview(null)
    } catch (error) {
      console.error('Error creating session:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-auto scrollbar-thin scrollbar-thumb-darkblue scrollbar-track-darkblue hover:scrollbar-thumb-darkblue">
        <DialogHeader>
          <DialogTitle>Create Session</DialogTitle>
          <DialogDescription>
            Fill in the details to schedule a mentoring session.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Session Thumbnail */}
          <div className="grid gap-2">
            <Label htmlFor="thumbnail">Session Thumbnail</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
              {thumbnailPreview ? (
                <div className="relative w-full h-32 mb-2">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ) : (
                <p className="text-sm text-gray-500 mb-2">
                  Upload Your Thumbnail
                </p>
              )}
              <Button
                type="button"
                variant="secondary"
                className="w-full"
                onClick={() => document.getElementById('thumbnail')?.click()}>
                Click To Select File
              </Button>
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleThumbnailChange}
              />
            </div>
          </div>

          {/* Session Name */}
          <div className="grid gap-2">
            <Label htmlFor="sessionName">Session Name</Label>
            <Input
              id="sessionName"
              value={sessionData.name}
              onChange={e =>
                setSessionData({ ...sessionData, name: e.target.value })
              }
              placeholder="UI/UX Basics"
            />
          </div>

          {/* Date */}
          <div className="grid gap-2">
            <Label htmlFor="date">Date & Time</Label>
            <input
              className="focus-visible:border-ring border-input border w-full p-2"
              type="datetime-local"
              onChange={e => {
                const newDate = new Date(e.target.value)
                setSessionData({ ...sessionData, date: newDate })
              }}
            />
          </div>

          {/* Duration */}
          <div className="grid gap-2">
            <Label htmlFor="duration">Duration</Label>
            <div className="flex items-center focus-visible:border-ring border-input border w-full pr-2">
              <input
                className="w-full p-2"
                type="number"
                min={1}
                placeholder="60"
                onChange={e => {
                  const minutes = parseInt(e.target.value) || 0
                  setSessionData({ ...sessionData, duration: minutes })
                }}
              />
              <span className="ml-2">minutes</span>
            </div>
          </div>

          {/* Price */}
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <div className="relative">
              <Input
                id="price"
                value={sessionData.price}
                onChange={e =>
                  setSessionData({ ...sessionData, price: e.target.value })
                }
                placeholder="00:00"
                className="pl-12"
              />
              <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none text-gray-500">
                EUR
              </div>
            </div>
          </div>

          {/* Session Description */}
          <div className="grid gap-2">
            <Label htmlFor="description">Session Description</Label>
            <Textarea
              id="description"
              value={sessionData.description}
              onChange={e =>
                setSessionData({ ...sessionData, description: e.target.value })
              }
              placeholder="Enter session description"
              className="min-h-[100px]"
            />
          </div>

          {/* Session Notes */}
          <div className="grid gap-2">
            <Label htmlFor="notes">Session Notes</Label>
            <Textarea
              id="notes"
              value={sessionData.notes}
              onChange={e =>
                setSessionData({ ...sessionData, notes: e.target.value })
              }
              placeholder="Enter session notes"
              className="min-h-[100px]"
            />
          </div>

          {/* Mentor and Learner Names */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="mentorName">Mentor Name</Label>
              <Input id="mentorName" value={mentorName} disabled />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="learnerName">Learner Name</Label>
              <Input id="learnerName" value={profile?.name} disabled />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
