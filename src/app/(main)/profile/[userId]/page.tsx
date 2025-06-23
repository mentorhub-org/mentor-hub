import { getProfile } from '@/services/profile'
import AboutMe from './components/AboutMe'
import ProfileSidebar from './components/ProfileSidebar'
import Reviews from './components/Reviews'
import Skills from './components/Skills'

interface PageProps {
  params: { userId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Profile({ params }: PageProps) {
  const { userId } = await params
  const profile = await getProfile(userId)

  if (!profile) {
    return <div>Profile not found</div>
  }

  return (
    <main className="flex gap-1 bg-light">
      <ProfileSidebar profile={profile} />
      <div className="min-h-screen bg-white rounded-2xl m-3">
        <main className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* About Me Section */}
          <AboutMe bio={profile.about || ''} />

          {/* Skills Section */}
          <Skills skills={profile.skills?.split(',') || []} />

          {/* Reviews Section */}
          <Reviews profileId={profile.id} />
        </main>
      </div>
    </main>
  )
}
