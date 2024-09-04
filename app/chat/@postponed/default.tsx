'use client'

import React, { useState } from 'react'
import PostponedProposal from './PostponedProposal'
import { Avatar, Badge, BadgeProps, styled } from '@mui/material'

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
  const [isOpen, setIsOpen] = useState(false)
  return (
    <section>
      <div className="flex flex-row justify-between px-7">
        <div className="flex flex-row items-center text-darkgray">
          <div className="mr-2">미뤄진 제안들</div>
          {!isOpen && (
            <Avatar sx={{ width: 24, height: 24, fontSize: 14, bgcolor: '#1E96FC' }}>
              {postponed.length}
            </Avatar>
          )}
        </div>
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
