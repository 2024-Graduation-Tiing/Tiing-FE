import { headers } from 'next/headers'
import React from 'react'

//
//
//

export default function EntertainerMypageLayout({
  children,
  profile,
  matchingsituation,
}: Readonly<{
  children: React.ReactNode
  profile: React.ReactNode
  matchingsituation: React.ReactNode
}>) {
  const headerList = headers()
  const pathname = headerList.get('x-current-path')

  if (pathname === '/mypage/edit') {
    return <>{children}</>
  }

  return (
    <div className="flex flex-row justify-between">
      <section className="basis-7/12">{profile}</section>
      <section className="flex basis-4/12 flex-col ">{matchingsituation}</section>
    </div>
  )
}
