'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import ChatFooter from './ChatFooter';
import { createClient } from '@/app/api/chat/request';
import Bubble from './Bubble';
import Image from 'next/image';
import { getCookie } from 'cookies-next';
import fetchUserData from '@/utils/fetchUserData';

//
//
//

type Props = {
  params: {
    roomId: string;
  };
};

type Message = {
  roomId?: string;
  sender: string;
  message: string;
  sendingTime: string;
  isFile: boolean;
};

//
//
//

export default function Page({ params }: Props) {
  const token = getCookie('accessToken') as string;
  const { data } = fetchUserData();
  const client = createClient(token);

  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = (content: string | File) => {
    const newMessage = {
      roomId: params.roomId,
      sender: data.memberId,
      message: '',
      sendingTime: 'yyyy-MM-dd HH:mm:ss',
      isFile: false,
    };

    if (client.connected) {
      // 연결이 완료되었는지 확인
      if (typeof content === 'string') {
        // content가 문자열인 경우
        newMessage.message = content;
        client.publish({
          destination: `${process.env.NEXT_PUBLIC_SPRING_URL}/pub/chat/message`,
          body: JSON.stringify(newMessage),
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (content instanceof File) {
        // content가 이미지 파일인 경우
        const filereader = new FileReader();
        filereader.onloadend = () => {
          // 파일을 읽고난 후 실행
          const byteArray = filereader.result as ArrayBuffer; // 파일을 바이트 배열로 변환
          const byteArrayString = Array.from(new Uint8Array(byteArray)); // Uint8Array로 변환 후 일반 자바스크립트 배열로 변환
          newMessage.message = JSON.stringify(byteArrayString);
          newMessage.isFile = true;
          client.publish({
            destination: `${process.env.NEXT_PUBLIC_SPRING_URL}/pub/chat/message`,
            body: JSON.stringify(newMessage),
            headers: { Authorization: `Bearer ${token}` },
          });
        };

        // 파일을 바이트 배열로 읽음
        filereader.readAsArrayBuffer(content);
      }
    } else {
      console.log('STOMP client is not connected.');
    }
  };

  // connect web socket
  useEffect(() => {
    client.activate();

    client.onConnect = () => {
      const subscribe = client.subscribe(
        `${process.env.NEXT_PUBLIC_SPRING_URL}/sub/chat/room/${params.roomId}`,
        (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        },
      );

      return () => {
        if (client !== null) {
          subscribe.unsubscribe();
          client.deactivate();
        }
      };
    };

    return () => {
      if (client && client.connected) {
        client.deactivate();
      }
    };
  }, [params.roomId]);

  return (
    <div className="col-start-2 col-end-5 flex h-full flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-4">
        {messages.map((message, idx) => (
          <Bubble
            key={idx}
            message={message}
            isMine={message.sender === data.memberId}
          />
        ))}
      </div>

      <ChatFooter sendMessage={sendMessage} />
    </div>
  );
}
