'use client'

import { Button } from '@/components/ui/button'
import Title from '@/components/ui/title'
import { SEND } from '@/constants/images'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export default function VerificationPage() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side - Content */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="h-20 w-20 text-green-500" />
          </div>
          
          <Title>Registration Successful!</Title>
          
          <div className="mt-6 space-y-4">
            <p className="text-lg text-lightblue">
              We've sent a verification link to your email address.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
              <p className="text-darkblue">
                Please check your inbox and click the verification link to activate your account.
                You can safely close this page.
              </p>
            </div>
            
            <p className="text-gray-500 mt-4">
              Didn't receive an email? Check your spam folder or try again in a few minutes.
            </p>
          </div>
          
          <div className="mt-8">
            <Link href="/auth/login">
              <Button variant="default" className="w-full p-6">
                Go to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:flex w-1/2 bg-blue-100 items-center justify-center">
        <Image
          src={SEND}
          alt="Email Verification"
          width={500}
          height={500}
          className="max-w-full h-auto"
          priority
        />
      </div>
    </div>
  )
}