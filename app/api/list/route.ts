import { authApi } from '@/app/lib/api';
import { db } from '@/app/lib/db';
import { getCookie } from 'cookies-next';
import { NextResponse } from 'next/server';

//
//
//

/**
 *
 */
const fetchUserData = async (accessToken: string) => {
  console.log('토큰:', accessToken);
  try {
    const res = await authApi.get(
      `${process.env.NEXT_PUBLIC_SPRING_URL}/api/user/detail`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log('user data!!:', res.data.result);
    return res.data.result;
  } catch (err) {
    console.error('failed to fetch user data!:', err);
    return;
  }
};

export async function GET(req: Request) {
  const accessToken = getCookie('accessToken', { req });

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

    if (!accessToken) {
      return NextResponse.json(
        {
          profiles,
          serializedProposals,
        },
        { status: 200 },
      );
    } else {
      const user = await fetchUserData(accessToken);
      console.log('user:', user);

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
