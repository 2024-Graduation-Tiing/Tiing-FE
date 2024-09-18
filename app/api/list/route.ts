import { db } from '@/app/lib/db';
import fetchUserData from '@/utils/fetchUserData';
import { getCookie } from 'cookies-next';
import { NextResponse } from 'next/server';

//
//
//

export async function GET(req: Request) {
  // console.log('쿠', req.headers.get('cookie'));
  // const isAuthorized = req.headers.get('cookie') ? true : false;
  const isAuthorized = getCookie('accessToken') ? true : false;

  try {
    const profiles = await db.profile.findMany();
    const proposals = await db.proposal.findMany();

    /**
     * Serialize the proposals to ensure that the id is a string (to prevent BigInt TypeError)
     */
    const serializedProposals = proposals.map((proposal) => ({
      ...proposal,
      id: proposal.id.toString(),
    }));

    if (!isAuthorized) {
      console.log('isAuthorized', isAuthorized);
      return NextResponse.json(
        {
          profiles,
          serializedProposals,
        },
        { status: 200 },
      );
    } else {
      const { data: user } = await fetchUserData();
      console.log(user, user.role);
      if (user.role === 'scouter') {
        return NextResponse.json(
          {
            profiles,
          },
          { status: 200 },
        );
      } else if (user.role === 'entertainer') {
        return NextResponse.json(
          {
            serializedProposals,
          },
          { status: 200 },
        );
      }
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
