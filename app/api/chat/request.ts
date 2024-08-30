import { Client } from '@stomp/stompjs'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { headers } from 'next/headers'
import SockJS from 'sockjs-client'

//
//
//

// getRooms(): 사용자가 참여중인 채팅방 목록을 불러옴
export async function getRooms() {}

// createChatRoom(userId): 채팅방 생성 api 요청, 매개변수는 채팅 상대방의 userId
export async function createChatRoom() {
  const token = getCookie('accessToken')

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SPRING_URL}/api/chat/room`,
      {
        participant: userId,
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

// subscribeCallback(message): client가 서버로부터 STOMP 메시지를 받았을 때 호출
// export function subscribeCallback(message: any) {
//   if (message.body) {
//   }
// }

// export function subscribeRoom(client: Client, roomId: string) {
//   const destination = `${baseURL}/sub/chat/room/${roomId}`
//   client.subscribe(destination, subscribeCallback)
// }
