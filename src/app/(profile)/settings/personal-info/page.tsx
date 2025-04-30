'use client'

import PickDate from '@/components/shared/pick-date'
import InputText from '@/components/shared/text-input'
import { Button } from '@/components/ui/button'
import Title from '@/components/ui/title'
import { useForm } from 'react-hook-form'
export default function PersonalInfo() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm()

  const onChangeBirthDate = (date: Date | undefined) => {
    setValue('dateOfBirth', date || new Date())
  }

  return (
    <main className="w-full bg-white rounded-lg shadow-lg p-6 mt-3 mb-3">
      {/* Header */}
      <div className="flex justify-between  mb-6">
        <Title>Personal Information</Title>
        <div className="flex items-center space-x-2">
          <Title className="text-1xl sm:text-1xl">
            Available for Mentoring
          </Title>
          <div className="relative inline-flex items-center">
            <div className="w-12 h-6 rounded-full bg-darkblue">
              <div className="w-6 h-6 bg-white rounded-full shadow-md transform translate-x-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Gender */}
        <div className="col-span-2 flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked
              className="form-radio h-5 w-5 text-darkblue"
            />
            <span className="text-gray-700">Male</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="gender"
              value="Female"
              className="form-radio h-5 w-5 text-darkblue"
            />
            <span className="text-gray-700">Female</span>
          </label>
        </div>

        {/* First Name & Last Name */}
        <div>
          <InputText
            label="First Name"
            type="text"
            defaultValue="Nour"
            name={'firstname'}
            register={register}
            classNames={{ label: 'text-black mb-2' }}
          />
        </div>
        <InputText
          label="last Name"
          type="text"
          defaultValue="Mohamed"
          name={'lastname'}
          register={register}
          classNames={{ label: 'text-black mb-2' }}
        />

        {/* Email & Phone */}
        <div>
          <InputText
            label="Email"
            type="email"
            placeholder="Someone@Example.Com"
            name={'email'}
            register={register}
            classNames={{ label: 'text-black mb-2' }}
            error={errors.email?.message as string}
          />
        </div>
        <div>
          <InputText
            label="phone"
            type="tel"
            defaultValue="+20 123 456 7890"
            name={'Phone'}
            register={register}
            classNames={{ label: 'text-black mb-2' }}
            error={errors.email?.message as string}
          />
        </div>

        {/*  Password */}
        <div className="col-span-2">
          <div className="relative">
            <InputText
              label="password"
              type="password"
              placeholder="**************"
              name={'password'}
              register={register}
              classNames={{ label: 'text-black mb-2' }}
              error={errors.email?.message as string}
            />
          </div>
          <p className="text-red-500 text-sm mt-1">
            Incorrect Current Password. Please Try Again.{' '}
            <a href="#" className="underline text-darkblue">
              Forget Your Password?
            </a>
          </p>
        </div>

        <div>
          <div className="relative">
            <InputText
              label="New Password"
              type="password"
              placeholder="**************"
              name={'password'}
              register={register}
              classNames={{ label: 'text-black mb-2' }}
              error={errors.email?.message as string}
            />
          </div>
          <p className="text-red-500 text-sm mt-1">
            Must Have Least 6 Characters
          </p>
        </div>
        <div>
          <div className="relative">
            <InputText
              label="Confirm New Password"
              type="password"
              placeholder="**************"
              name={'password'}
              register={register}
              classNames={{ label: 'text-black mb-2' }}
              error={errors.email?.message as string}
            />
          </div>
          <p className="text-red-500 text-sm mt-1">
            Password Doesn&apos;t Match
          </p>
        </div>

        {/* Date of Birth & Address */}
        <div>
          <div className="relative">
            <PickDate
              label="Date Of Birth"
              onChangeDate={onChangeBirthDate}
              classNames={{
                label: 'text-black ',
              }}
              error={errors.dateOfBirth?.message as string}
            />
          </div>
        </div>
        <div>
          <InputText
            label="Address"
            type="text"
            placeholder="Address"
            name={'Address'}
            register={register}
            classNames={{ label: 'text-black mb-3' }}
            error={errors.email?.message as string}
          />
        </div>

        {/* Field of Mentoring */}
        <div className="col-span-2">
          <InputText
            label="Field of Mentoring"
            type="text"
            placeholder="UI/UX Designer"
            name={'field'}
            register={register}
            classNames={{ label: 'text-black mb-3' }}
            error={errors.email?.message as string}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4 mt-6">
        <Button variant={'secondary'} className="p-6">
          Discard Changes
        </Button>
        <Button className="p-6">Save Changes</Button>
      </div>
    </main>
  )
}
