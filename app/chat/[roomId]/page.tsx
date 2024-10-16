'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import ChatFooter from './ChatFooter';
import {
  createClient,
  getPrevMessages,
  getReceiver,
  sendMessage,
} from '@/app/api/chat/request';
import Bubble from './Bubble';
import { getCookie } from 'cookies-next';
import fetchUserData from '@/utils/fetchUserData';
import { Client, StompSubscription } from '@stomp/stompjs';

//
//
//

type Props = {
  params: {
    roomId: string;
    proposalId: string;
  };
};

type Message = {
  token: string;
  roomId: string;
  sender: string;
  receiver: string;
  message: string;
  sendingTime: string;
  isFile?: boolean;
};

//
//
//

export default function Page({ params }: Props) {
  const token = getCookie('accessToken') as string;
  const { data } = fetchUserData();

  const [client, setClient] = useState<Client | null>(null);
  const [receiver, setReceiver] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const [isMatched, setIsMatched] = useState(false);
  const [company, setCompany] = useState('');
  const [entertainer, setEntertainer] = useState('');
  // receiver 설정
  useEffect(() => {
    const fetchReceiver = async () => {
      if (data?.result?.memberId) {
        try {
          const receiverData = await getReceiver(
            params.roomId,
            data.result.memberId,
          );
          if (receiverData) {
            setReceiver(receiverData.receiver); // receiverData에 따라 맞춰서 설정

            const res = await fetch(
              `/api/chat/room/matched?roomId=${params.roomId}`,
            );
            const data = await res.json();
            setIsMatched(data.isMatched.matched);
            setCompany(data.isMatched.proposal.company);
            setEntertainer(data.name);
            console.log(data);
          }
        } catch (error) {
          console.error('Failed to fetch receiver', error);
        }
      }
    };

    if (data?.isSuccess && data?.result) fetchReceiver();
  }, [params.roomId, data]);

  // connect web socket
  useEffect(() => {
    if (data?.result) {
      // stomp client 생성
      const client = createClient(token);
      setClient(client);

      let subscribe: StompSubscription;

      if (!client.active) {
        client.activate();
      }

      client.onConnect = () => {
        fetchPrevMessages().then((content) => {
          if (content) {
            const msg = {
              token: token,
              roomId: params.roomId,
              sender: data.result.memberId,
              receiver: content.receiver,
              message: JSON.stringify(content.firstMessage),
              sendingTime: 'yyyy-MM-dd HH:mm:ss',
              isFile: false,
            };
            client.publish({
              destination: `/pub/chat/message`,
              body: JSON.stringify(msg),
              headers: { Authorization: `Bearer ${token}` },
            });
            console.log('SEND FIRST MESSAGE:', msg);
          }
        });

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
    }
  }, [params.roomId, token, data?.result]);

  const handlePublishMessage = async (content: string) => {
    if (!client || !client.connected) {
      console.log('STOMP client is not connected.');
      return;
    }

    const sender = data.result.memberId;
    const roomId = params.roomId;

    const newMessage: Message = {
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
  };

  const fetchPrevMessages = async () => {
    try {
      const prevMessages = await getPrevMessages(
        params.roomId,
        data?.result?.memberId,
      );
      if (prevMessages.isEmpty) {
        // 이전 메시지가 아무것도 없을 때 프로필/제인서 전송

        return prevMessages;
      } else {
        prevMessages.map(
          (msg: {
            sending_time: string;
            id: number;
            message: string;
            room_id: number;
            receiver_id: string;
            sender_id: string;
          }) => {
            const message: Message = {
              token: token,
              roomId: params.roomId,
              sender: msg.sender_id,
              receiver: msg.receiver_id,
              message: msg.message,
              sendingTime: msg.sending_time,
            };
            setMessages((prev) => [...prev, message]);
          },
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="col-start-2 col-end-5 flex h-full flex-col overflow-hidden">
      {isMatched && (
        <div className="mx-5 mt-2 rounded-lg text-blue p-4 text-center text-base bg-skyblue shadow-md font-semibold z-20">
          {entertainer}님과 {company}님이 매칭됐어요!
        </div>
      )}
      <div className="flex flex-col flex-1 overflow-y-auto px-4">
        {/* <div className="fixed pt-6 pl-4 font-semibold"></div> */}
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
