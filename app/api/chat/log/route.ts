import { db } from '@/app/lib/db';
import fetchUserDataServer from '@/utils/FetchUserDataServer';
import { getCookie, getCookies } from 'cookies-next';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get('roomId');
  const senderId = searchParams.get('senderId');

  //   const token = getCookie('accessToken') as string;

  if (!roomId || !senderId)
    return NextResponse.json(
      { message: 'room_id and senderId is required' },
      { status: 400 },
    );

  try {
    const chatRoom = await db.chat_room.findUnique({
      where: {
        room_id: roomId,
        OR: [{ entertainer_id: senderId }, { scouter_id: senderId }],
      },
      select: {
        entertainer_id: true,
        scouter_id: true,
        chat_table: true,
      },
    });

    if (!chatRoom) {
      return NextResponse.json(
        { message: 'not founded chat room' },
        { status: 400 },
      );
    }

    if (chatRoom.chat_table.length === 0) {
      let firstMessage;
      if (senderId === chatRoom.entertainer_id) {
        const profile = await db.profile.findUnique({
          where: {
            entertainer_id: senderId,
          },
        });
        firstMessage = profile;
        const res = {
          firstMessage: firstMessage,
          isEmpty: true,
        };
        return NextResponse.json(res, { status: 200 });
      }
      // else {
      // TODO: 제안서 가져오기
      //     const proposal=await db.matches.findUnique({
      //         where: {
      //             entertainer_id: chatRoom.entertainer_id,
      //             proposal: {
      //                 // proposal_id는 어떻게 가져오지?????
      //                 scouter_id: chatRoom.scouter_id
      //             }
      //         }
      //     })
      // }
    }

    // chat_table의 sending_time을 문자열로 변환하여 반환
    const formattedChatTable = chatRoom.chat_table.map((message) => ({
      ...message,
      sending_time: message.sending_time
        ? message.sending_time.toISOString()
        : null,
    }));

    return NextResponse.json(formattedChatTable, {
      status: 200,
    });
  } catch (err) {
    NextResponse.json({});
  }
}
