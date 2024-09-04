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

  const message = `안녕하세요, 저는 거북이 엔터테인먼트 신인 발굴팀 ㅇㅇ사원입니다.
  모델님 이미지와 활동 내역이 이번 신인 발굴 사업에 적합 안녕하세요, 저는 거북이 엔터테인먼트 신인 발굴팀 ㅇㅇ사원입니다.
  모델님 이미지와 활동 내역이 이번 신인 발굴 사업에 적합 안녕하세요, 저는 거북이 엔터테인먼트 신인 발굴팀 ㅇㅇ사원입니다.
  모델님 이미지와 활동 내역이 이번 신인 발굴 사업에 적합`

  return (
    <div className="flex h-full flex-col" id="chatroom-container">
      <div className="flex-1 px-4">
        {/* {messages.map((message, idx) => (
          <Bubble key={idx} message={message} isMine={message.sender === userId} />
        ))} */}
        {/* <div className="mb-3 flex flex-col justify-end">
          <div className="mb-1	w-fit text-pretty text-pretty rounded-b-xl rounded-l-xl bg-blue p-3 text-sm text-white">
            {message}
          </div>
          <div className="self-end text-xs text-gray-500">HH.MM</div>
        </div>

        <div className="mb-3 flex flex-col justify-start">
          <div className="bg-skyblue mb-1 w-fit rounded-b-xl rounded-r-xl p-3 text-sm text-darkgray">
            안녕하세요
          </div>
          <div className="text-xs text-gray-500">HH.MM</div>
        </div>

        <div className="mb-3 flex flex-col justify-start">
          <div className="bg-skyblue mb-1 w-fit rounded-b-xl rounded-r-xl p-3 text-sm text-darkgray">
            안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요
          </div>
          <div className="text-xs text-gray-500">HH.MM</div>
        </div>

        <div className="mb-3 flex flex-col justify-end">
          <div className="mb-1	w-fit text-pretty text-pretty rounded-b-xl rounded-l-xl bg-blue p-3 text-sm text-white">
            {message}
          </div>
          <div className="self-end text-xs text-gray-500">HH.MM</div>
        </div>

        <div className="mb-3 flex flex-col justify-end">
          <div className="mb-1	w-fit text-pretty text-pretty rounded-b-xl rounded-l-xl bg-blue p-3 text-sm text-white">
            {message}
          </div>
          <div className="self-end text-xs text-gray-500">HH.MM</div>
        </div>

        <div className="mb-3 flex flex-col justify-end">
          <div className="mb-1	w-fit text-pretty text-pretty rounded-b-xl rounded-l-xl bg-blue p-3 text-sm text-white">
            {message}
          </div>
          <div className="self-end text-xs text-gray-500">HH.MM</div>
        </div>

        <div className="mb-3 flex flex-col justify-end">
          <div className="mb-1	w-fit text-pretty text-pretty rounded-b-xl rounded-l-xl bg-blue p-3 text-sm text-white">
            {message}
          </div>
          <div className="self-end text-xs text-gray-500">HH.MM</div>
        </div>

        <div className="mb-3 flex flex-col justify-end">
          <div className="mb-1	w-fit text-pretty text-pretty rounded-b-xl rounded-l-xl bg-blue p-3 text-sm text-white">
            {message}
          </div>
          <div className="self-end text-xs text-gray-500">HH.MM</div>
        </div> */}
      </div>
      <ChatFooter sendMessage={sendMessage} />
    </div>
  )
}
