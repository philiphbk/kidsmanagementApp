"use client";

import { useState } from 'react';
import HODLogo from '@/public/images/hodlogo1.png';
import Image from 'next/image';
import Link from 'next/link';

export default function TopNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="flex flex-row justify-between items-center border-b-2 my-5 mx-10 pb-5">
        <div>
          <Link href="/jcadmin/overview">
            <Image src={HODLogo} width={60} height={60} alt="hodlogo" />
          </Link>
        </div>
        <div className="hidden md:flex flex-row gap-5">
          {/* Regular links for desktop view */}
          <Link className="hover:text-blue-800 active:underline font-semibold" href="/jcadmin/overview">
            Overview
          </Link>
          <Link className="hover:text-blue-800 active:underline font-semibold" href="/jcadmin/checkInOut">
            Check In/Out
          </Link>
          <Link className="hover:text-blue-800 active:underline font-semibold" href="/jcadmin/registerUsers">
            Register Users
          </Link>
          <Link className="hover:text-blue-800 active:underline font-semibold" href="/jcadmin/settings">
            Settings
          </Link>
        </div>
        <div className="md:hidden flex items-center">
          {/* Hamburger icon for mobile view */}
          <button title='mobileview' onClick={toggleMenu} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </nav>
      {/* Dropdown menu for mobile view */}
      {isMenuOpen && (
        <div className="md:hidden">
          <Link className="block py-2 px-4 hover:bg-gray-100 font-semibold" href="/jcadmin/overview">
            Overview
          </Link>
          <Link className="block py-2 px-4 hover:bg-gray-100 font-semibold" href="/jcadmin/checkInOut">
            Check In/Out
          </Link>
          <Link className="block py-2 px-4 hover:bg-gray-100 font-semibold" href="/jcadmin/registerUsers">
            Register Users
          </Link>
          <Link className="block py-2 px-4 hover:bg-gray-100 font-semibold" href="/jcadmin/settings">
            Settings
          </Link>
        </div>
      )}
    </div>
  );
}
