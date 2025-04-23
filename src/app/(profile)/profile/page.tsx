import { getProfile } from '@/services/profile'

export default async function Profile() {
  const { session, profile } = await getProfile()

  if (!session) {
    return <div>Not authenticated</div>
  }

  if (!session.user.emailVerified) {
    return <div>Please verify your email</div>
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome, {profile?.name}!</p>
    </div>
  )
}
