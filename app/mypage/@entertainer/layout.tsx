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
  return (
    <div className="flex flex-row justify-between">
      {children}
      {profile}
      <section className="flex basis-2/5 flex-col pl-10">{matchingsituation}</section>
    </div>
  )
}
