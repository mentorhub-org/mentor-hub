 'use client'
 import { BE, DRI, FACEBOOKK, GITHUB, INSTAGRAM, LINKED, MAIL, MAP, MENU, PHONE, REFRESH, TELEGRAM, TICK, TICKA, TIMER, WHATSAPP } from "@/constants/icons";
import { PROFILE } from "@/constants/images";
import Image from "next/image";

export default function Aside() {
  return (
    <aside className="m-3 w-full md:w-1/4 bg-white md:p-8 lg:p-10 shadow-lg rounded-2xl">
      <div className="flex flex-col items-center  ">
        {/* Profile Section */}
        <div className="text-center">
          <Image
            src={PROFILE}
            alt="Profile"
            className="rounded-full mx-auto w-24 h-24 md:w-32 md:h-32 object-cover"
          />
          <h2 className="text-2xl font-bold mt-4 text-gray-800">Nour Mohamed</h2>
          <p className="text-blue-500 font-medium">UI/UX Designer</p>
          <p className="text-gray-500 text-sm">ID: 123456789</p>
          <div className="flex justify-center items-center mt-3">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-lg">★</span>
            ))}
            <span className="ml-2 text-gray-600 font-medium">4.5</span>
          </div>
          {/* Adjusted Buttons Section */}
          <div className="flex flex-col sm:flex-row gap-2 w-full mt-4">
            <button className="text-nowrap p-2 flex-1 bg-gradient text-white  px-8 text-center rounded-lg text-sm font-semibold hover:bg-blue-600 transition duration-300">
              Chat With Me
            </button>
            <button className="text-nowrap flex-1 bg-transparent border-2 border-blue-500 text-blue-500  px-8 rounded-lg text-sm font-semibold hover:bg-blue-50 transition duration-300">
              Create Session
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-8 w-full">
          <h3 className="text-blue-500 font-bold text-lg">About</h3>
          <div className="mt-4 space-y-3">
            <p className="flex items-center space-x-2 text-gray-600">
              <Image src={PHONE} alt="Phone" className="w-5 h-5" />
              <span className="text-gray-400 text-sm">Phone:</span>
              <span className="text-sm">+20 123 456 7890</span>
            </p>
            <p className="flex items-center space-x-2 text-gray-600">
              <Image src={MAIL} alt="Email" className="w-5 h-5" />
              <span className="text-gray-400 text-sm">Email:</span>
              <span className="text-sm">nourmohamed@gmail.com</span>
            </p>
            <p className="flex items-center space-x-2 text-gray-600">
              <Image src={MAP} alt="Address" className="w-5 h-5" />
              <span className="text-gray-400 text-sm">Address:</span>
              <span className="text-sm">Egypt, Cairo</span>
            </p>
            <p className="flex items-center space-x-2 text-gray-600">
              <Image src={MENU} alt="Date of Birth" className="w-5 h-5" />
              <span className="text-gray-400 text-sm">Date of Birth:</span>
              <span className="text-sm">Oct 19, 1988</span>
            </p>
          </div>
        </div>

        <hr className="my-6 border-gray-300 w-full" />

        {/* Mentorship Sessions Section */}
        <div className="mt-6 w-full">
          <h3 className="text-blue-500 font-bold text-lg">Mentorship Sessions</h3>
          <div className="mt-4 space-y-3">
            <p className="flex items-center space-x-2 text-gray-600">
              <Image src={REFRESH} alt="Ongoing Sessions" className="w-5 h-5" />
              <span className="text-gray-400 text-sm">Ongoing Sessions:</span>
              <span className="text-sm">4</span>
            </p>
            <p className="flex items-center space-x-2 text-gray-600">
              <Image src={TICKA} alt="Completed Sessions" className="w-5 h-5" />
              <span className="text-gray-400 text-sm">Completed Sessions:</span>
              <span className="text-sm">12</span>
            </p>
            <p className="flex items-center space-x-2 text-gray-600">
              <Image src={TICK} alt="Unfinished Sessions" className="w-5 h-5" />
              <span className="text-gray-400 text-sm">Unfinished Sessions:</span>
              <span className="text-sm">3</span>
            </p>
            <p className="flex items-center space-x-2 text-gray-600">
              <Image src={TIMER} alt="Postponed Sessions" className="w-5 h-5" />
              <span className="text-gray-400 text-sm">Postponed Sessions:</span>
              <span className="text-sm">5</span>
            </p>
          </div>
        </div>

        <hr className="my-6 border-gray-300 w-full" />

        {/* Links Section */}
        <div className="mt-6 w-full">
          <h3 className="text-blue-500 font-bold text-lg">Links</h3>
          <div className="mt-4 space-y-3">
            <p className="flex items-center space-x-2 text-gray-600">
              <Image src={LINKED} alt="LinkedIn" className="w-5 h-5" />
              <span className="text-gray-400 text-sm">LinkedIn:</span>
              <a
                className="text-blue-500 text-sm hover:underline"
                href="https://linkedin.com/in/nourmohamed"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/nourmohamed
              </a>
            </p>
            <p className="flex items-center space-x-2 text-gray-600">
              <Image src={GITHUB} alt="GitHub" className="w-5 h-5" />
              <span className="text-gray-400 text-sm">GitHub:</span>
              <a
                className="text-blue-500 text-sm hover:underline"
                href="https://github.com/nourmohamed"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/nourmohamed
              </a>
            </p>
            <p className="flex items-center space-x-2 text-gray-600">
              <Image src={BE} alt="Behance" className="w-5 h-5" />
              <span className="text-gray-400 text-sm">Behance:</span>
              <a
                className="text-blue-500 text-sm hover:underline"
                href="https://behance.net/nourmohamed"
                target="_blank"
                rel="noopener noreferrer"
              >
                behance.net/nourmohamed
              </a>
            </p>
            <p className="flex items-center space-x-2 text-gray-600">
              <Image src={DRI} alt="Dribbble" className="w-5 h-5" />
              <span className="text-gray-400 text-sm">Dribbble:</span>
              <a
                className="text-blue-500 text-sm hover:underline"
                href="https://dribbble.com/nourmohamed"
                target="_blank"
                rel="noopener noreferrer"
              >
                dribbble.com/nourmohamed
              </a>
            </p>
          </div>
        </div>

        <hr className="my-6 border-gray-300 w-full" />

        {/* Connect Me Section */}
        <div className="mt-6 w-full">
          <h3 className="text-blue-500 font-bold text-lg">Connect Me</h3>
          <div className="mt-4 flex justify-center space-x-6">
            <a
              href="#"
              className="flex flex-col items-center text-blue-500 hover:text-blue-600 transition"
            >
              <Image src={FACEBOOKK} alt="Facebook" className="w-6 h-6" />
              <span className="text-sm mt-1">Facebook</span>
            </a>
            <a
              href="#"
              className="flex flex-col items-center text-pink-500 hover:text-pink-600 transition"
            >
              <Image src={INSTAGRAM} alt="Instagram" className="w-6 h-6" />
              <span className="text-sm mt-1">Instagram</span>
            </a>
            <a
              href="#"
              className="flex flex-col items-center text-blue-400 hover:text-blue-500 transition"
            >
              <Image src={TELEGRAM} alt="Telegram" className="w-6 h-6" />
              <span className="text-sm mt-1">Telegram</span>
            </a>
            <a
              href="#"
              className="flex flex-col items-center text-green-500 hover:text-green-600 transition"
            >
              <Image src={WHATSAPP} alt="WhatsApp" className="w-6 h-6" />
              <span className="text-sm mt-1">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </aside>
);
}