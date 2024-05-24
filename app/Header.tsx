import Link from 'next/link'

//
//
//

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
      <div className="rounded-16 ml-20 flex h-[44px] w-[600px] items-center justify-between bg-lightblue">
        <div className="ml-5 flex items-center">
          <img src="/header_search.svg" className="h-[20px] w-[20px]" />
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="ml-3.5 bg-transparent text-sm outline-0"
          />
        </div>
        <img src="/header_filter.svg" className="mr-6 h-[20px] w-[20px] cursor-pointer" />
      </div>
    )
  }

  const renderLoginSection = () => {
    return (
      <div className="flex w-72 justify-end">
        <button className="rounded-16 mr-4 h-[44px] w-[84px] border-[1px] border-blue text-sm text-blue">
          로그인
        </button>
        <button className="rounded-16 h-[44px] w-[84px] bg-blue text-sm text-blue text-white">
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
