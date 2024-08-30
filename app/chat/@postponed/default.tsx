'use client'

import React, { useState } from 'react'
import PostponedProposal from './PostponedProposal'

//
//
//

const postponed = [
  {
    receiverId: '1',
    title: 'proposal1',
  },
  {
    receiverId: '2',
    title: 'proposal2',
  },
]

export default function Postponed() {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <section>
      <div className="flex flex-row justify-between px-7">
        <div className="text-darkgray">미뤄진 제안들</div>
        <img
          src={isOpen ? '/arrow_up.svg' : '/arrow_down.svg'}
          alt="dropdown_arrow"
          onClick={() => {
            setIsOpen(!isOpen)
          }}
          className="hover:cursor-pointer"
        />
      </div>
      {isOpen && (
        <div className="divide-y px-10">
          {postponed.map((item) => (
            <PostponedProposal key={item.receiverId} params={{ title: item.title }} />
          ))}
        </div>
      )}
    </section>
  )
}
