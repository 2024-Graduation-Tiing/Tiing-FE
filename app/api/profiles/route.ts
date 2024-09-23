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
    const matchedProfiles = await db.matches.findMany({
      where: {
        proposal: {
          scouter_id: data.memberId,
        },
      },
      select: {
        entertainer_id: true,
      },
    });

    const enterIds = matchedProfiles
      .map((item) => item.entertainer_id)
      .filter((id): id is string => id !== null);

    const restProfiles = await db.profile.findMany({
      where: {
        entertainer_id: {
          notIn: enterIds,
        },
      },
      select: {
        entertainer_id: true,
        images: true,
      },
      take: 10,
    });

    return NextResponse.json(restProfiles, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: 'fail to fetch proposals' },
      { status: 500 },
    );
  }
}
