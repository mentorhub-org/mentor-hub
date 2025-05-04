import prisma from '@/db/prisma'
import { emailTemplates } from '@/email-temps'
import { sendEmail } from '@/lib/send-email'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { nextCookies } from 'better-auth/next-js'
import { admin, openAPI } from 'better-auth/plugins'

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are required')
}

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  throw new Error('GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET are required')
}

if (!process.env.LINKEDIN_CLIENT_ID || !process.env.LINKEDIN_CLIENT_SECRET) {
  throw new Error('LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET are required')
}

export const auth = betterAuth({
  user: {
    additionalFields: {
      dateOfBirth: {
        type: 'date',
        required: true,
      },
      phone: {
        type: 'string',
        required: true,
      },
      streamRegistered: {
        type: 'boolean',
        defaultValue: false,
        required: false,
      },
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail(
        emailTemplates.emailVerification({
          to: user.email,
          code: url,
        }),
      )
    },
    onEmailVerification: async user => {
      await prisma.profile.create({
        data: {
          userId: user.id,
          name: user.name || 'Unnamed User',
          email: user.email,
          // @ts-expect-error - dateOfBirth is not defined in user type
          phone: user.phone || '',
          // @ts-expect-error - dateOfBirth is not defined in user type
          dateOfBirth: user.dateOfBirth || new Date(),
          imgUrl: null,
          location: null,
          jobTitle: null,
          about: null,
          skills: null,
        },
      })
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
  },
  emailAndPassword: {
    enabled: true,
    disableSignUp: false,
    requireEmailVerification: true,
    async sendResetPassword({ user, url }) {
      await sendEmail(
        emailTemplates.forgetPassword({
          to: user.email,
          code: url,
        }),
      )
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    linkedin: {
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    },
  },
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  hooks: {
    // before: createAuthMiddleware(async ctx => {
    //   console.log(ctx.path, 'test')
    //   return true
    // }),
  },
  databaseHooks: {
    verification: {
      update: {
        after: async (verification, context) => {
          console.log('verification', verification)
          console.log('context', context)
        },
      },
    },
  },
  plugins: [openAPI(), admin(), nextCookies()],
  trustedOrigins: ['http://localhost:3000', 'http://localhost:*'],
})
