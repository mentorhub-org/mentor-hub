'use client'

import PickDate from '@/components/shared/pick-date'
import InputText from '@/components/shared/text-input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import Title from '@/components/ui/title'
import { updateProfile } from '@/services/profile'
import type { Profile } from '@prisma/client'
import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function PersonalInfo({ profile }: { profile: Profile }) {
  const { runAsync: update, loading: isSubmitting } = useRequest(
    updateProfile,
    { manual: true },
  )
  const [gender, setGender] = useState(profile.gender)
  const [dateOfBirth, setDateOfBirth] = useState(profile.dateOfBirth)
  const [availableForMentoring, setAvailableForMentoring] = useState(
    !!profile.availableForMentoring,
  )
  const [profileImage, setProfileImage] = useState<string | null>(
    profile.imgUrl,
  )
  const [isUploading, setIsUploading] = useState(false)

  const methods = useForm<Partial<Profile>>()

  const onChangeBirthDate = (date: Date) => {
    setDateOfBirth(date)
    methods.setValue('dateOfBirth', date)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsUploading(true)
      const reader = new FileReader()
      reader.onload = e => {
        setProfileImage(e.target?.result as string)
        setIsUploading(false)
        toast.success('Profile image updated successfully')
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: Partial<Profile>) => {
    const formData = {
      ...data,
      imgUrl: profileImage,
      availableForMentoring,
      gender,
    }
    try {
      await update(formData)
      toast.success('Your profile information has been updated successfully.')
    } catch (error) {
      toast.error('Something went wrong')
      return
    }
  }

  const handleDiscard = () => {
    methods.reset(profile)
    setGender(profile.gender)
    setDateOfBirth(profile.dateOfBirth)
    setAvailableForMentoring(!!profile.availableForMentoring)
    setProfileImage(profile.imgUrl)
    toast.info('Changes discarded')
  }

  useEffect(() => {
    methods.reset({
      ...profile,
    })
    setGender(profile.gender)
    setAvailableForMentoring(!!profile.availableForMentoring)
    setProfileImage(profile.imgUrl)
  }, [])

  if (!profile) return <div>profile Loading...</div>
  return (
    <Card className="w-full h-full shadow-none border-none flex flex-col">
      <CardHeader className="bg-slate-50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Title className="text-2xl font-bold">Personal Information</Title>
          <div className="flex items-center space-x-2">
            <Label htmlFor="mentoring-mode" className="text-sm font-medium">
              Available for Mentoring
            </Label>
            <Switch
              id="mentoring-mode"
              checked={availableForMentoring}
              onCheckedChange={setAvailableForMentoring}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {/* Profile Image Section */}
          <div className="flex flex-col items-center mb-8 mt-2">
            <div className="relative group">
              <Avatar className="h-32 w-32 border-2 border-darkblue">
                <AvatarImage src={profileImage || ''} alt="Profile" />
                <AvatarFallback className="text-2xl bg-primary/10 text-darkblue">
                  {profileImage ? 'U' : 'N'}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Label
                  htmlFor="profile-image"
                  className="text-white cursor-pointer text-xs font-medium">
                  {isUploading ? 'Uploading...' : 'Change Image'}
                </Label>
              </div>
              <input
                id="profile-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Click on the avatar to upload a new profile picture
            </p>
          </div>

          <Separator className="my-6 border-darkblue" />

          {/* Gender Selection */}
          <div className="mb-6">
            <Label className="text-base font-medium mb-2 block">Gender</Label>
            <RadioGroup
              value={gender}
              onValueChange={setGender}
              className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="male"
                  id="male"
                  className="border-darkblue text-darkblue"
                />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="female"
                  id="female"
                  className="border-darkblue text-darkblue"
                />
                <Label htmlFor="female">Female</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Form Fields */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* First Name */}
            <div className="space-y-2">
              <InputText
                label="Name"
                type="text"
                defaultValue="Nour"
                name={'name'}
                register={methods.register}
                classNames={{
                  label: 'text-base font-medium mb-1',
                  input:
                    'h-10 rounded-md border border-darkblue px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-darkblue focus-visible:ring-offset-2',
                }}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <InputText
                label="Email"
                type="email"
                placeholder="someone@example.com"
                name={'email'}
                register={methods.register}
                classNames={{
                  label: 'text-base font-medium mb-1',
                  input:
                    'h-10 rounded-md border border-darkblue px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-darkblue focus-visible:ring-offset-2',
                }}
                error={methods.formState.errors.email?.message as string}
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <InputText
                label="Phone"
                type="tel"
                defaultValue="+20 123 456 7890"
                name={'phone'}
                register={methods.register}
                classNames={{
                  label: 'text-base font-medium mb-1',
                  input:
                    'h-10 rounded-md border border-darkblue px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-darkblue focus-visible:ring-offset-2',
                }}
                error={methods.formState.errors.phone?.message as string}
              />
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <PickDate
                label="Date Of Birth"
                //@ts-expect-error - TODO: fix this
                value={dateOfBirth}
                onChangeDate={onChangeBirthDate}
                classNames={{
                  label: 'text-base font-medium mb-1',
                  input: 'border-darkblue focus-visible:ring-darkblue',
                }}
                error={methods.formState.errors.dateOfBirth?.message as string}
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <InputText
                label="Address"
                type="text"
                placeholder="Your full address"
                name={'location'}
                register={methods.register}
                classNames={{
                  label: 'text-base font-medium mb-1',
                  input:
                    'h-10 rounded-md border border-darkblue px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-darkblue focus-visible:ring-offset-2',
                }}
                error={methods.formState.errors.location?.message as string}
              />
            </div>
          </div>

          {/* Field of Mentoring */}
          <div className="mt-6 space-y-2">
            <InputText
              label="Field of Mentoring"
              type="text"
              placeholder="UI/UX Designer, Software Engineer, etc."
              name={'jobTitle'}
              register={methods.register}
              classNames={{
                label: 'text-base font-medium mb-1',
                input:
                  'h-10 rounded-md border border-darkblue px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-darkblue focus-visible:ring-offset-2',
              }}
              error={methods.formState.errors.jobTitle?.message as string}
            />
          </div>
        </form>
      </CardContent>

      <CardFooter className="w-full flex flex-1 items-end gap-4 p-6 bg-slate-50 ">
        <Button
          variant="secondary"
          onClick={handleDiscard}
          className="px-6 py-2 flex-1 border-darkblue hover:bg-blue-50 text-base">
          Discard Changes
        </Button>
        <Button
          onClick={methods.handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="px-6 py-2 text-base">
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardFooter>
    </Card>
  )
}
