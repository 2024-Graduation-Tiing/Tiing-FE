import React from 'react'

//
//
//

export default function ScouterMypageLayout({
  children,
  proposallist,
  matchinghistory,
}: Readonly<{
  children: React.ReactNode
  proposallist: React.ReactNode
  matchinghistory: React.ReactNode
}>) {
  return (
    <div className="mt-10 grid grid-cols-7 gap-14">
      {children}

      {matchinghistory}
      {proposallist}
    </div>
  )
}
