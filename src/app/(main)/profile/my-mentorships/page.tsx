'use client'

import SessionCard from '@/components/shared/SessionCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Title from '@/components/ui/title'
import { getMyMentorships } from '@/services/mentoring-session'
import { SessionStatus } from '@prisma/client'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type MentoringSession = Awaited<ReturnType<typeof getMyMentorships>>[0]

export default function MyMentorships() {
  const [sessions, setSessions] = useState<MentoringSession[]>([])
  const [loading, setLoading] = useState(true)

  const loadSessions = async () => {
    try {
      setLoading(true)
      const data = await fetch('/api/mentoring-sessions?userType=mentor').then(
        res => res.json(),
      )
      setSessions(data)
      setLoading(false)
    } catch (error) {
      console.error('Error loading sessions:', error)
      toast.error('Failed to load sessions')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSessions()
  }, [])

  const handleStatusUpdate = async (
    sessionId: string,
    status: SessionStatus,
  ) => {
    try {
      const response = await fetch(`/api/mentoring-sessions/${sessionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error('Failed to update session')
      }

      // Reload sessions
      await loadSessions()
      toast.success(`Session ${status.toLowerCase()} successfully`)
    } catch (error) {
      console.error('Error updating session:', error)
      toast.error('Failed to update session')
    }
  }

  if (loading) {
    return <div className="container mx-auto p-6">Loading...</div>
  }

  if (!sessions) {
    return (
      <div className="container mx-auto p-6">
        There is an Error getting Sessions
      </div>
    )
  }

  if (sessions.length === 0) {
    return <div className="container mx-auto p-6">No sessions yet</div>
  }

  const pendingSessions = sessions.filter(
    s => s.status === SessionStatus.PENDING,
  )
  const upcomingSessions = sessions.filter(
    s => s.status === SessionStatus.UPCOMING,
  )
  const historySessions = sessions.filter(
    s =>
      s.status === SessionStatus.COMPLETED ||
      s.status === SessionStatus.REJECTED ||
      s.status === SessionStatus.CANCELLED,
  )

  return (
    <div className="container mx-auto p-6">
      <Title>My Mentorship Sessions</Title>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">
            Pending ({pendingSessions.length})
          </TabsTrigger>
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingSessions.length})
          </TabsTrigger>
          <TabsTrigger value="history">
            History ({historySessions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="flex gap-4">
          {pendingSessions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No pending sessions
            </p>
          ) : (
            pendingSessions.map(session => (
              <SessionCard
                key={session.id}
                session={session}
                type="mentorship"
                onStatusUpdate={handleStatusUpdate}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="flex gap-4">
          {upcomingSessions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No upcoming sessions
            </p>
          ) : (
            upcomingSessions.map(session => (
              <SessionCard
                key={session.id}
                session={session}
                type="mentorship"
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="history" className="flex gap-4">
          {historySessions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No session history</p>
          ) : (
            historySessions.map(session => (
              <SessionCard
                key={session.id}
                session={session}
                type="mentorship"
              />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
