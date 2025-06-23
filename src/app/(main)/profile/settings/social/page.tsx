'use client'

import { Button } from '@/components/ui/button'
import Title from '@/components/ui/title'
import {
  getProfileSocialLinks,
  updateProfileSocialLinks,
} from '@/services/profile'
import type { Profile, SocialLinks } from '@prisma/client'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import PortfolioSocialLinks from './components/PortfolioSocialLinks'
import { sociallinksImages, worklinksImages } from './data'

export default function Social({ profile }: { profile: Profile }) {
  if (!profile) return <div>profile Loading...</div>
  const { runAsync: updateProfileAsync, loading: isSubmitting } = useRequest(
    updateProfileSocialLinks,
    {
      manual: true,
    },
  )

  const {
    data: socialLinks,
    refresh,
    loading: socialLinksLoading,
  } = useRequest(getProfileSocialLinks, {
    ready: !!profile?.id,
    defaultParams: [profile?.id || ''],
  })

  const methods = useForm<Partial<SocialLinks>>()

  const isLoading = socialLinksLoading

  const updateProfileData = async (data: Partial<SocialLinks>) => {
    try {
      await updateProfileAsync(data, profile?.id)
      toast.success('Profile updated successfully')
      refresh()
    } catch (err) {
      toast.error('Failed to update profile')
      throw err
    }
  }

  const onSubmit = (data: Partial<SocialLinks>) => {
    updateProfileData(data)
  }

  const handleDiscard = () => {
    methods.reset({ ...socialLinks })
    toast.info('Changes discarded')
  }

  useEffect(() => {
    if (socialLinks) {
      methods.reset({ ...socialLinks })
    }
  }, [socialLinks, methods.reset])

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg flex flex-col justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500">Loading social links...</p>
        </div>
      </div>
    )
  }
  return (
    <FormProvider {...methods}>
      <form
        className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg flex flex-col justify-between"
        onSubmit={methods.handleSubmit(onSubmit)}>
        <div>
          <Title>Social Links</Title>

          {/*Links */}
          <PortfolioSocialLinks links={worklinksImages} />

          {/* Contact Me section */}
          <PortfolioSocialLinks links={sociallinksImages} />
        </div>
        <div className="flex gap-5 mt-6">
          <Button
            className="text-xl py-5"
            variant="secondary"
            type="button"
            onClick={handleDiscard}
            disabled={isSubmitting}>
            Discard Changes
          </Button>
          <Button
            className="text-xl py-5"
            type="submit"
            disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
