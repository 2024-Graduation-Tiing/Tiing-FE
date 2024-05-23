import Link from 'next/link'

export default function Header() {
  const renderLogo = () => {
    return (
      <Link href="/">
        <img src="/logo.svg" alt="logo" />
      </Link>
    )
  }

  const renderSearchBar = () => {
    return (
      <div className="ml-20 rounded-16 flex h-[44px] w-[600px] items-center justify-between bg-lightblue">
        <div className="ml-5 flex items-center">
          <img src="/header_search.svg" className="h-[24px] w-[24px]" />
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="ml-3.5 bg-transparent text-[14px] outline-0"
          />
        </div>
        <img src="/header_filter.svg" className="mr-6 h-[24px] w-[24px] cursor-pointer" />
      </div>
    )
  }

  const renderLoginSection = () => {
    return (
      <div className="flex justify-end w-72">
        <button className="mr-4 rounded-16 h-[44px] w-[88px] border-[1px] border-blue text-blue">
          로그인
        </button>
        <button className="rounded-16 h-[44px] w-[88px] bg-blue text-blue text-white">
          Sign Up
        </button>
      </div>
    )
  }

  return (
    <div className="flex justify-center px-52 py-4">
      {renderLogo()}
      {renderSearchBar()}
      {renderLoginSection()}
    </div>
  )
}
