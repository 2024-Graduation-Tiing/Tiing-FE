'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import ChatFooter from './ChatFooter';
import { createClient, sendMessage } from '@/app/api/chat/request';
import Bubble from './Bubble';
import Image from 'next/image';
import { getCookie } from 'cookies-next';
import fetchUserData from '@/utils/fetchUserData';
import { Client, StompSubscription } from '@stomp/stompjs';

//
//
//

type Props = {
  params: {
    roomId: string;
  };
};

type Message = {
  token: string;
  roomId: string;
  sender: string;
  receiver: string;
  message: string;
  sendingTime: string;
  isFile: boolean;
};

//
//
//

const getReceiver = async (roomId, senderId) => {
  try {
    const res = await fetch(
      `/api/chat/room/receiver?room_id=${roomId}&sender_id=${senderId}`,
      {
        method: 'GET',
      },
    );
    return res.json();
  } catch (err) {
    console.error(err);
  }
};

export default function Page({ params }: Props) {
  const token = getCookie('accessToken') as string;
  const { data } = fetchUserData();

  const [client, setClient] = useState<Client | null>(null);
  const [receiver, setReceiver] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // const receiver = sessionStorage.getItem('receiver');
    // if (receiver) {
    //   setReceiver(JSON.parse(receiver));
    // } else {

    // }
    const fetchReceiver = async () => {
      if (data?.result?.memberId) {
        try {
          const receiverData = await getReceiver(
            params.roomId,
            data.result.memberId,
          );
          if (receiverData) {
            setReceiver(receiverData.receiver); // receiverData에 따라 맞춰서 설정
          }
        } catch (error) {
          console.error('Failed to fetch receiver', error);
        }
      }
    };

    fetchReceiver();
  }, [params.roomId, data]);

  // connect web socket
  useEffect(() => {
    const client = createClient(token);
    setClient(client);

    let subscribe: StompSubscription;

    if (!client.active) {
      client.activate();
    }

    client.onConnect = () => {
      subscribe = client.subscribe(
        `/sub/chat/room/${params.roomId}`,
        (message) => {
          try {
            const newMessage = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            console.log('MESSAGES:', messages);
          } catch (err) {
            console.error(err);
          }
        },
      );

      client.onStompError = (error) => {
        console.error('STOMP error:', error);
      };

      client.onDisconnect = () => {
        console.log('STOMP client disconnected');
      };

      client.activate();
    };

    return () => {
      if (subscribe) subscribe.unsubscribe;
      if (client && client.active) {
        client.deactivate();
      }
    };
  }, [params.roomId, token]);

  const handlePublishMessage = async (content: string | File) => {
    if (!client || !client.connected) {
      console.log('STOMP client is not connected.');
      return;
    }

    const sender = data.result.memberId;
    const roomId = params.roomId;

    let newMessage: Message;
    if (typeof content === 'string') {
      // 텍스트 메시지
      newMessage = {
        token: token,
        roomId: roomId,
        sender: sender,
        receiver: receiver,
        message: content,
        sendingTime: 'yyyy-MM-dd HH:mm:ss',
        isFile: false,
      };
      sendMessage(client, newMessage);
      // setMessages((prev) => [...prev, newMessage]);
    } else {
      // 파일 처리
      const reader = new FileReader();

      reader.onloadend = () => {
        // 파일을 Base64로 인코딩하여 전송
        const base64File = reader.result as string;

        newMessage = {
          token: token,
          roomId: roomId,
          sender: sender,
          receiver: receiver,
          message: base64File, // Base64로 인코딩된 파일 데이터
          sendingTime: 'yyyy-MM-dd HH:mm:ss',
          isFile: true,
        };

        sendMessage(client, newMessage);
        // setMessages((prev) => [...prev, newMessage]);
      };

      reader.readAsDataURL(content);
    }
  };

  return (
    <div className="col-start-2 col-end-5 flex h-full flex-col overflow-hidden">
      <div className="flex flex-col flex-1 overflow-y-auto px-4">
        {messages.map((message, idx) => (
          <Bubble
            key={idx}
            message={message}
            isMine={message.sender === data.result.memberId}
          />
        ))}
      </div>
      <ChatFooter sendMessage={handlePublishMessage} />
    </div>
  );
}
