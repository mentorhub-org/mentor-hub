'use client'

import InputText from '@/components/shared/text-input'
import { Button } from '@/components/ui/button'
import Title from '@/components/ui/title'
import { updateProfile } from '@/services/profile'
import type { Profile } from '@prisma/client'
import { useRequest } from 'ahooks'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function About({ profile }: { profile: Profile }) {
  if (!profile) return <div>profile Loading...</div>
  const {
    runAsync,
    refresh,
    loading: updateLoading,
  } = useRequest(updateProfile, {
    manual: true,
  })

  const { register, getValues, setValue } = useForm<Partial<Profile>>()

  const handleAbout = () => {
    try {
      runAsync({ about: getValues('about') })
      toast.success('Your profile has been updated successfully')
      refresh()
    } catch (error) {
      toast.error('Failed to update profile. Please try again.')
    }
  }

  const handleSkills = () => {
    try {
      if (!getValues('skills')) return toast.error('Please enter a skill')
      if (!profile?.skills) return runAsync({ skills: getValues('skills') })
      runAsync({ skills: profile?.skills + ',' + getValues('skills') })
      toast.success('Your profile has been updated successfully')
      refresh()
      setValue('skills', '')
    } catch (error) {
      toast.error('Failed to update profile. Please try again.')
    }
  }

  const handleDeleteSkill = async (skill: string) => {
    try {
      if (!profile?.skills) return
      const newSkills = profile?.skills.split(',').filter(s => s !== skill)
      await runAsync({ skills: newSkills.join(',') })
      refresh()
      toast.success('Your profile has been updated successfully')
      refresh()
    } catch (error) {
      toast.error('Failed to update profile. Please try again.')
    }
  }

  useEffect(() => {
    if (profile) {
      setValue('about', profile?.about || '')
    }
  }, [profile])

  if (!profile) return <div>Profile not found</div>

  return (
    <main className="w-full mx-auto p-6 mb-3 mt-3 bg-white rounded-lg ">
      {/* About Me Section */}
      <Title>About & Skills</Title>

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">About Me</h3>
        <textarea
          className="w-full p-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Tell us about yourself..."
          rows={8}
          {...register('about')}
        />
        <div className="flex justify-end mt-2">
          <Button
            onClick={handleAbout}
            variant={'outline'}
            disabled={updateLoading}>
            {updateLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              'Save'
            )}
          </Button>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-3">
        <div className="mb-2">
          <InputText
            label="Skills"
            type="text"
            name={'skills'}
            register={register}
            classNames={{ label: 'text-xl font-bold mb-2' }}
          />
          <p className="text-gray-500 text-sm mt-1">
            Use commas to enter multiple skills at once.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {profile?.skills?.split(',').map(skill => (
            <div
              key={skill}
              className="pl-2 py-2 rounded-[12px] border border-darkblue flex items-center space-x-2 transition-colors bg-[#DDF3FF] text-darkblue">
              <span className="text-lg font-normal">{skill}</span>
              <Button
                onClick={() => handleDeleteSkill(skill)}
                className="bg-darkblue text-white hover:bg-lightblue w-6 h-6 flex justify-center items-center p-0 rounded-lg mr-[10px]">
                x
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSkills}
          variant={'outline'}
          disabled={updateLoading}>
          {updateLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Saving...
            </>
          ) : (
            'Save'
          )}
        </Button>
      </div>
    </main>
  )
}
