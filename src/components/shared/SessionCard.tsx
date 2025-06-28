'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SessionStatus, type MentoringSession } from '@prisma/client'
import { format } from 'date-fns'
import { CalendarIcon, ClockIcon, EuroIcon } from 'lucide-react'

interface SessionCardProps {
  session: MentoringSession & {
    mentor?: {
      name: string
      id: string
      email: string
      imgUrl: string | null
    }
    mentee?: {
      name: string
      id: string
      email: string
      imgUrl: string | null
    }
  }
  type: 'learning' | 'mentorship'
  onStatusUpdate?: (sessionId: string, status: SessionStatus) => void
}

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  REJECTED: 'bg-red-100 text-red-800',
  COMPLETED: 'bg-blue-100 text-blue-800',
  CANCELLED: 'bg-gray-100 text-gray-800',
  UPCOMING: 'bg-purple-100 text-purple-800',
}

export default function SessionCard({
  session,
  type,
  onStatusUpdate,
}: SessionCardProps) {
  const otherUser = type === 'learning' ? session.mentor : session.mentee
  const canApprove = type === 'mentorship' && session.status === 'PENDING'

  const canJoin =
    session.status === 'UPCOMING' &&
    isMeetingOngoing(new Date(session.date), session.duration)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={otherUser?.imgUrl || ''} />
              <AvatarFallback>
                {otherUser?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{session.name}</CardTitle>
              <p className="text-sm text-gray-600">
                {type === 'learning' ? 'Mentor: ' : 'Mentee: '}
                {otherUser?.name}
              </p>
            </div>
          </div>
          <Badge className={statusColors[session.status]}>
            {session.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        {session.thumbnail && (
          <img
            src={session.thumbnail}
            alt={session.name}
            className="w-full h-32 object-cover rounded-md mb-4"
          />
        )}

        {session.description && (
          <p className="text-gray-700 mb-4">{session.description}</p>
        )}

        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <CalendarIcon className="w-4 h-4" />
            <span>{format(new Date(session.date), 'MMM dd, yyyy')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <ClockIcon className="w-4 h-4" />
            <span>{showDuration(session.duration)}</span>
          </div>
          {session.price && (
            <div className="flex items-center space-x-1">
              <EuroIcon className="w-4 h-4" />
              <span>{session.price}</span>
            </div>
          )}
        </div>

        {session.notes && (
          <div className="mt-4">
            <h4 className="font-medium text-gray-900 mb-2">Notes:</h4>
            <p className="text-gray-700 text-sm">{session.notes}</p>
          </div>
        )}
      </CardContent>

      {canApprove && onStatusUpdate && (
        <CardFooter className="flex space-x-2">
          <Button
            onClick={() => onStatusUpdate(session.id, SessionStatus.UPCOMING)}
            className="flex-1">
            Approve
          </Button>
          <Button
            variant="destructive"
            onClick={() => onStatusUpdate(session.id, SessionStatus.REJECTED)}
            className="flex-1">
            Reject
          </Button>
        </CardFooter>
      )}
      {canJoin && (
        <CardFooter>
          <Button
            onClick={() => (window.location.href = `/session/${session.id}`)}
            className="flex-1">
            Join Call
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

function isMeetingOngoing(startDate: Date, durationMinutes: number): boolean {
  const now = new Date()
  const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000)
  return now >= startDate && now <= endDate
}

function showDuration(duration: number): string {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`
}
