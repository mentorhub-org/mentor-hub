'use client'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { useEffect, useState } from 'react'

type Filters = {
  name: string
  skills: string[]
  location: string
  availableForMentoring: boolean
  jobTitle: string
}

type SearchSidebarProps = {
  filters: Filters
  onFilterChange: (filters: Filters) => void
  isOpen: boolean
  onClose: () => void
}

// Sample data for dropdowns
const locations = [
  { label: 'New York', value: 'New York' },
  { label: 'San Francisco', value: 'San Francisco' },
  { label: 'London', value: 'London' },
  { label: 'Tokyo', value: 'Tokyo' },
  { label: 'Berlin', value: 'Berlin' },
  { label: 'Singapore', value: 'Singapore' },
]

const jobTitles = [
  { label: 'Software Engineer', value: 'Software Engineer' },
  { label: 'Product Manager', value: 'Product Manager' },
  { label: 'UX Designer', value: 'UX Designer' },
  { label: 'Data Scientist', value: 'Data Scientist' },
  { label: 'DevOps Engineer', value: 'DevOps Engineer' },
  { label: 'Marketing Specialist', value: 'Marketing Specialist' },
]

const commonSkills = [
  { label: 'JavaScript', value: 'JavaScript' },
  { label: 'React', value: 'React' },
  { label: 'Python', value: 'Python' },
  { label: 'Node.js', value: 'Node.js' },
  { label: 'TypeScript', value: 'TypeScript' },
  { label: 'UI/UX Design', value: 'UI/UX Design' },
  { label: 'SQL', value: 'SQL' },
  { label: 'AWS', value: 'AWS' },
  { label: 'Docker', value: 'Docker' },
]

export default function SearchSidebar({
  filters,
  onFilterChange,
  isOpen,
  onClose,
}: SearchSidebarProps) {
  const [localFilters, setLocalFilters] = useState<Filters>(filters)
  const [skillInput, setSkillInput] = useState('')
  const [openLocation, setOpenLocation] = useState(false)
  const [openJobTitle, setOpenJobTitle] = useState(false)
  const [openSkill, setOpenSkill] = useState(false)

  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLocalFilters(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setLocalFilters(prev => ({
      ...prev,
      availableForMentoring: checked,
    }))
  }

  const handleAddSkill = () => {
    if (skillInput.trim() && !localFilters.skills.includes(skillInput.trim())) {
      setLocalFilters(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }))
      setSkillInput('')
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setLocalFilters(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill),
    }))
  }

  const handleApplyFilters = () => {
    onFilterChange(localFilters)
    if (window.innerWidth < 768) {
      onClose()
    }
  }

  const handleResetFilters = () => {
    const resetFilters = {
      name: '',
      skills: [],
      location: '',
      availableForMentoring: false,
      jobTitle: '',
    }
    setLocalFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  return (
    <aside
      className={`
      fixed md:relative z-40 
      w-[280px] md:w-[260px] lg:w-[280px] 
      bg-white rounded-2xl m-3
      transition-all duration-300 ease-in-out 
      ${isOpen ? 'left-0' : '-left-[290px] md:left-0'} 
      h-[calc(100vh-2rem)] md:h-auto 
      overflow-y-auto
    `}>
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Filters</h2>
          <button
            onClick={onClose}
            className="md:hidden p-1 rounded-full hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Search by name"
              value={localFilters.name}
              onChange={handleInputChange}
              className="h-8"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="jobTitle" className="text-sm">
              Job Title
            </Label>
            <Popover open={openJobTitle} onOpenChange={setOpenJobTitle}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openJobTitle}
                  className="w-full justify-between h-8 font-normal text-sm">
                  {localFilters.jobTitle
                    ? jobTitles.find(job => job.value === localFilters.jobTitle)
                        ?.label || localFilters.jobTitle
                    : 'Select job title...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput
                    placeholder="Search job title..."
                    className="h-9"
                  />
                  <CommandEmpty>
                    No job title found. Type to create.
                  </CommandEmpty>
                  <CommandGroup>
                    {jobTitles.map(job => (
                      <CommandItem
                        key={job.value}
                        value={job.value}
                        onSelect={currentValue => {
                          setLocalFilters(prev => ({
                            ...prev,
                            jobTitle: currentValue,
                          }))
                          setOpenJobTitle(false)
                        }}>
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            localFilters.jobTitle === job.value
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                        {job.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="location" className="text-sm">
              Location
            </Label>
            <Popover open={openLocation} onOpenChange={setOpenLocation}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openLocation}
                  className="w-full justify-between h-8 font-normal text-sm">
                  {localFilters.location
                    ? locations.find(loc => loc.value === localFilters.location)
                        ?.label || localFilters.location
                    : 'Select location...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput
                    placeholder="Search location..."
                    className="h-9"
                  />
                  <CommandEmpty>
                    No location found. Type to create.
                  </CommandEmpty>
                  <CommandGroup>
                    {locations.map(loc => (
                      <CommandItem
                        key={loc.value}
                        value={loc.value}
                        onSelect={currentValue => {
                          setLocalFilters(prev => ({
                            ...prev,
                            location: currentValue,
                          }))
                          setOpenLocation(false)
                        }}>
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            localFilters.location === loc.value
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                        {loc.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="skills" className="text-sm">
              Skills
            </Label>
            <div className="flex gap-1">
              <div className="w-full">
                <Popover open={openSkill} onOpenChange={setOpenSkill}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openSkill}
                      className="w-full justify-between h-8 font-normal text-sm">
                      {skillInput || 'Select skill...'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search skill..."
                        className="h-9"
                        value={skillInput}
                        onValueChange={setSkillInput}
                      />
                      <CommandEmpty>
                        No skill found. Type to create.
                      </CommandEmpty>
                      <CommandGroup>
                        {commonSkills.map(skill => (
                          <CommandItem
                            key={skill.value}
                            value={skill.value}
                            onSelect={currentValue => {
                              setSkillInput(currentValue)
                              setOpenSkill(false)
                            }}>
                            {skill.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <Button
                type="button"
                onClick={handleAddSkill}
                size="sm"
                className="h-8 px-2">
                Add
              </Button>
            </div>

            {localFilters.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {localFilters.skills.map(skill => (
                  <div
                    key={skill}
                    className="bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1 text-xs">
                    <span>{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-slate-500 hover:text-slate-700">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator className="my-2" />

          <div className="flex items-center justify-between">
            <Label
              htmlFor="availableForMentoring"
              className="cursor-pointer text-sm">
              Available for mentoring
            </Label>
            <Switch
              id="availableForMentoring"
              checked={localFilters.availableForMentoring}
              onCheckedChange={handleSwitchChange}
            />
          </div>

          <div className="flex gap-2 pt-3">
            <Button onClick={handleApplyFilters} className="flex-1 h-9">
              Apply
            </Button>
            <Button
              onClick={handleResetFilters}
              variant="outline"
              className="flex-1 h-9">
              Reset
            </Button>
          </div>
        </div>
      </div>
    </aside>
  )
}
