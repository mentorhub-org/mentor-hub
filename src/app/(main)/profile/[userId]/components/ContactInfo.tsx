import { MAIL, MAP, MENU, PHONE } from '@/constants/icons'
import Image from 'next/image'

type ContactInfoProps = {
  phone: string
  email: string
  address: string
  dateOfBirth: string
}

export default function ContactInfo({ phone, email, address, dateOfBirth }: ContactInfoProps) {
  return (
    <div className="w-full">
      <h3 className="text-darkblue font-bold text-lg">About</h3>
      <div className="mt-4 space-y-3">
        <p className="flex items-center space-x-2 text-gray-600">
          <Image src={PHONE} alt="Phone" className="w-5 h-5" />
          <span className="text-gray-400 text-sm">Phone:</span>
          <span className="text-sm">{phone}</span>
        </p>
        <p className="flex items-center space-x-2 text-gray-600">
          <Image src={MAIL} alt="Email" className="w-5 h-5" />
          <span className="text-gray-400 text-sm">Email:</span>
          <span className="text-sm">{email}</span>
        </p>
        <p className="flex items-center space-x-2 text-gray-600">
          <Image src={MAP} alt="Address" className="w-5 h-5" />
          <span className="text-gray-400 text-sm">Address:</span>
          <span className="text-sm">{address}</span>
        </p>
        <p className="flex items-center space-x-2 text-gray-600">
          <Image src={MENU} alt="Date of Birth" className="w-5 h-5" />
          <span className="text-gray-400 text-sm">Date of Birth:</span>
          <span className="text-sm">{dateOfBirth}</span>
        </p>
      </div>
    </div>
  )
}