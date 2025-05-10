'use client'
import InputText from '@/components/shared/text-input'
import { Button } from '@/components/ui/button'
import Title from '@/components/ui/title'
import { SEND } from '@/constants/images'
import {
  ForgetPasswordSchema,
  ForgetPassword as TForgetPassword,
} from '@/schema/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'

export default function ForgetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForgetPassword>({
    resolver: zodResolver(ForgetPasswordSchema),
  })

  const onSubmit: SubmitHandler<TForgetPassword> = data => {
    console.log(data)
  }
  return (
    <main className="flex h-screen w-screen items-center justify-center bg-blue-50">
      <div className="flex w-full h-full bg-white">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <Title>Password Recovery</Title>
          <p className="text-lightblue mb-6">We&apos;ll Help You Reset It!</p>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
            <InputText
              label="Email"
              placeholder="Someone@Example.Com"
              type="email"
              name={'email'}
              register={register}
              classNames={{ label: 'text-black mb-2' }}
              error={errors.email?.message}
            />
            <Button className="p-6">Verify Email</Button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Don&apos;t Have An Account?{' '}
            <Link
              href="/auth/register"
              className="text-darkblue hover:underline">
              Create A New Account
            </Link>
          </p>
        </div>

        {/* Image Section */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-light">
          <Image
            className="w-full h-full object-cover"
            src={SEND}
            alt="Password Recovery"
          />
        </div>
      </div>
    </main>
  )
}
