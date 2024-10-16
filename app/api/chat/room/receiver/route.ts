import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get('room_id');
  const senderId = searchParams.get('sender_id');

  if (roomId && senderId) {
    try {
      const room = await db.chat_room.findUnique({
        where: {
          room_id: roomId,
        },
      });

      if (!room) {
        return NextResponse.json(
          { message: 'Room not found' },
          { status: 404 },
        );
      }

      let receiver;
      if (room.entertainer_id === senderId) {
        receiver = room.scouter_id;
      } else if (room.scouter_id === senderId) {
        receiver = room.entertainer_id;
      }

      if (receiver) {
        // 객체 형태로 receiver를 반환
        return NextResponse.json(
          { receiver, proposal_id: room.proposal_id },
          { status: 200 },
        );
      } else {
        return NextResponse.json(
          { message: 'Invalid sender or receiver not found' },
          { status: 404 },
        );
      }
    } catch (error) {
      console.error('Error fetching receiver:', error);
      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 },
      );
    }
  } else {
    return NextResponse.json(
      { message: 'room_id and sender_id are required' },
      { status: 400 },
    );
  }
}
