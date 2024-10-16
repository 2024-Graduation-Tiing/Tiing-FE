import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const entertainer_id = searchParams.get('entertainerId');
  const proposal_id = parseInt(searchParams.get('proposalId') as string);

  if (!entertainer_id || !proposal_id)
    return NextResponse.json(
      {
        message: 'entertainerId, proposalId is required',
      },
      { status: 400 },
    );

  const match = await db.matches.findFirst({
    where: {
      entertainer_id: entertainer_id,
      proposal_id: proposal_id,
    },
    select: {
      id: true,
      matched: true,
      entertainer_id: true,
      proposal: true,
    },
  });

  if (!match)
    return NextResponse.json({ message: 'no founded data' }, { status: 500 });

  const enter = await db.profile.findUnique({
    where: {
      entertainer_id: entertainer_id,
    },
    select: {
      entertainer_id: true,
      name: true,
      images: true,
    },
  });

  if (!enter)
    return NextResponse.json({ message: 'no founded data' }, { status: 500 });

  const res = {
    match_id: match.id,
    isMatched: match.matched,
    enter: enter,
    proposal: match.proposal,
  };

  return NextResponse.json(res, {
    status: 200,
  });
}

export async function PUT(req: Request) {
  try {
    const { roomId } = await req.json();

    const matchPeople = await db.chat_room.findUnique({
      where: {
        room_id: roomId,
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
        proposal_id: matchPeople?.proposal_id || null,
      },
    });

    if (targetData) {
      const updateData = await db.matches.update({
        where: {
          id: targetData.id,
        },
        data: {
          matched: true,
        },
      });

      return NextResponse.json(updateData, { status: 200 });
    } else {
      return NextResponse.json('Failed to update match', { status: 500 });
    }
  } catch (err) {
    return NextResponse.json('Failed to update match', { status: 500 });
  }
}
