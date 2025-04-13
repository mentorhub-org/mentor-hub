'use client'
import InputText from '@/components/shared/text-input'
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
      <div className="flex w-full h-full bg-white shadow-lg">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-2">
            Password Recovery
          </h2>
          <p className="text-gray-500 mb-6">We&apos;ll Help You Reset It!</p>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
            <InputText
              lable="Email"
              placeholder="Someone@Example.Com"
              type="email"
              name={'email'}
              register={register}
              classNames={{ label: 'text-black mb-2' }}
              error={errors.email?.message}
            />
            <button className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg hover:bg-blue-600 transition">
              Verify Email
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Don&apos;t Have An Account?{' '}
            <Link href="/register" className="text-blue-500 hover:underline">
              Create A New Account
            </Link>
          </p>
        </div>

        {/* Image Section */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-blue-100">
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
