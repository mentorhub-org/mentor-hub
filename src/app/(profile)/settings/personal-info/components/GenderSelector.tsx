import { Label } from '@/components/ui/label'
import { UseFormRegister } from 'react-hook-form'
import { Profile } from '@prisma/client'

interface GenderSelectorProps {
  register: UseFormRegister<Partial<Profile>>
}

export default function GenderSelector({ register }: GenderSelectorProps) {
  return (
    <div className="col-span-2">
      <Label className="block text-sm font-medium mb-2">Gender</Label>
      <div className="flex space-x-6">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            value="male"
            {...register('gender')}
            className="form-radio h-5 w-5 text-darkblue"
          />
          <span className="text-gray-700">Male</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            value="female"
            {...register('gender')}
            className="form-radio h-5 w-5 text-darkblue"
          />
          <span className="text-gray-700">Female</span>
        </label>
      </div>
    </div>
  )
}