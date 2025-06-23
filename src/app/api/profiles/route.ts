'use server'

import { NextResponse } from 'next/server'
import { getAllProfiles } from '@/services/profile'

export async function GET() {
  try {
    const profiles = await getAllProfiles()
    return NextResponse.json(profiles)
  } catch (error) {
    console.error('Error fetching profiles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profiles' },
      { status: 500 }
    )
  }
}