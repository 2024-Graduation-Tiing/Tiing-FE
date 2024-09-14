import { Client } from '@stomp/stompjs'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import SockJS from 'sockjs-client'

//
//
//

// getRooms(): 사용자가 참여중인 채팅방 목록을 불러옴
export async function getRooms() {}

// createChatRoom(senderId, receiverId): 채팅방 생성 api 요청, 매개변수는 채팅 상대방의 userId
export async function createChatRoom(senderId: string, receiverId: string) {
  const token = getCookie('accessToken')

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SPRING_URL}/api/chat/room`,
      {
        senderId: senderId,
        receiverId: receiverId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return res.data.result.roomId
  } catch (err) {
    console.log('[axios] failed to create a chat room: ', err)
  }
}

// socketFactory (): 연결을 시도할 때마다 새로운 SockJS socket instace 생성
const socketFactory = () => {
  return new SockJS(`${process.env.NEXT_PUBLIC_SPRING_URL}/ws-stomp`)
}

// createClient(accessToken): STOMP client 생성
export function createClient(token: string) {
  // create STOMP client
  const client = new Client({
    webSocketFactory: socketFactory,
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    debug: (str: string) => console.log(str),
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: (frame) => console.log('Connected:', frame),
  })

  return client
}

export async function getRoomId({
  sender_id,
  receiver_id,
}: {
  sender_id: string
  receiver_id: string
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_ROUTER_URL}/chat/room?sender_id=${sender_id}&receiver_id=${receiver_id}`,
    {
      method: 'GET',
    },
  )
  if (!res.ok) {
    throw new Error('Failed to fetch chat room id')
  }
  const room = await res.json()
  return room.roomId
}
