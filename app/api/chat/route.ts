import { db } from '@/app/lib/db';
import fetchUserData from '@/utils/fetchUserData';
import { NextRequest, NextResponse } from 'next/server';

// 사용자가 참여중인 채팅방 목록 불러오기
export async function GET() {
  try {
    // const { data } = fetchUserData();
    // console.log(data);
    const rooms = await db.chat_room.findMany({
      where: {
        OR: [
          {
            sender_id: 'lsa_test1@gmail.com',
          },
          {
            receiver_id: 'lsa_test1@gmail.com',
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
