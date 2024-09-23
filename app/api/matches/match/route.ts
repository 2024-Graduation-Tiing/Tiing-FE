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
      // proposal_id: proposal_id
      proposal: {
        id: proposal_id,
      },
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
