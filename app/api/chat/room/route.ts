import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';
import { createChatRoom } from '../request';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const entertainer_id = searchParams.get('entertainer_id');
  const scouter_id = searchParams.get('scouter_id');

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
      return NextResponse.json({ roomId }, { status: 201 });
    }
    return NextResponse.json({ roomId: room.room_id }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error fetching chat room' },
      { status: 500 },
    );
  }
}
