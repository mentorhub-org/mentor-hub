'use client'

import {
  FACE,
  LOGOICON,
  MASSAGE,
  MENUU,
  SEARCH,
  SETING,
} from '@/constants/icons'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import ProfileDropdown from './profile-dropdown'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white p-4 rounded-lg mx-2 my-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/peer-mentoring">
            <Image src={LOGOICON} alt="Mentor Hub" className="h-11 w-fit" />
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <Image src={MENUU} alt="Menu" className="w-8 h-8" />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex gap-8 items-center">
            <Link
              href="/search"
              className="flex items-center gap-2 px-4 py-2  bg-gradient hover:bg-darkblue text-white rounded-full transition-colors duration-300">
              <Image src={SEARCH} alt="Search" className="w-5 h-5" />
              <span>Search Mentors</span>
            </Link>
            <Link href="/chats">
              <Image
                src={MASSAGE}
                alt="Massage"
                className="text- w-6 h-6 cursor-pointer"
              />
            </Link>
            <ProfileDropdown />
          </div>
        </div>
      </div>

      <div
        className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } md:hidden flex-col mt-4 gap-4 transition-all duration-300`}>
        <div className="flex items-center w-full max-w-md mx-2">
          <input
            type="text"
            placeholder="Search For Mentor"
            className="w-full p-2 text-gray-500 bg-light rounded-l-full outline-none text-sm placeholder-gray-500"
          />
          <button className="p-2 bg-darkblue w-10 h-10 text-white rounded-r-full flex items-center justify-center">
            <Image src={SEARCH} alt="Search" className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-3 mt-2">
          <Image
            src={MASSAGE}
            alt="Massage"
            className="w-6 h-6 cursor-pointer"
          />
          <Image
            src={SETING}
            alt="Setting"
            className="w-6 h-6 cursor-pointer"
          />
          <Image src={FACE} alt="Face" className="w-6 h-6 cursor-pointer" />
        </div>
      </div>
    </nav>
  )
}
