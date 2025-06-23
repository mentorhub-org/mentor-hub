'use client'

import { useState, useEffect } from 'react'
import type { Profile } from '@prisma/client'

type Filters = {
  name: string
  skills: string[]
  location: string
  availableForMentoring: boolean
  jobTitle: string
}

export function useUserSearch(filters: Filters) {
  const [users, setUsers] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch all profiles
        const response = await fetch('/api/profiles')
        
        if (!response.ok) {
          throw new Error('Failed to fetch profiles')
        }
        
        const allProfiles: Profile[] = await response.json()
        
        // Apply filters
        const filteredProfiles = allProfiles.filter(profile => {
          // Filter by name
          if (filters.name && !profile.name.toLowerCase().includes(filters.name.toLowerCase())) {
            return false
          }
          
          // Filter by job title
          if (filters.jobTitle && (!profile.jobTitle || !profile.jobTitle.toLowerCase().includes(filters.jobTitle.toLowerCase()))) {
            return false
          }
          
          // Filter by location
          if (filters.location && (!profile.location || !profile.location.toLowerCase().includes(filters.location.toLowerCase()))) {
            return false
          }
          
          // Filter by availability for mentoring
          if (filters.availableForMentoring && !profile.availableForMentoring) {
            return false
          }
          
          // Filter by skills
          if (filters.skills.length > 0) {
            // If skills filter is active but profile has no skills, exclude the profile
            if (!profile.skills) return false;
            
            const profileSkills = profile.skills.toLowerCase().split(',');
            const hasAllSkills = filters.skills.every(skill => 
              profileSkills.some(profileSkill => 
                profileSkill.trim().includes(skill.toLowerCase())
              )
            );
            if (!hasAllSkills) return false;
          }
          
          return true
        })
        
        setUsers(filteredProfiles)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
    
    fetchUsers()
  }, [filters])
  
  return { users, loading, error }
}