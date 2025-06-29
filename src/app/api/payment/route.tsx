import { createOrderWithStripe } from '@/services/stripe'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log(body)
    const session = await createOrderWithStripe(body)
    if (!session) {
      throw new Error('Payment processing failed')
    }
    return NextResponse.json(session, { status: 200 })
  } catch (error) {
    // Log the error for debugging
    console.error('Payment processing error:', error)

    // Return error response
    return NextResponse.json(
      {
        message: 'Payment processing failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
