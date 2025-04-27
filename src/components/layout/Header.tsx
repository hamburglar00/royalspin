'use client';

import { useState } from 'react';
import { FaBell, FaUser } from "react-icons/fa";
import UserMenu from '../UserMenu';

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <>
      <header className="w-full flex justify-between items-center mb-[-2rem] md:justify-end md:gap-6 mt-4">
        <FaBell className="w-10 h-10 cursor-pointer hover:text-purple-300 transition-colors" />
        <FaUser
          className="w-10 h-10 cursor-pointer hover:text-purple-300 transition-colors"
          onClick={() => setIsUserMenuOpen(true)}
        />
      </header>
      {isUserMenuOpen && <UserMenu onClose={() => setIsUserMenuOpen(false)} />}
    </>
  );
}
