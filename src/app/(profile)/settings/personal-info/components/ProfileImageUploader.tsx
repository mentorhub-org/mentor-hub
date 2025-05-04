import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Camera } from 'lucide-react'
import { useRef } from 'react'

interface ProfileImageUploaderProps {
  profileImage: string | null
  data: any
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ProfileImageUploader({
  profileImage,
  data,
  handleImageChange,
}: ProfileImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex justify-center mb-8">
      <div className="relative group">
        <Avatar className="h-32 w-32 border-2 border-darkblue cursor-pointer">
          <AvatarImage
            src={profileImage || data?.imgUrl || ''}
            alt="Profile"
          />
          <AvatarFallback className="bg-gray-200 text-darkblue text-xl">
            {data?.name?.charAt(0) || 'U'}
          </AvatarFallback>
        </Avatar>
        <div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          onClick={triggerFileInput}>
          <Camera className="h-8 w-8 text-white" />
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
    </div>
  )
}