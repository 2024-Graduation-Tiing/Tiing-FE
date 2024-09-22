import { Client } from '@stomp/stompjs';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import SockJS from 'sockjs-client';
import { getProfile } from '../user/profile/request';
import { headers } from 'next/headers';

//
//
//

type Message = {
  token: string;
  roomId: string;
  sender: string;
  receiver: string;
  message: string;
  sendingTime: string;
  isFile: boolean;
};

// getRooms(): 사용자가 참여중인 채팅방 목록을 불러옴
export async function fetchRooms() {
  try {
    const res = await fetch(`/api/chat`, {
      method: 'GET',
    });
    return res.json();
  } catch (err) {
    console.error(err);
  }
}

// createChatRoom(senderId, receiverId): 채팅방 생성 api 요청, 매개변수는 채팅 상대방의 userId
export async function createChatRoom(senderId: string, receiverId: string) {
  const token = getCookie('accessToken');

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
    );
    return res.data.result.roomId;
  } catch (err) {
    console.log('[axios] failed to create a chat room: ', err);
  }
}

// socketFactory (): 연결을 시도할 때마다 새로운 SockJS socket instace 생성
const socketFactory = () => {
  return new SockJS(`http://43.202.45.170:8080/ws-stomp`);
};

// createClient(accessToken): STOMP client 생성
export function createClient(token: string) {
  // create STOMP client
  const client = new Client({
    webSocketFactory: socketFactory,
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    debug: (str: string) => console.log('[STOMP debug]', str),
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: (frame) => console.log('[Connected]', frame),
  });

  return client;
}

export async function sendMessage(client: Client, msg: Message) {
  const newMessage = {
    roomId: msg.roomId,
    sender: msg.sender,
    receiver: msg.receiver,
    message: msg.message,
    sendingTime: 'yyyy-MM-dd HH:mm:ss',
    isFile: msg.isFile,
  };
  if (client.connected) {
    client.publish({
      destination: `/pub/chat/message`,
      body: JSON.stringify(newMessage),
      headers: { Authorization: `Bearer ${msg.token}` },
    });
    console.log('PUB Msg: ', newMessage);
  } else {
    console.log('STOMP client is not connected');
  }
}

export async function getRoom({
  entertainer_id,
  scouter_id,
}: {
  entertainer_id: string;
  scouter_id: string;
}) {
  const res = await fetch(
    `/api/chat/room?entertainer_id=${entertainer_id}&scouter_id=${scouter_id}`,
    {
      method: 'GET',
    },
  );
  if (!res.ok) {
    throw new Error('Failed to fetch chat room id');
  }
  const room = await res.json();
  return room;
}

//sendProfile()
export async function sendProfile() {
  const token = getCookie('accessToken') as string;

  const profile = await getProfile();
  console.log(profile);
  // const socketClient = createClient(token);

  // socketClient.activate();

  // try {
  //   if (socketClient.connected) {
  //     socketClient.publish({
  //       destination: `${process.env.NEXT_PUBLIC_SPRING_URL}/pub/chat/message`,
  //       body: JSON.stringify(profile),
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //   } else {
  //     console.log('STOMP client is not connected.');
  //   }
  // } catch (err) {
  //   console.error(err);
  // }
}
