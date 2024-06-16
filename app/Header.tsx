'use client'

import Link from 'next/link'
import DropdownMenu from './DropdownMenu'
import FilterIcon from '../public/header_filter.svg'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Filter from './Filter'

//
//
//

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const path = usePathname()

  const renderLogo = () => {
    return (
      <Link href="/">
        <img src="/logo.svg" alt="logo" />
      </Link>
    )
  }

  const renderSearchBar = () => {
    return (
      <div className="ml-20 flex h-[44px] w-[600px] items-center justify-between rounded-16 bg-lightblue">
        <div className="ml-5 flex items-center">
          <img src="/header_search.svg" className="h-[20px] w-[20px]" />
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="ml-3.5 bg-transparent text-sm outline-0"
          />
        </div>
        <FilterIcon
          stroke={isOpen ? '#1E96FC' : '#999999'}
          onClick={() => setIsOpen(!isOpen)}
          className="mr-6 cursor-pointer"
        />
      </div>
    )
  }

  const renderLoginSection = () => {
    return (
      <div className="flex w-72 justify-end">
        <button className="mr-4 h-[44px] w-[84px] rounded-16 border-[1px] border-blue text-sm text-blue">
          로그인
        </button>
        <button className="h-[44px] w-[84px] rounded-16 bg-blue text-sm text-blue text-white">
          Sign Up
        </button>
      </div>
    )
  }

  const renderUserSection = () => {
    return (
      <div className="flex w-72 items-center justify-end">
        <div className="mx-8 grid grid-cols-2 gap-6">
          <img src="/header_notice.svg" className="h-[20px] w-[20px] cursor-pointer" />
          <img src="/header_message.svg" className="h-[20px] w-[20px] cursor-pointer" />
        </div>
        <DropdownMenu />
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row px-52 py-4">
        {renderLogo()}
        {renderSearchBar()}
        {/* {renderUserSection()} */}
        {renderLoginSection()}
      </div>
      {path === '/' && isOpen && <Filter />}
    </div>
  )
}
