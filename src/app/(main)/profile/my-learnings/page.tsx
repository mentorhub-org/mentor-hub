'use client'

import SessionCard from '@/components/shared/SessionCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Title from '@/components/ui/title'
import { SessionStatus, type MentoringSession } from '@prisma/client'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function MyLearnings() {
  const [sessions, setSessions] = useState<MentoringSession[]>([])
  const [loading, setLoading] = useState(true)

  const loadSessions = async () => {
    try {
      setLoading(true)
      const data = await fetch('/api/mentoring-sessions?userType=mentee').then(
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
      <Title>My Learning Sessions</Title>

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

        <TabsContent
          value="pending"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pendingSessions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No pending sessions
            </p>
          ) : (
            pendingSessions.map(session => (
              <SessionCard key={session.id} session={session} type="learning" />
            ))
          )}
        </TabsContent>

        <TabsContent
          value="upcoming"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {upcomingSessions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No upcoming sessions
            </p>
          ) : (
            upcomingSessions.map(session => (
              <SessionCard key={session.id} session={session} type="learning" />
            ))
          )}
        </TabsContent>

        <TabsContent
          value="history"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {historySessions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No session history</p>
          ) : (
            historySessions.map(session => (
              <SessionCard key={session.id} session={session} type="learning" />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
