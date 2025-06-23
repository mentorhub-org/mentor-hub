import { PrismaClient } from '@prisma/client'
import { hashPassword } from 'better-auth/crypto'
import {
  accounts,
  mentoringSessions,
  profiles,
  socialLinks,
  users,
} from './fakeData'

const prisma = new PrismaClient()

async function main() {
  try {
    // Step 1: Insert users
    for (const user of users) {
      await prisma.user.create({
        data: user,
      })
    }
    console.log('Users inserted successfully')

    // Step 2: Insert accounts
    for (const account of accounts) {
      await prisma.account.create({
        data: { ...account, password: await hashPassword(account.password) },
      })
    }
    console.log('Accounts inserted successfully')

    // Step 3: Insert profiles
    for (const profile of profiles) {
      await prisma.profile.create({
        data: profile,
      })
    }
    console.log('Profiles inserted successfully')

    // Step 4: Insert socialLinks
    for (const socialLink of socialLinks) {
      await prisma.socialLinks.create({
        data: socialLink,
      })
    }
    console.log('SocialLinks inserted successfully')

    // Step 5: Insert mentoringSessions
    for (const session of mentoringSessions) {
      await prisma.mentoringSession.create({
        data: session,
      })
    }
    console.log('MentoringSessions inserted successfully')
  } catch (error) {
    console.error('Error inserting data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .then(() => console.log('Data insertion complete'))
  .catch(e => console.error('Error:', e))
