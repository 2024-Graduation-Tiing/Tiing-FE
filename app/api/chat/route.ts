import { db } from '@/app/lib/db';
import fetchUserDataServer from '@/utils/FetchUserDataServer';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getCookies } from 'cookies-next';

//
//
//

// 사용자가 참여중인 채팅방 목록
export async function GET() {
  try {
    const token = getCookies({ cookies });
    const data = await fetchUserDataServer(token.accessToken as string);
    const rooms = await db.chat_room.findMany({
      where: {
        OR: [
          {
            sender_id: data.memberId,
          },
          {
            receiver_id: data.memberId,
          },
        ],
      },
      select: {
        room_id: true,
        sender_id: true,
        receiver_id: true,
        chat_table: {
          orderBy: {
            created_date: 'desc', // created_date 기준으로 내림차순 정렬
          },
          take: 1,
          select: {
            content: true,
            created_date: true,
          },
        },
      },
    });

    // 각 room의 sender_id 또는 receiver_id로 matches 테이블을 조회하고 proposal의 title을 가져옴
    const results = await Promise.all(
      rooms.map(async (room) => {
        const match = await db.matches.findFirst({
          where: {
            OR: [
              { entertainer_id: room.sender_id },
              { entertainer_id: room.receiver_id },
            ],
          },
          select: {
            proposal: {
              select: {
                title: true,
              },
            },
          },
        });

        return {
          room_id: room.room_id,
          title: match?.proposal.title,
          content: room.chat_table[0]?.content || 'No content',
          created_date: room.chat_table[0]?.created_date || new Date(0),
        };
      }),
    );

    // create_date를 기준으로 내림차순 정렬
    const sortedResults = results.sort((a, b) => {
      return (
        new Date(b.created_date).getTime() - new Date(a.created_date).getTime()
      );
    });

    return NextResponse.json(sortedResults, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: 'fail to fetch chat rooms' },
      { status: 500 },
    );
  }
}
