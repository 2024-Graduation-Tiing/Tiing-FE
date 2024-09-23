import { db } from '@/app/lib/db';
import fetchUserDataServer from '@/utils/fetchUserDataServer';
import { getCookies } from 'cookies-next';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const token = getCookies({ cookies });
  const data = await fetchUserDataServer(token.accessToken as string);
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get('page') as string) || 1;
  const take = 3;
  const skip = (page - 1) * take;

  const today = new Date();

  try {
    // 1. matched가 false고 end_date가 아직 지나지 않은 것 (오름차순)
    const futureUnmatched = await db.matches.findMany({
      where: {
        entertainer_id: data.memberId,
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
            scouter_id: true,
            image: true,
            end_date: true,
            company: true,
            title: true,
          },
        },
      },
    });

    // 2. matched가 false고 end_date가 지난 것 (내림차순)
    const pastUnmatched = await db.matches.findMany({
      where: {
        entertainer_id: data.memberId,
        matched: false,
        proposal: {
          end_date: {
            lt: today,
          },
        },
      },
      orderBy: {
        proposal: {
          end_date: 'desc',
        },
      },
      include: {
        proposal: {
          select: {
            scouter_id: true,
            image: true,
            end_date: true,
            company: true,
            title: true,
          },
        },
      },
    });

    // 3. matched가 true인 것 (내림차순)
    const matched = await db.matches.findMany({
      where: {
        entertainer_id: data.memberId,
        matched: true,
      },
      orderBy: {
        proposal: {
          end_date: 'desc',
        },
      },
      include: {
        proposal: {
          select: {
            scouter_id: true,
            image: true,
            end_date: true,
            company: true,
            title: true,
          },
        },
      },
    });

    const allMatches = [...futureUnmatched, ...matched, ...pastUnmatched];

    const totalMatches = allMatches.length;
    const totalPages = Math.ceil(totalMatches / take);
    const paginatedMatches = allMatches.slice(skip, skip + take);

    // BigInt를 문자열로 변환
    const transformedMatches = paginatedMatches.map((match) => ({
      ...match,
      id: match.id.toString(), // BigInt 필드를 문자열로 변환
      proposal_id: match.proposal_id?.toString(),
    }));

    return NextResponse.json({
      matches: transformedMatches,
      currentPage: page,
      totalPages,
      hasMore: page < totalPages,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
