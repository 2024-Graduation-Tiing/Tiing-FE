import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';
import { createChatRoom } from '../request';
import { getCookies } from 'cookies-next';
import { cookies } from 'next/headers';
import fetchUserDataServer from '@/utils/fetchUserDataServer';

// 특정 채팅방의 roomId와 receiver를 반환
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const entertainer_id = searchParams.get('entertainer_id');
  const scouter_id = searchParams.get('scouter_id');

  const token = getCookies({ cookies });
  const data = await fetchUserDataServer(token.accessToken as string);

  if (!entertainer_id || !scouter_id) {
    return NextResponse.json(
      { message: 'entertainer_id and scouter_id are required' },
      { status: 400 },
    );
  }

  try {
    const room = await db.chat_room.findFirst({
      where: {
        entertainer_id: entertainer_id,
        scouter_id: scouter_id,
      },
    });
    if (!room) {
      // entertainer가 보내는 요청이라 senderId가 ententertainer_id
      const roomId = await createChatRoom(entertainer_id, scouter_id);
      if (data.role === 'entertainer') {
        return NextResponse.json(
          { roomId: roomId, receiver: scouter_id },
          { status: 201 },
        );
      } else
        return NextResponse.json(
          { roomId: roomId, receiver: entertainer_id },
          { status: 201 },
        );
    }

    if (data.role === 'entertainer') {
      return NextResponse.json(
        { roomId: room.room_id, receiver: scouter_id },
        { status: 201 },
      );
    } else
      return NextResponse.json(
        { roomId: room.room_id, receiver: entertainer_id },
        { status: 201 },
      );
  } catch (err) {
    return NextResponse.json(
      { message: 'Error fetching chat room' },
      { status: 500 },
    );
  }
}
