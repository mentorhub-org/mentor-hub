import { tryCatch } from '@/lib/utils'
import type { MentoringSession } from '@prisma/client'
import Stripe from 'stripe'

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

export const createOrderWithStripe = async (
  orderData: Partial<MentoringSession>,
) => {
  console.log(process.env.BASE_URL)
  const successUrlParams = new URLSearchParams(
    Object.entries(orderData).reduce<Record<string, string>>(
      (acc, [key, value]) => {
        acc[key] = value?.toString() ?? ''
        return acc
      },
      {},
    ),
  )

  const [checkoutSessionError, checkoutSession] = await tryCatch(
    stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      currency: 'egp',
      line_items: [
        {
          price_data: {
            currency: 'egp',
            product_data: {
              name: orderData.name || '',
              images: orderData.thumbnail ? [orderData.thumbnail] : undefined,
              description: orderData.description ?? '',
            },
            unit_amount: Math.floor(Number(orderData.price) * 100),
            tax_behavior: 'exclusive',
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.BASE_URL}/checkout/success?${successUrlParams.toString()}`,
      cancel_url: `${process.env.BASE_URL}/checkout/cancelled`,
    }),
  )

  console.log(checkoutSession?.url)

  if (checkoutSessionError) throw checkoutSessionError

  return checkoutSession.url
}
