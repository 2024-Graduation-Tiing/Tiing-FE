'use client'

import Link from 'next/link'
import { redirect, usePathname, useRouter } from 'next/navigation'
import React from 'react'

//
//
//

type Chat = {
  id: string
  sender: string
  latestMsg: string
}

type Props = {
  chat: Chat
}

const Chats = ({ chat }: Props) => {
  const pathname = usePathname()
  const url = `/chat/${chat.id}`
  return (
    <div className={pathname === url ? 'bg-gray-200	px-10 ' : 'mx-10'}>
      <Link href={url} replace>
        <div className="w-full py-4">
          <div className="mb-2 font-semibold leading-relaxed">{chat.sender}</div>
          <div className="truncate text-xs text-darkgray">{chat.latestMsg}</div>
        </div>
      </Link>
    </div>
  )
}

export default Chats
