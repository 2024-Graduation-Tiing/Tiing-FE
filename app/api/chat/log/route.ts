import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get('roomId');
  const senderId = searchParams.get('senderId');

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
        proposal_id: true,
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
          receiver: chatRoom.scouter_id,
        };
        return NextResponse.json(res, { status: 200 });
      } else if (senderId === chatRoom.scouter_id) {
        const proposal = await db.chat_room.findFirst({
          where: {
            scouter_id: senderId,
            entertainer_id: chatRoom.entertainer_id,
            proposal_id: chatRoom.proposal_id,
          },
        });
        firstMessage = proposal;
        const res = {
          firstMessage: firstMessage,
          isEmpty: true,
          receiver: chatRoom.entertainer_id,
        };
        return NextResponse.json(res, { status: 200 });
      }
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
  } catch (err: any) {
    NextResponse.json(
      { message: 'Internal server error', error: err.message },
      { status: 500 },
    );
  }
}
