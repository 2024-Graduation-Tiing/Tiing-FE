'use client';

import Link from 'next/link';
import DropdownMenu from './DropdownMenu';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Filter from './Filter';
import LoginModal from './LoginModal';
import SearchBar from './SearchBar';

//
//
//

export default function Header() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const path = usePathname();

  const renderLogo = () => {
    return (
      <Link href="/">
        <img src="/logo.svg" alt="logo" />
      </Link>
    );
  };

  const renderSearchBar = () => {
    return <SearchBar isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} />;
  };

  const renderLoginSection = () => {
    return (
      <div className="flex w-72 justify-end">
        <button className="mr-4 h-[44px] w-[84px] rounded-16 border-[1px] border-blue text-sm text-blue">
          <Link href="/login">로그인</Link>
        </button>
        <button className="h-[44px] w-[84px] rounded-16 bg-blue text-sm text-blue text-white">
          Sign Up
        </button>
      </div>
    );
  };

  const renderUserSection = () => {
    return (
      <div className="flex w-72 items-center justify-end">
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
        <DropdownMenu />
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row px-52 py-4">
        {renderLogo()}
        {renderSearchBar()}
        {/* {renderUserSection()} */}
        {renderLoginSection()}
      </div>
      {path === '/' && isFilterOpen && <Filter />}
      {/* {isModalOpen && <LoginModal />} */}
    </div>
  );
}
