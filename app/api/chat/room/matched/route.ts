import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get('roomId');

  if (roomId) {
    try {
      const participants = await db.chat_room.findUnique({
        where: {
          room_id: roomId,
        },
        select: {
          entertainer_id: true,
          proposal_id: true,
        },
      });

      if (participants) {
        // 매칭 상태, 회사명 조회
        const isMatched = await db.matches.findFirst({
          where: {
            entertainer_id: participants.entertainer_id,
            proposal_id: participants.proposal_id,
          },
          select: {
            matched: true,
            proposal: {
              select: {
                company: true,
              },
            },
          },
        });

        // entertainer_id로 프로필 조회
        const profile = await db.profile.findUnique({
          where: {
            entertainer_id: participants.entertainer_id as string,
          },
          select: {
            name: true, // name 필드 선택
          },
        });
        return NextResponse.json(
          { isMatched, name: profile?.name },
          { status: 200 },
        );
      } else {
        return NextResponse.json(
          { message: 'Room not found' },
          { status: 404 },
        );
      }
    } catch (err) {
      console.error('Error fetching participants:', err);
      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 },
      );
    }
  } else {
    return NextResponse.json(
      { message: 'room_id is required' },
      { status: 400 },
    );
  }
}
