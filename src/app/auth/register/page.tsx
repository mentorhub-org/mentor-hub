'use client'

import PickDate from '@/components/shared/pick-date'
import InputText from '@/components/shared/text-input'
import { Button } from '@/components/ui/button'
import Title from '@/components/ui/title'
import { GITHUP, LINKEDIN } from '@/constants/icons'
import { GOOGLE, LOGIN } from '@/constants/images'
import * as authHandler from '@/lib/auth-handler'
import { RegisterSchema, Register as TRegister } from '@/schema/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TRegister>({
    resolver: zodResolver(RegisterSchema),
  })

  const onSubmit = async (data: TRegister) => {
    console.log(data)

    await authHandler.signUpEmail(data)
  }

  const onChangeBirthDate = (date: Date | undefined) => {
    setValue('dateOfBirth', date || new Date())
  }

  return (
    <div className="flex h-screen items-center justify-center bg-blue-50">
      <div className="flex w-full h-full bg-white">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <Title>
            {/* <Title className="text-3xl font-bold text-blue-600 mb-2"> */}
            Registration
          </Title>
          <p className="text-lightblue mb-6">
            Join Mentorhub And Find Your Perfect Guide!
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="grid grid-cols-2 gap-4">
              <InputText
                label="Email"
                placeholder="Someone@Example.Com"
                type="email"
                name="email"
                register={register}
                classNames={{ label: 'text-black mb-2' }}
                error={errors.email?.message}
              />
              <InputText
                label="Phone"
                placeholder="E.G. 011 123 11 441"
                type="text"
                name="phone"
                register={register}
                classNames={{ label: 'text-black mb-2' }}
                error={errors.phone?.message}
              />
              <InputText
                label="First Name"
                placeholder="Enter Your First Name"
                type="text"
                name="firstName"
                register={register}
                classNames={{ label: 'text-black mb-2' }}
                error={errors.firstName?.message}
              />
              <InputText
                label="Last Name"
                placeholder="Enter Your Last Name"
                type="text"
                name="lastName"
                register={register}
                classNames={{ label: 'text-black mb-2' }}
                error={errors.lastName?.message}
              />
              <InputText
                label="Password"
                placeholder="******"
                type="password"
                name="password"
                register={register}
                classNames={{ label: 'text-black mb-2' }}
                error={errors.password?.message}
              />
              <InputText
                label="Repeat Password"
                placeholder="******"
                type="password"
                name="repeatPassword"
                register={register}
                classNames={{ label: 'text-black mb-2' }}
                error={errors.repeatPassword?.message}
              />
              <PickDate
                label="Date Of Birth"
                onChangeDate={onChangeBirthDate}
                classNames={{
                  label: 'text-black mb-2',
                  container: 'col-span-2',
                }}
                error={errors.dateOfBirth?.message}
              />
            </div>
            <div className="flex items-center mt-4">
              <input type="checkbox" className="mr-2" />
              <p className="text-gray-600">
                I Agree To The{' '}
                <span className="text-blue-600">Terms And Privacy Policy</span>
              </p>
            </div>
            <Button type="submit" className="p-6">
              Register My Account
            </Button>
          </form>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <button
              onClick={authHandler.signInLinkedIn}
              className="flex items-center justify-center w-full sm:w-auto border border-darkblue px-6 py-2 rounded-lg text-black hover:bg-blue-100 hover:text-blue-500 hover:shadow-md transition hover:scale-105 hover:cursor-pointer">
              LinkedIn
              <Image
                src={LINKEDIN}
                alt=""
                className="ml-2 w-6 sm:w-8 aspect-square"
              />
            </button>
            <button
              onClick={authHandler.signInGoogle}
              className="flex items-center justify-center w-full sm:w-auto border border-darkblue  px-6 py-2 rounded-lg text-black hover:bg-blue-100 hover:text-blue-500 hover:shadow-md transition hover:scale-105 hover:cursor-pointer">
              Google
              <Image
                src={GOOGLE}
                alt=""
                className="ml-2 w-6 sm:w-8 aspect-square"
              />
            </button>
            <button
              onClick={authHandler.signInGithub}
              className="flex items-center justify-center w-full sm:w-auto border border-darkblue  px-6 py-2 rounded-lg text-black hover:bg-blue-100 hover:text-blue-500 hover:shadow-md transition hover:scale-105 hover:cursor-pointer">
              Github
              <Image
                src={GITHUP}
                alt=""
                className="ml-2 w-6 sm:w-8 aspect-square"
              />
            </button>
          </div>

          <p className="text-center text-gray-600 mt-4">
            Already Have An Account?{' '}
            <Link href="/auth/login" className="text-darkblue  hover:underline">
              Login instead
            </Link>
          </p>
        </div>

        {/* Image Section */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-blue-100">
          <Image
            className="w-full h-full object-cover"
            src={LOGIN}
            alt="Registration"
          />
        </div>
      </div>
    </div>
  )
}
