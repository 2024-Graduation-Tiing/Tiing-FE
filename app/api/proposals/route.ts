import { db } from '@/app/lib/db';
import { cookies } from 'next/headers';
import { getCookies } from 'cookies-next';
import fetchUserDataServer from '@/utils/FetchUserDataServer';
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

    const proposalIds = matchedProposals.map((item) => item.proposal_id);

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
