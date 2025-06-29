import { Button } from '@/components/ui/button'
import { XCircle } from 'lucide-react'
import Link from 'next/link'

const CheckoutCancelled = async () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="mx-auto max-w-md space-y-6 p-6 text-center">
        <div className="flex justify-center">
          <XCircle className="h-24 w-24 text-red-500" />
        </div>

        <h1 className="font-bold text-3xl text-gray-900">
          Your session has been cancelled
        </h1>

        <p className="text-gray-600">
          Your payment session has been cancelled. Please try again.
        </p>

        <div className="flex justify-center pt-4">
          <Link href="/">
            <Button variant="default" className="flex items-center gap-2">
              Open Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CheckoutCancelled
