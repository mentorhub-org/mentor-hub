'use client'
import InputText from '@/components/shared/text-input'
import { Button } from '@/components/ui/button'
import Title from '@/components/ui/title'
import {
  BEHANCEST,
  DRIBBBLEST,
  FACEBOOKK,
  GITHUBST,
  INSTAGRAM,
  LINKEDINST,
  PINTEREST,
  TELEGRAM,
  TWITTERST,
  WHATSAPP,
  YOUTUBEST,
} from '@/constants/icons'
import Image from 'next/image'
import { useForm } from 'react-hook-form'

export default function Social() {
  const {
    register,
    formState: {},
  } = useForm()

  return (
    <div className="w-full max-w-6xl mx-auto p-6 mt-3 mb-3 bg-white rounded-lg ">
      {/* العنوان الرئيسي */}
      <Title>Social Links</Title>

      {/*Links */}
      <div className=" mb-6">
        <h2 className=" text-lg font-semibold text-gray-700 mb-4">Links</h2>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* LinkedIn */}
          <div className="rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-ublish6 flex-shrink-0">
                <Image
                  src={LINKEDINST}
                  alt="LinkedIn Icon"
                  width={24}
                  height={24}
                />
              </div>
              <InputText
                label=""
                type="text"
                placeholder="https://www.linkedin.com"
                name={''}
                register={register}
                classNames={{ label: 'text-black mb-2', input: 'w-full' }}
              />
            </div>
          </div>
          {/* GitHub */}
          <div className="rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 flex-shrink-0">
                <Image
                  src={GITHUBST}
                  alt="GitHub Icon"
                  width={24}
                  height={24}
                />
              </div>
              <InputText
                label=""
                type="text"
                placeholder="https://www.github.com"
                name={''}
                register={register}
                classNames={{ label: 'text-black mb-2', input: 'w-full' }}
              />
            </div>
          </div>
          {/* Behance */}
          <div className="rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 flex-shrink-0">
                <Image
                  src={BEHANCEST}
                  alt="Behance Icon"
                  width={24}
                  height={24}
                />
              </div>
              <InputText
                label=""
                type="text"
                placeholder="https://www.behance.net"
                name={''}
                register={register}
                classNames={{ label: 'text-black mb-2', input: 'w-full' }}
              />
            </div>
          </div>
          {/* Dribbble */}
          <div className=" rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 flex-shrink-0">
                <Image
                  src={DRIBBBLEST}
                  alt="Dribbble Icon"
                  width={24}
                  height={24}
                />
              </div>
              <InputText
                label=""
                type="text"
                placeholder="https://www.dribbble.com"
                name={''}
                register={register}
                classNames={{ label: 'text-black mb-2', input: 'w-full' }}
              />
            </div>
          </div>
          {/* YouTube */}
          <div className=" rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 flex-shrink-0">
                <Image
                  src={YOUTUBEST}
                  alt="YouTube Icon"
                  width={24}
                  height={24}
                />
              </div>
              <InputText
                label=""
                type="text"
                placeholder="https://www.youtube.com"
                name={''}
                register={register}
                classNames={{ label: 'text-black mb-2', input: 'w-full' }}
              />
            </div>
          </div>
          {/* Pinterest */}
          <div className="rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 flex-shrink-0">
                <Image
                  src={PINTEREST}
                  alt="Pinterest Icon"
                  width={24}
                  height={24}
                />
              </div>
              <InputText
                label=""
                type="text"
                placeholder="https://www.pinterest.com"
                name={''}
                register={register}
                classNames={{ label: 'text-black mb-2', input: 'w-full' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* قسم Contact Me */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Contact Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Facebook */}
          <div className=" rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 flex-shrink-0">
                <Image
                  src={FACEBOOKK}
                  alt="Facebook Icon"
                  width={24}
                  height={24}
                />
              </div>
              <InputText
                label=""
                type="text"
                placeholder="https://www.facebook.com"
                name={''}
                register={register}
                classNames={{ label: 'text-black mb-2', input: 'w-full' }}
              />
            </div>
          </div>
          {/* Instagram */}
          <div className=" rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 flex-shrink-0">
                <Image
                  src={INSTAGRAM}
                  alt="Instagram Icon"
                  width={24}
                  height={24}
                />
              </div>
              <InputText
                label=""
                type="text"
                placeholder="https://www.instagram.com"
                name={''}
                register={register}
                classNames={{ label: 'text-black mb-2', input: 'w-full' }}
              />
            </div>
          </div>
          {/* Telegram */}
          <div className=" rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 flex-shrink-0">
                <Image
                  src={TELEGRAM}
                  alt="Telegram Icon"
                  width={24}
                  height={24}
                />
              </div>
              <InputText
                label=""
                type="text"
                placeholder="https://t.me/"
                name={''}
                register={register}
                classNames={{ label: 'text-black mb-2', input: 'w-full' }}
              />
            </div>
          </div>
          {/* WhatsApp */}
          <div className=" rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 flex-shrink-0">
                <Image
                  src={WHATSAPP}
                  alt="WhatsApp Icon"
                  width={24}
                  height={24}
                />
              </div>
              <InputText
                label=""
                type="text"
                placeholder="https://wa.me/"
                name={''}
                register={register}
                classNames={{ label: 'text-black mb-2', input: 'w-full' }}
              />
            </div>
          </div>
          {/* X */}
          <div className=" rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 flex-shrink-0">
                <Image src={TWITTERST} alt="X Icon" width={24} height={24} />
              </div>
              <InputText
                label=""
                type="text"
                placeholder="https://x.com"
                name={''}
                register={register}
                classNames={{ label: 'text-black mb-2', input: 'w-full' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-6">
        <Button variant={'secondary'}>Discard Changes</Button>
        <Button className="ml-5">Save Changes</Button>
      </div>
    </div>
  )
}
