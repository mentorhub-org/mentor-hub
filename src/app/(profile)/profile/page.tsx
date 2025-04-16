import { getProfile } from '@/services/profile'

export default async function Profile() {
  const profile = getProfile()
  console.log('profile', await profile)

  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome, {JSON.stringify(profile)}!</p>
    </div>
  )
}
