import { getProfile } from '@/services/profile'
import { Tabs, TabsContent } from '@radix-ui/react-tabs'
import { Loader2 } from 'lucide-react'
import About from './about/page'
import SettingsAside from './components/aside'
import PersonalInfo from './personal-info/page'
import Social from './social/page'

export default async function Settings() {
  const profile = await getProfile()
  if (!profile)
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  return (
    <Tabs
      defaultValue="personal-info"
      className="flex pt-3 pb-6 gap-3 md:gap-6">
      <SettingsAside />
      <TabsContent value="personal-info" className="w-full">
        <PersonalInfo profile={profile} />
      </TabsContent>
      <TabsContent value="about" className="w-full">
        <About profile={profile} />
      </TabsContent>
      <TabsContent value="social" className="w-full">
        <Social profile={profile} />
      </TabsContent>
    </Tabs>
  )
}
