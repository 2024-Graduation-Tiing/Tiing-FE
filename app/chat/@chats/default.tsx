'use client'

import Chats from './Chats'

//
//
//

// GET ChatRooms
const chats = [
  {
    id: 'room1',
    sender: '이선아',
    latestMsg: '안녕하세요거북이엔터테인먼트어쩌고저쩌고울랄라',
  },
  {
    id: 'room2',
    sender: '이니스프리',
    latestMsg: '안녕하세요 거북이엔터테인먼트 어쩌고저쩌고 울랄라 어쩌고 저쩌고 저쩌고저쩌고',
  },
  {
    id: 'room3',
    sender: '이니스프리',
    latestMsg: '안녕하세요 거북이엔터테인먼트 어쩌고저쩌고 울랄라 어쩌고 저쩌고 저쩌고저쩌고',
  },
  {
    id: 'room3',
    sender: '이니스프리',
    latestMsg: '안녕하세요 거북이엔터테인먼트 어쩌고저쩌고 울랄라 어쩌고 저쩌고 저쩌고저쩌고',
  },
  {
    id: 'room3',
    sender: '이니스프리',
    latestMsg: '안녕하세요 거북이엔터테인먼트 어쩌고저쩌고 울랄라 어쩌고 저쩌고 저쩌고저쩌고',
  },
  {
    id: 'room3',
    sender: '이니스프리',
    latestMsg: '안녕하세요 거북이엔터테인먼트 어쩌고저쩌고 울랄라 어쩌고 저쩌고 저쩌고저쩌고',
  },
  {
    id: 'room3',
    sender: '이니스프리',
    latestMsg: '안녕하세요 거북이엔터테인먼트 어쩌고저쩌고 울랄라 어쩌고 저쩌고 저쩌고저쩌고',
  },
]

export default function SidebarPage() {
  return (
    <section className="mt-8 flex flex-1 flex-col overflow-hidden">
      <div className="mb-3 px-7 text-2xl font-semibold">Chats</div>
      <div className="w-full flex-1 divide-y overflow-y-auto">
        {chats.map((chat) => (
          <Chats chat={chat} key={chat.id} />
        ))}
      </div>
    </section>
  )
}
