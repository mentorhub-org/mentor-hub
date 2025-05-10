import NavLink from '@/components/shared/nav-link'
import { Button } from '@/components/ui/button'
import { BOOKBLACK, LINKBLUE, LOGIN, PRO, VECTOR } from '@/constants/icons'
import { PROFILE } from '@/constants/images'
import Image from 'next/image'

export default function SettingsAside() {
  return (
    <aside className="bg-white rounded-lg w-full  p-6 flex flex-col min-h-screen md:h-auto md:max-w-sm md:w-1/4 md:p-8 lg:p-10 ">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <Image
            src={PROFILE}
            alt="Profile"
            className="w-35 h-35 rounded-full object-cover"
          />
          <span className="absolute bottom-0 right-0 w-8 h-8 bg-da rounded-full flex items-center justify-center text-white text-xs">
            <Image src={VECTOR} alt="" />
          </span>
        </div>
        <h2 className="mt-4 text-xl font-semibold text-darkblue ">
          Nour Mohamed
        </h2>
        <p className="text-sm text-dark">UI/UX Designer</p>
      </div>

      {/* Navigation NavLinks */}
      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            <NavLink
              href="/settings/personal-info"
              className="flex items-center text-gray-600 hover:text-darkblue transition-colors"
              activeClassName="flex items-center bg-blue-100 text-darkblue px-4 py-2 rounded-lg">
              <Image src={PRO} className="m-1" alt="" />
              Personal Information
            </NavLink>
          </li>
          <li>
            <NavLink
              href="/settings/skills"
              className="flex items-center text-gray-600 hover:text-darkblue transition-colors"
              activeClassName="flex items-center bg-blue-100 text-darkblue px-4 py-2 rounded-lg">
              <Image src={BOOKBLACK} className="m-1" alt="" />
              About & Skills
            </NavLink>
          </li>
          <li>
            <NavLink
              href="/settings/links"
              className="flex items-center text-gray-600 hover:text-darkblue transition-colors"
              activeClassName="flex items-center bg-blue-100 text-darkblue px-4 py-2 rounded-lg">
              <Image src={LINKBLUE} className="m-1" alt="" />
              Social Links
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div>
        <Button className="p-6">
          <Image src={LOGIN} className="m-1" alt="" />
          Log Out
        </Button>
      </div>
    </aside>
  )
}
