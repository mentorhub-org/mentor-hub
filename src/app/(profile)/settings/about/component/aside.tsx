import { BOOK, LINK, LOGIN, PRO, VECTOR } from '@/constants/icons'
import { PROFILE } from '@/constants/images'
import Image from 'next/image'

export default function aside() {
  return (
    <aside className="bg-white rounded-lg shadow-lg w-full  p-6 flex flex-col min-h-screen md:h-auto md:max-w-sm m-3  md:w-1/4 md:p-8 lg:p-10 ">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <Image
            src={PROFILE}
            alt="Profile"
            className="w-35 h-35 rounded-full object-cover"
          />
          <span className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
            <Image src={VECTOR} alt="" />
          </span>
        </div>
        <h2 className="mt-4 text-xl font-semibold text-blue-500 ">
          Nour Mohamed
        </h2>
        <p className="text-sm text-gray-800">UI/UX Designer</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            <a
              href="#"
              className="flex items-center text-gray-600 hover:text-blue-500 transition-colors">
              <Image src={PRO} className="m-1" alt="" />
              Personal Information
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center bg-blue-100 text-gray-800 px-4 py-2 rounded-lg">
              <Image src={BOOK} className="m-1" alt="" />
              About & Skills
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center text-gray-600 hover:text-blue-500 transition-colors">
              <Image src={LINK} className="m-1" alt="" />
              Social Links
            </a>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <button className="mt-8 flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all">
        <Image src={LOGIN} className="m-1" alt="" />
        Log Out
      </button>
    </aside>
  )
}
