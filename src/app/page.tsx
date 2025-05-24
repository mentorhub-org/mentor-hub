import { getAllProfiles } from '@/services/profile'

export default async function Home() {
  const profiles = await getAllProfiles()
  console.log(profiles)
  return <div>Home</div>
}
