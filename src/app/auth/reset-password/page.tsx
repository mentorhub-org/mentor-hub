// app/new-password/page.tsx
'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import InputText from '@/components/shared/text-input';
import { useAuthQuery } from 'better-auth/client';
import Title from '@/components/ui/title';
import { Button } from '@/components/ui/button';



interface Login {
  password: string;
  confirmPassword: string; 
}


const SEND = '/images/reset-password-illustration.png';

export default function NewPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();
  
  const { resetPassword } = useAuthQuery(); 

  const onSubmit: SubmitHandler<Login> = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      await resetPassword(data.password); 
      console.log('Password reset successful:', data);
    } catch (error) {
      console.error('Password reset failed:', error);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Title >Password Reset</Title>
          <p className="text-blue-400">
            Secure Your Account With A New Password
          </p>

          <div className="mt-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <InputText
                label="New Password"
                placeholder="**********"
                type="password"
                name="password"
                register={register}
                classNames={{ label: 'text-black mb-2' }}
                required
                error={errors.password?.message}
              />
              <InputText
                label="Confirm Password"
                placeholder="**********"
                type="password"
                name="confirmPassword"
                register={register}
                classNames={{ label: 'text-black mb-2' }}
                required
                error={errors.confirmPassword?.message}
              />

              <Button
                type="submit"
                className="p-6">
                Reset My Password
              </Button>
            </form>
          </div>

          <p className="mt-4 text-gray-500 text-center">
            Don&apos;t Have An Account?{' '}
            <Link href="/register" className="text-blue-500 hover:underline">
              Create A New Account
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:flex w-1/2 bg-blue-100 items-center justify-center">
        <Image
          src={SEND}
          alt="Reset Password Illustration"
          width={500} 
          height={500}
          className="max-w-full h-auto"
          priority 
        />
      </div>
    </div>
  );
}