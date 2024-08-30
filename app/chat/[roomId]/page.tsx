'use client'

import { useEffect, useState } from 'react'
import ChatFooter from './ChatFooter'
import { createClient } from '@/app/api/chat/request'

//
//
//

type Props = {
  params: {
    roomId: string
  }
}

type Message = {
  roomId?: string
  sender: string
  message: string
  sendingTime: string
}

//
//
//

//  "roomId": "277d8a4a-ccdb-41c9-aaff-d9840860e277"

export default function Page({ params }: Props) {
  const token = localStorage.getItem('accessToken') as string

  const client = createClient(token)
  const [messages, setMessages] = useState<Message[]>([])

  const sendMessage = (content: string) => {
    const newMessage = {
      roomId: params.roomId,
      sender: '',
      message: content,
      sendingTime: 'yyyy-MM-dd HH:mm:ss',
    }

    if (client.connected) {
      // 연결이 완료되었는지 확인
      client.publish({
        destination: `${process.env.NEXT_PUBLIC_SPRING_URL}/pub/chat/message`,
        body: JSON.stringify(newMessage),
        headers: { Authorization: `Bearer ${token}` },
      })

      setMessages((prevMessages) => [...prevMessages, newMessage])
    } else {
      console.log('STOMP client is not connected.')
    }
  }

  // connect web socket
  useEffect(() => {
    client.activate()

    client.onConnect = () => {
      const subscribe = client.subscribe(
        `${process.env.NEXT_PUBLIC_SPRING_URL}/sub/chat/room/${params.roomId}`,
        (message) => {
          const newMessage = JSON.parse(message.body)
          setMessages((prevMessages) => [...prevMessages, newMessage])
        },
      )

      return () => {
        if (client !== null) {
          subscribe.unsubscribe()
          client.deactivate()
        }
      }
    }

    return () => {
      if (client && client.connected) {
        client.deactivate()
      }
    }
  }, [params.roomId])

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 p-10">
        {messages.map((message, idx) => (
          <Bubble key={idx} message={message} isMine={message.sender === userId} />
        ))}
      </div>
      <ChatFooter sendMessage={sendMessage} />
    </div>
  )
}
