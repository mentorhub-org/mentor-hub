'use client'

import { Loader2 } from 'lucide-react'
import { useUserSearch } from '../hooks/useUserSearch'
import UserCard from './UserCard'

type UserGridProps = {
  filters: {
    name: string
    skills: string[]
    location: string
    availableForMentoring: boolean
    jobTitle: string
  }
}

export default function UserGrid({ filters }: UserGridProps) {
  const { users, loading, error } = useUserSearch(filters)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        <p>Error loading users: {error}</p>
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        <p>No users found matching your filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
