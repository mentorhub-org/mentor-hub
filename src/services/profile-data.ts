'use server'

import prisma from '@/db/prisma'
import { getAuth } from './auth'

// Get profile data for a specific user
export const getUserProfile = async (userId: string) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
        socialLinks: true,
      },
    })
    
    return profile
  } catch (error) {
    console.error('Error fetching user profile:', error)
    throw new Error('Failed to fetch user profile')
  }
}

// Get skills for a profile
export const getProfileSkills = async (profileId: string) => {
  try {
    const skills = await prisma.skill.findMany({
      where: {
        profileSkills: {
          some: {
            profileId,
          },
        },
      },
    })
    
    return skills
  } catch (error) {
    console.error('Error fetching profile skills:', error)
    throw new Error('Failed to fetch profile skills')
  }
}

// Get reviews for a profile
export const getProfileReviews = async (profileId: string) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { profileId },
      include: {
        reviewer: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    
    return reviews
  } catch (error) {
    console.error('Error fetching profile reviews:', error)
    throw new Error('Failed to fetch profile reviews')
  }
}

// Get mentorship session stats
export const getMentorshipStats = async (profileId: string) => {
  try {
    const ongoing = await prisma.mentorshipSession.count({
      where: {
        mentorId: profileId,
        status: 'ONGOING',
      },
    })
    
    const completed = await prisma.mentorshipSession.count({
      where: {
        mentorId: profileId,
        status: 'COMPLETED',
      },
    })
    
    const unfinished = await prisma.mentorshipSession.count({
      where: {
        mentorId: profileId,
        status: 'CANCELLED',
      },
    })
    
    const postponed = await prisma.mentorshipSession.count({
      where: {
        mentorId: profileId,
        status: 'POSTPONED',
      },
    })
    
    return { ongoing, completed, unfinished, postponed }
  } catch (error) {
    console.error('Error fetching mentorship stats:', error)
    throw new Error('Failed to fetch mentorship stats')
  }
}

// Submit a review
export const submitReview = async (profileId: string, reviewData: { text: string; rating: number }) => {
  const user = await getAuth()
  
  if (!user) {
    throw new Error('You must be logged in to submit a review')
  }
  
  try {
    const review = await prisma.review.create({
      data: {
        text: reviewData.text,
        rating: reviewData.rating,
        profileId,
        reviewerId: user.id,
      },
    })
    
    return review
  } catch (error) {
    console.error('Error submitting review:', error)
    throw new Error('Failed to submit review')
  }
}