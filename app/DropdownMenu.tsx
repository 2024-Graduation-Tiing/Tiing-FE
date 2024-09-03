'use client'

import { useState } from 'react'

//
//
//

export default function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const MENUS = ['마이페이지', '프로필 관리', '내 계정', '로그아웃']

  return (
    <div
      onClick={() => setIsOpen(true)}
      className="input-box rounded-16 flex h-[44px] items-center px-3"
    >
      <img src="/header_user_profile.svg" />
      <p className="mx-2 text-darkgray">
        <span className="font-semibold">손민재</span> 님
      </p>
      <img src="/arrow_down.svg" />
      {isOpen && (
        <div>
          {MENUS.map((menu) => (
            <p>{menu}</p>
          ))}
        </div>
      )}
    </div>
  )
}
