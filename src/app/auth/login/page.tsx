'use client'

import InputText from '@/components/shared/text-input'
import { Button } from '@/components/ui/button'
import Title from '@/components/ui/title'
import { GITHUP, LINKEDIN } from '@/constants/icons'
import { GOOGLE, LOGIN } from '@/constants/images'
import * as authHandler from '@/lib/auth-handler'
import { Login as TLogin } from '@/schema/auth'
import Image from 'next/image'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>()

  const onSubmit: SubmitHandler<TLogin> = data => {
    authHandler.signInFn(data)
  }
  return (
    <div className="flex w-full h-screen items-center justify-center">
      {/* Container Flex */}
      <div className="flex flex-col md:flex-row w-full h-full">
        {/* Right - Login Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24">
          <Title>Login To Mentorhub</Title>
          <Title className="text-3xl font-bold text-black mb-2" />
          <p className="text-lg text-blue-400 mb-6">
            Your Journey Resumes Here!
          </p>

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

            <InputText
              label="Password"
              placeholder="************"
              type="password"
              name={'password'}
              register={register}
              classNames={{ label: 'text-black mb-2' }}
              error={errors.password?.message}
            />

            <div className="">
              <Link
                href="/forget-password"
                className="text-blue-500 hover:underline">
                Forgot Your Password?
              </Link>
            </div>

            <Button
              type="submit" className='p-6'>
              Login
            </Button>

            <p className="text-center text-gray-600 mt-4">
              Don&apos;t Have An Account?{' '}
              <Link
                href="/auth/register"
                className="text-blue-500 hover:underline">
                Create A New Account
              </Link>
            </p>
          </form>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <button
              onClick={authHandler.signInLinkedIn}
              className="flex cursor-pointer items-center justify-center w-full sm:w-auto border border-blue-500 px-6 py-2 rounded-lg text-black">
              LinkedIn
              <Image
                src={LINKEDIN}
                alt=""
                className="ml-2 w-6 sm:w-8 aspect-square"
              />
            </button>
            <button
              onClick={authHandler.signInGoogle}
              className="flex items-center justify-center w-full sm:w-auto border border-blue-500 px-6 py-2 rounded-lg text-black">
              Google
              <Image
                src={GOOGLE}
                alt=""
                className="ml-2 w-6 sm:w-8 aspect-square"
              />
            </button>
            <button
              onClick={authHandler.signInGithub}
              className="flex items-center justify-center w-full sm:w-auto border border-blue-500 px-6 py-2 rounded-lg text-black">
              Github
              <Image
                src={GITHUP}
                alt=""
                className="ml-2 w-6 sm:w-8 aspect-square"
              />
            </button>
          </div>
        </div>

        {/* Left - Image */}
        <div className="hidden md:flex w-1/2 h-full">
          <Image
            src={LOGIN}
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}
