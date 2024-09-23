'use client';

import fetchUserData from '@/utils/fetchUserData';
import Link from 'next/link';
import { useEffect, useState } from 'react';

//
//
//

const MENUS = {
  마이페이지: '/mypage',
  프로필관리: '/profile',
  내계정: '/account',
  로그아웃: '/logout',
};

//
//
//

export default function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: user } = fetchUserData();

  const userId = user?.result.memberId.split('@')[0];

  /**
   *
   */
  const handleArrowClick = () => {
    setIsOpen(!isOpen);
  };

  /**
   *
   */
  const renderUserMenu = () => {
    return (
      <div className="w-full h-[44px] flex items-center">
        <img src="/header_user_profile.svg" />
        <p className="w-full mx-2 text-darkgray overflow-hidden whitespace-nowrap text-ellipsis">
          <span className="font-semibold">{userId}</span> 님
        </p>
        <img
          src={isOpen ? '/arrow_up.svg' : '/arrow_down.svg'}
          className="cursor-pointer"
          onClick={handleArrowClick}
        />
      </div>
    );
  };

  /**
   *
   */
  const renderMenuContents = () => {
    if (!isOpen) return;

    return (
      <div className="absolute top-full flex flex-col h-[140px] gap-3 mt-2 py-4 input-box rounded-16 bg-white w-[160px]">
        {Object.entries(MENUS).map(([menu, link]) => (
          <Link href={link} className="w-full text-center cursor-pointer hover:font-bold">
            {menu}
          </Link>
        ))}
      </div>
    );
  };

  /**
   *
   */
  useEffect(() => {
    console.log('유저', user.result.memberId);
  }, [user]);

  return (
    <div className="relative flex flex-col input-box rounded-16 w-[160px] h-[44px] px-3 z-10">
      {renderUserMenu()}
      {renderMenuContents()}
    </div>
  );
}
