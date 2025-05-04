import Title from '@/components/ui/title'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

interface ProfileHeaderProps {
  availableForMentoring: boolean
  setAvailableForMentoring: (value: boolean) => void
}

export default function ProfileHeader({
  availableForMentoring,
  setAvailableForMentoring,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <Title>Personal Information</Title>
      <div className="flex items-center space-x-3">
        <Label htmlFor="available-toggle" className="text-sm font-medium">
          Available for Mentoring
        </Label>
        <Switch
          id="available-toggle"
          checked={availableForMentoring}
          onCheckedChange={setAvailableForMentoring}
        />
      </div>
    </div>
  )
}