import { REFRESH, TICK, TICKA, TIMER } from '@/constants/icons'
import Image from 'next/image'

type MentorshipStatsProps = {
  ongoing: number
  completed: number
  unfinished: number
  postponed: number
}

export default function MentorshipStats({ 
  ongoing, 
  completed, 
  unfinished, 
  postponed 
}: MentorshipStatsProps) {
  return (
    <div className="w-full">
      <h3 className="text-darkblue font-bold text-lg">Mentorship Sessions</h3>
      <div className="mt-4 space-y-3">
        <p className="flex items-center space-x-2 text-gray-600">
          <Image src={REFRESH} alt="Ongoing Sessions" className="w-5 h-5" />
          <span className="text-gray-400 text-sm">Ongoing Sessions:</span>
          <span className="text-sm">{ongoing}</span>
        </p>
        <p className="flex items-center space-x-2 text-gray-600">
          <Image src={TICKA} alt="Completed Sessions" className="w-5 h-5" />
          <span className="text-gray-400 text-sm">Completed Sessions:</span>
          <span className="text-sm">{completed}</span>
        </p>
        <p className="flex items-center space-x-2 text-gray-600">
          <Image src={TICK} alt="Unfinished Sessions" className="w-5 h-5" />
          <span className="text-gray-400 text-sm">Unfinished Sessions:</span>
          <span className="text-sm">{unfinished}</span>
        </p>
        <p className="flex items-center space-x-2 text-gray-600">
          <Image src={TIMER} alt="Postponed Sessions" className="w-5 h-5" />
          <span className="text-gray-400 text-sm">Postponed Sessions:</span>
          <span className="text-sm">{postponed}</span>
        </p>
      </div>
    </div>
  )
}