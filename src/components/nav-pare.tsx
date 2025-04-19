import React, { useState } from 'react';
import { FACE, MASSAGE, MENUU, PRIM, SEARCH, SETING } from "@/constants/icons";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white p-4 rounded-lg shadow-md mx-2 my-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold text-blue-500">MentorHub</div>
          <div className="hidden md:flex items-center w-full max-w-md">
            <input
              type="text"
              placeholder="Search For Courses"
              className="w-65 p-2 text-gray-500 bg-blue-50 rounded-l-full outline-none text-sm md:text-base placeholder-gray-500"
            />
            <button className="p-2 bg-blue-500 w-10 h-10 text-white rounded-r-full flex items-center justify-center">
              <img src={SEARCH} alt="Search" className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <img src={MENUU} alt="Menu" className="w-8 h-8" />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full text-sm md:text-base">
            <img src={PRIM} alt="Prim" className="w-5 h-5" />
            <span>Create Course</span>
          </button>

          <div className="flex gap-8">
            <img src={MASSAGE} alt="Massage" className="w-6 h-6 cursor-pointer" />
            <img src={SETING} alt="Setting" className="w-6 h-6 cursor-pointer" />
            <img src={FACE} alt="Face" className="w-6 h-6 cursor-pointer" />
          </div>
        </div>
      </div>

      <div
        className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } md:hidden flex-col mt-4 gap-4 transition-all duration-300`}
      >
        <div className="flex items-center w-full max-w-md mx-2">
          <input
            type="text"
            placeholder="Search For Courses"
            className="w-full p-2 text-gray-500 bg-blue-50 rounded-l-full outline-none text-sm placeholder-gray-500"
          />
          <button className="p-2 bg-blue-500 w-10 h-10 text-white rounded-r-full flex items-center justify-center">
            <img src={SEARCH} alt="Search" className="w-5 h-5" />
          </button>
        </div>

        
        <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full text-sm w-full justify-center">
          <img src={PRIM} alt="Prim" className="w-5 h-5" />
          <span>Create Course</span>
        </button>

      
        <div className="flex gap-3 mt-2">
          <img src={MASSAGE} alt="Massage" className="w-6 h-6 cursor-pointer" />
          <img src={SETING} alt="Setting" className="w-6 h-6 cursor-pointer" />
          <img src={FACE} alt="Face" className="w-6 h-6 cursor-pointer" />
        </div>
      </div>
    </nav>
  );
}