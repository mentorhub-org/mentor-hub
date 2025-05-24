import { Button } from '@/components/ui/button'
import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import Title from '@/components/ui/title'
import { BOOKBLACK, LINKBLUE, LOGIN, PRO, VECTOR } from '@/constants/icons'
import { PROFILE } from '@/constants/images'
import * as authHandler from '@/lib/auth-handler'
import { getProfile } from '@/services/profile'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'

export default async function SettingsAside() {
  const profile = await getProfile()
  if (!profile)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-darkblue" />
      </div>
    )

  return (
    <aside className="bg-white rounded-lg w-full py-6 px-3 flex flex-col min-h-screen md:h-auto md:max-w-xs md:w-1/4  md:py-8 md:px-4 lg:py-10 lg:px-5">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <Image
            src={profile?.imgUrl || PROFILE}
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full object-cover aspect-square"
            unoptimized={profile?.imgUrl?.startsWith('data:image')} // Disable optimization for base64 images
          />
          <span className="absolute bottom-0 right-0 w-8 h-8 bg-da rounded-full flex items-center justify-center text-white text-xs">
            <Image src={VECTOR} alt="" />
          </span>
        </div>
        <Title className="mt-4 font-semibold text-center">
          {profile?.name || 'John Doe'}
        </Title>
        <p className="text-sm text-dark">{profile?.jobTitle || 'Job Title'}</p>
      </div>

      {/* Navigation NavLinks */}
      <TabsList className="gap-4 flex flex-col flex-1 bg-transparent justify-start">
        <TabsTrigger
          value="personal-info"
          className="flex items-center text-gray-600 hover:text-darkblue transition-colors data-[state=active]:bg-light data-[state=active]:text-darkblue px-4 py-2 rounded-lg max-h-12 flex-1">
          <Image src={PRO} className="m-1" alt="" />
          Personal Information
        </TabsTrigger>

        <TabsTrigger
          value="about"
          className="flex items-center text-gray-600 hover:text-darkblue transition-colors data-[state=active]:bg-light data-[state=active]:text-darkblue px-4 py-2 rounded-lg max-h-12 flex-1">
          <Image src={BOOKBLACK} className="m-1" alt="" />
          About & Skills
        </TabsTrigger>

        <TabsTrigger
          value="social"
          className="flex items-center text-gray-600 hover:text-darkblue transition-colors data-[state=active]:bg-light data-[state=active]:text-darkblue px-4 py-2 rounded-lg max-h-12 flex-1">
          <Image src={LINKBLUE} className="m-1" alt="" />
          Social Links
        </TabsTrigger>
      </TabsList>

      {/* Logout Button */}
      <div>
        <Button onClick={authHandler.signOut}>
          <Image src={LOGIN} className="m-1" alt="" />
          Log Out
        </Button>
      </div>
    </aside>
  )
}
