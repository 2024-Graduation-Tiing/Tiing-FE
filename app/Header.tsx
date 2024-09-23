'use client';

import Link from 'next/link';
import DropdownMenu from './DropdownMenu';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Filter from './Filter';
import LoginModal from './LoginModal';
import SearchBar from './SearchBar';
import fetchUserData from '@/utils/fetchUserData';

//
//
//

export default function Header() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const path = usePathname();

  const { data: user } = fetchUserData();

  const renderLogo = () => {
    return (
      <Link href="/">
        <img src="/logo.svg" alt="logo" />
      </Link>
    );
  };

  const renderSearchBar = () => {
    return (
      <SearchBar
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
      />
    );
  };

  const renderLoginSection = () => {
    if (user) return;

    return (
      <div className="flex w-72 justify-end">
        <button className="mr-4 h-[44px] w-[84px] rounded-16 border-[1px] border-blue text-sm text-blue">
          <Link href="/login">로그인</Link>
        </button>
        <button className="h-[44px] w-[84px] rounded-16 bg-blue text-sm text-blue text-white">
          <Link href="/signup">Sign Up</Link>
        </button>
      </div>
    );
  };

  const renderIconSection = () => {
    return (
      <>
        <div className="mx-8 grid grid-cols-2 gap-6">
          <img
            src="/header_notice.svg"
            className="h-[20px] w-[20px] cursor-pointer"
          />
          <img
            src="/header_message.svg"
            className="h-[20px] w-[20px] cursor-pointer"
          />
        </div>
      </>
    );
  };

  const renderUserMenuSection = () => {
    return <DropdownMenu />;
  };

  const renderUserSection = () => {
    if (!user) return;

    return (
      <div className="flex w-72 items-center justify-end">
        {renderIconSection()}
        {renderUserMenuSection()}
      </div>
    );
  };

  if (path.startsWith('/chat')) {
    return (
      <div className="flex flex-col items-center justify-center bg-white shadow-header-bottom z-10">
        <div className="flex flex-row h-[76px] px-52 py-4">
          {renderLogo()}
          {renderSearchBar()}
          {renderUserSection()}
          {renderLoginSection()}
        </div>
        {path === '/' && isFilterOpen && <Filter />}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row h-[76px] px-52 py-4">
        {renderLogo()}
        {renderSearchBar()}
        {renderUserSection()}
        {renderLoginSection()}
      </div>
      {path === '/' && isFilterOpen && <Filter />}
    </div>
  );
}
