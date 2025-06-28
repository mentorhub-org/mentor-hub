import { REFRESH, TICK, TICKA, TIMER } from '@/constants/icons'
import prisma from '@/db/prisma'
import Image from 'next/image'

type MentorshipStatsProps = {
  profileId: string
}

export enum SessionStatus {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  UPCOMING = 'UPCOMING',
}

export default async function MentorshipStats({
  profileId,
}: MentorshipStatsProps) {
  const sessions = await prisma.mentoringSession.findMany({
    where: {
      mentorId: profileId,
    },
  })

  const pending = sessions.filter(
    session => session.status === SessionStatus.PENDING,
  ).length

  const rejected = sessions.filter(
    session => session.status === SessionStatus.REJECTED,
  ).length

  const completed = sessions.filter(
    session => session.status === SessionStatus.COMPLETED,
  ).length

  const cancelled = sessions.filter(
    session => session.status === SessionStatus.CANCELLED,
  ).length

  const upcoming = sessions.filter(
    session => session.status === SessionStatus.UPCOMING,
  ).length
  return (
    <div className="w-full">
      <h3 className="text-darkblue font-bold text-lg">Mentorship Sessions</h3>
      <div className="mt-4 space-y-3">
        <p className="flex items-center space-x-2 text-gray-600">
          <Image src={TIMER} alt="Ongoing Sessions" className="w-5 h-5" />
          <span className="text-gray-400 text-sm">Pending Sessions:</span>
          <span className="text-sm">{pending}</span>
        </p>
        <p className="flex items-center space-x-2 text-gray-600">
          <Image src={TICKA} alt="Completed Sessions" className="w-5 h-5" />
          <span className="text-gray-400 text-sm">Completed Sessions:</span>
          <span className="text-sm">{completed}</span>
        </p>
        <p className="flex items-center space-x-2 text-gray-600">
          <Image src={TICK} alt="Unfinished Sessions" className="w-5 h-5" />
          <span className="text-gray-400 text-sm">Rejected Sessions:</span>
          <span className="text-sm">{rejected}</span>
        </p>
        <p className="flex items-center space-x-2 text-gray-600">
          <Image src={REFRESH} alt="Postponed Sessions" className="w-5 h-5" />
          <span className="text-gray-400 text-sm">Upcoming Sessions:</span>
          <span className="text-sm">{upcoming}</span>
        </p>
      </div>
    </div>
  )
}
