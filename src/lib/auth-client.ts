import { createAuthClient } from 'better-auth/client'
import { adminClient, inferAdditionalFields } from 'better-auth/client/plugins'
import { auth } from './auth'

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  plugins: [inferAdditionalFields<typeof auth>(), adminClient()],
})
