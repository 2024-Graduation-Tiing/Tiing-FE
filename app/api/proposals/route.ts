import { db } from '@/app/lib/db';
import { cookies } from 'next/headers';
import { getCookies } from 'cookies-next';
import fetchUserDataServer from '@/utils/fetchUserDataServer';
import { NextResponse } from 'next/server';

//
//
//

export async function GET() {
  const token = getCookies({ cookies });
  const data = await fetchUserDataServer(token.accessToken as string);

  try {
    const matchedProposals = await db.matches.findMany({
      where: {
        entertainer_id: data.memberId,
      },
      select: {
        proposal_id: true,
      },
    });

    // proposal_id에서 null 값을 제거
    const proposalIds = matchedProposals
      .map((item) => item.proposal_id)
      .filter((id): id is number => id !== null);

    const restProposals = await db.proposal.findMany({
      where: {
        id: {
          notIn: proposalIds,
        },
      },
      select: {
        id: true,
        image: true,
      },
      take: 10,
    });

    return NextResponse.json(restProposals, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: 'fail to fetch proposals' },
      { status: 500 },
    );
  }
}
