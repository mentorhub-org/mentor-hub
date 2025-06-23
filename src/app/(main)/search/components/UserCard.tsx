'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import type { Profile } from '@prisma/client'
import { Briefcase, MapPin } from 'lucide-react'
import Link from 'next/link'

type UserCardProps = {
  user: Profile
}

export default function UserCard({ user }: UserCardProps) {
  // Extract first 3 skills to display
  const skills = user.skills ? user.skills.split(',').slice(0, 3) : []

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardContent className="p-6 flex-1">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.imgUrl || ''} alt={user.name} />
            <AvatarFallback>
              {user.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <h3 className="font-bold text-lg">{user.name}</h3>

            {user.jobTitle && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Briefcase className="mr-1 h-4 w-4" />
                <span>{user.jobTitle}</span>
              </div>
            )}

            {user.location && (
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-1 h-4 w-4" />
                <span>{user.location}</span>
              </div>
            )}
          </div>
        </div>

        {user.availableForMentoring && (
          <Badge className="mt-4 bg-green-100 text-green-800 hover:bg-green-200">
            Available for mentoring
          </Badge>
        )}

        {skills.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Skills</p>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <Badge key={skill} variant="secondary">
                  {skill.trim()}
                </Badge>
              ))}
              {user.skills && user.skills.split(',').length > 3 && (
                <Badge variant="outline">
                  +{user.skills.split(',').length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0 border-t flex justify-end">
        <Link href={`/profile/${user.userId}`} passHref>
          <Button>View Profile</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
