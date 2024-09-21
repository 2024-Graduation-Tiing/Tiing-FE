import { db } from '@/app/lib/db';
import fetchUserDataServer from '@/utils/FetchUserDataServer';
import { getCookie } from 'cookies-next';
import { NextRequest, NextResponse } from 'next/server';

// 사용자가 참여중인 채팅방 목록 불러오기
export async function GET() {
  try {
    const token = getCookie('accessToken') as string;
    const data = await fetchUserDataServer(token);
    const rooms = await db.chat_room.findMany({
      where: {
        OR: [
          {
            sender_id: data.memberId,
          },
          {
            receiver_id: data.memberId,
          },
        ],
      },
      select: {
        room_id: true,
      },
    });
    return NextResponse.json(rooms, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: 'fail to fetch chat rooms' },
      { status: 500 },
    );
  }
}
