'use client'

import Title from '@/components/ui/title'
import { FilterIcon } from 'lucide-react'
import { useState } from 'react'
import SearchSidebar from './components/SearchSidebar'
import UserGrid from './components/UserGrid'

export default function SearchPage() {
  const [filters, setFilters] = useState({
    name: '',
    skills: [] as string[],
    location: '',
    availableForMentoring: false,
    jobTitle: '',
  })

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
  }

  return (
    <main className="flex h-[calc(100vh-95px)] bg-light relative">
      <button
        className="md:hidden fixed bottom-6 right-6 z-50 bg-primary text-white p-3 rounded-full shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}>
        <FilterIcon className="h-6 w-6" />
      </button>

      <SearchSidebar
        filters={filters}
        onFilterChange={handleFilterChange}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 p-6 bg-white rounded-2xl m-3 ml-0 overflow-auto">
        <Title>Find Mentors</Title>
        <UserGrid filters={filters} />
      </div>
    </main>
  )
}
