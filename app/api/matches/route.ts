import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { userId, userRole } = await request.json();
  let matches;

  try {
    if (userRole === 'entertainer') {
      matches = await db.matches.findMany({
        where: {
          entertainer_id: userId,
        },
      });
    } else if (userRole === 'scouter') {
      matches = await db.matches.findMany({
        where: {
          proposal: {
            scouter_id: userId,
          },
        },
      });
    }
  } catch (err) {
    console.error(err);
  }

  return new NextResponse(JSON.stringify(matches), { status: 200 });
}

export async function PUT(req: Request) {
  try {
    const { roomId, proposalId } = await req.json();

    const matchPeople = await db.chat_room.findUnique({
      where: {
        room_id: roomId,
        proposal_id: proposalId,
      },
      select: {
        entertainer_id: true,
        proposal_id: true,
      },
    });

    if (!matchPeople) {
      return new Response('No matching chat room found', { status: 404 });
    }

    // matches 테이블에서 entertainer_id와 proposal_id로 매칭 조회 후 matched 필드를 true로 업데이트
    const targetData = await db.matches.findFirst({
      where: {
        entertainer_id: matchPeople?.entertainer_id || undefined,
        proposal_id: proposalId || null,
      },
    });

    const updateData = await db.matches.update({
      where: {
        id: targetData?.id,
      },
      data: {
        matched: true,
      },
    });

    return NextResponse.json(updateData, { status: 200 });
  } catch (err) {
    return NextResponse.json('Failed to update match', { status: 500 });
  }
}
