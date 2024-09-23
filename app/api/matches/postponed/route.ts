import { db } from '@/app/lib/db';
import fetchUserDataServer from '@/utils/fetchUserDataServer';
import { getCookies } from 'cookies-next';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

//
//
//

export async function GET() {
  const token = getCookies({ cookies });
  const data = await fetchUserDataServer(token.accessToken as string);
  const today = new Date();

  try {
    // matched가 false고 end_date가 아직 지나지 않은 것 (오름차순)
    const list = await db.matches.findMany({
      where: {
        OR: [
          { entertainer_id: data.memberId },
          {
            proposal: {
              scouter_id: data.memberId,
            },
          },
        ],
        matched: false,
        proposal: {
          end_date: {
            gt: today,
          },
        },
      },
      orderBy: {
        proposal: {
          end_date: 'asc',
        },
      },
      include: {
        proposal: {
          select: {
            id: true,
            scouter_id: true,
            title: true,
          },
        },
      },
    });

    // 아직 채팅방이 생성되지 않은 matches list
    const filteredList = [];
    for (const item of list) {
      const chatRoom = await db.chat_room.findFirst({
        where: {
          entertainer_id: item.entertainer_id,
          scouter_id: item.proposal.scouter_id,
        },
      });

      if (!chatRoom) {
        filteredList.push({
          id: item.proposal?.id,
          title: item.proposal.title,
          scouterId: item.proposal.scouter_id,
        });
      } else console.log(chatRoom);
    }
    return NextResponse.json(filteredList, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: 'fail to fetch postponed proposal list' },
      { status: 500 },
    );
  }
}
