import { db } from '@/app/lib/db'
import { NextResponse } from 'next/server'
import { createChatRoom } from '../request'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const senderId = searchParams.get('sender_id')
  const receiverId = searchParams.get('receiver_id')

  if (!senderId || !receiverId) {
    return NextResponse.json({ message: 'sender_id and receiver_id are required' }, { status: 400 })
  }

  try {
    const room = await db.chat_room.findFirst({
      where: {
        OR: [
          {
            sender_id: senderId,
            receiver_id: receiverId,
          },
          {
            sender_id: receiverId,
            receiver_id: senderId,
          },
        ],
      },
    })
    if (!room) {
      const roomId = await createChatRoom(senderId, receiverId)
      return NextResponse.json({ roomId }, { status: 201 })
    }
    return NextResponse.json({ roomId: room.room_id }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: 'Error fetching chat room' }, { status: 500 })
  }
}
