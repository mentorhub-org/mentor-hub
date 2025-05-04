'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRequest } from 'ahooks'
import { toast } from 'sonner'
import type { Profile } from '@prisma/client'

import { getProfile, updateProfile } from '@/services/profile'
import {
  ProfileHeader,
  ProfileImageUploader,
  PersonalInfoForm,
  LoadingSpinner
} from './components'

export default function PersonalInfo() {
  const { data, loading, refresh } = useRequest(getProfile)
  const { runAsync, loading: isSubmitting } = useRequest(updateProfile, {
    manual: true,
  })
  const [availableForMentoring, setAvailableForMentoring] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const {
    register,
    setValue,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm<Partial<Profile>>({
    defaultValues: {
      ...data,
    },
  })

  const onChangeBirthDate = (date: Date | undefined) => {
    setValue('dateOfBirth', date || new Date(), { shouldDirty: true })
  }

  const onSubmit = async (formData: Partial<Profile>) => {
    try {
      const updatedData = {
        ...formData,
        availableForMentoring,
        imgUrl: profileImage || data?.imgUrl,
      }
      await runAsync(updatedData)
      toast.success('Your profile has been updated successfully')
      refresh()
      reset(updatedData)
    } catch (error) {
      toast.error('Failed to update profile. Please try again.')
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = event => {
        setProfileImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDiscard = () => {
    //@ts-expect-error - TS doesn't know about the reset method
    reset(data)
    setProfileImage(data?.imgUrl || null)
    setAvailableForMentoring(data?.availableForMentoring || false)
  }

  useEffect(() => {
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        setValue(key as keyof Profile, value)
      })
      setAvailableForMentoring(data.availableForMentoring || false)
      setProfileImage(data.imgUrl || null)
    }
  }, [data, setValue])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <main className="w-full bg-white rounded-lg shadow-lg p-6 mt-3 mb-3">
      <ProfileHeader 
        availableForMentoring={availableForMentoring}
        setAvailableForMentoring={setAvailableForMentoring}
      />
      
      <ProfileImageUploader 
        profileImage={profileImage}
        data={data}
        handleImageChange={handleImageChange}
      />
      
      <PersonalInfoForm
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
        onChangeBirthDate={onChangeBirthDate}
        handleDiscard={handleDiscard}
        isSubmitting={isSubmitting}
        isDirty={isDirty}
        profileImage={profileImage}
        data={data}
      />
    </main>
  )
}
