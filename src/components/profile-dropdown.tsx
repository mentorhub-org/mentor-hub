'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FACE } from '@/constants/icons'
import { useGetProfile } from '@/hooks/useGetProfile'
import { authClient } from '@/lib/auth-client'
import {
  Airplay,
  AlertTriangleIcon,
  GraduationCap,
  LogOutIcon,
  Settings,
  User,
} from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { toast } from 'sonner'

export default function ProfileDropdown() {
  const { profile, profileError, profileLoading } = useGetProfile()

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success('Logged out successfully')
          redirect('/auth/login')
        },
        onError: error => {
          toast.error('Failed to logout')
          console.log(error)
        },
      },
    })
  }

  const handleNavigate = (path: string) => {
    redirect(path)
  }

  if (profileLoading || !profile) {
    return (
      <div className="flex items-center justify-center p-2 space-x-2 animate-pulse">
        <div className="w-6 h-6 bg-muted rounded-full" />
        <div className="h-4 bg-muted rounded w-16" />
      </div>
    )
  }

  if (profileError) {
    return (
      <div className="flex items-center gap-2 p-2 text-sm text-destructive bg-destructive/10 rounded-md">
        <AlertTriangleIcon size={16} className="animate-bounce" />
        <span>Failed to load profile</span>
      </div>
    )
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Image src={FACE} alt="Face" className="w-6 h-6 cursor-pointer" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {profile.name}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {profile.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            role="link"
            onClick={() => handleNavigate('/profile/me')}>
            <User size={16} className="opacity-60" aria-hidden="true" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            role="link"
            onClick={() => handleNavigate('/profile/settings')}>
            <Settings size={16} className="opacity-60" aria-hidden="true" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            role="link"
            onClick={() => handleNavigate('/profile/my-mentorships')}>
            <Airplay size={16} className="opacity-60" aria-hidden="true" />
            <span>My Mentorships</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            role="link"
            onClick={() => handleNavigate('/profile/my-learnings')}
            className="cursor-pointer">
            <GraduationCap
              size={16}
              className="opacity-60"
              aria-hidden="true"
            />
            <span>My Learning Courses</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer"
          variant="destructive"
          role="button"
          onClick={handleLogout}>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
