import PickDate from '@/components/shared/pick-date'
import InputText from '@/components/shared/text-input'
import { Profile } from '@prisma/client'
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'
import FormActions from './FormActions'
import GenderSelector from './GenderSelector'

interface PersonalInfoFormProps {
  register: UseFormRegister<Partial<Profile>>
  handleSubmit: UseFormHandleSubmit<Partial<Profile>>
  errors: FieldErrors<Partial<Profile>>
  onSubmit: (data: Partial<Profile>) => Promise<void>
  onChangeBirthDate: (date: Date | undefined) => void
  handleDiscard: () => void
  isSubmitting: boolean
  isDirty: boolean
  profileImage: string | null
  data: any
}

export default function PersonalInfoForm({
  register,
  handleSubmit,
  errors,
  onSubmit,
  onChangeBirthDate,
  handleDiscard,
  isSubmitting,
  isDirty,
  profileImage,
  data,
}: PersonalInfoFormProps) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-6 md:grid-cols-2">
      <GenderSelector register={register} />

      {/* First Name */}
      <div>
        <InputText
          label="First Name"
          type="text"
          name={'name'}
          register={register}
          classNames={{ label: 'text-black mb-2' }}
          error={errors.name?.message as string}
        />
      </div>

      {/* Email */}
      <div>
        <InputText
          label="Email"
          type="email"
          placeholder="someone@example.com"
          name={'email'}
          register={register}
          classNames={{ label: 'text-black mb-2' }}
          error={errors.email?.message as string}
        />
      </div>

      {/* Phone */}
      <div>
        <InputText
          label="Phone"
          type="tel"
          name={'phone'}
          register={register}
          classNames={{ label: 'text-black mb-2' }}
          error={errors.phone?.message as string}
        />
      </div>

      {/* Date of Birth */}
      <div>
        <div className="relative">
          <PickDate
            label="Date Of Birth"
            onChangeDate={onChangeBirthDate}
            classNames={{
              label: 'text-black mb-2',
            }}
            error={errors.dateOfBirth?.message as string}
            defaultValue={data?.dateOfBirth?.toDateString()}
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <InputText
          label="Address"
          type="text"
          placeholder="Your current address"
          name={'location'}
          register={register}
          classNames={{ label: 'text-black mb-2' }}
          error={errors.location?.message as string}
        />
      </div>

      {/* Field of Mentoring */}
      <div className="col-span-2">
        <InputText
          label="Field of Mentoring"
          type="text"
          placeholder="e.g. UI/UX Designer, Software Engineer"
          name={'jobTitle'}
          register={register}
          classNames={{ label: 'text-black mb-2' }}
          error={errors.jobTitle?.message as string}
        />
      </div>

      <FormActions
        handleDiscard={handleDiscard}
        isSubmitting={isSubmitting}
        isDirty={isDirty}
        profileImage={profileImage}
      />
    </form>
  )
}
