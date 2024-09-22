import { db } from '@/app/lib/db';
import fetchUserDataServer from '@/utils/fetchUserDataServer';
import { getCookies } from 'cookies-next';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const token = getCookies({ cookies });
  const data = await fetchUserDataServer(token.accessToken as string);
  try {
    const matched = await db.matches.findMany({
      where: {
        entertainer_id: data.memberId,
        matched: true,
      },
      include: {
        proposal: {
          select: {
            keywords: true,
          },
        },
      },
    });

    const keywordCount: Record<string, number> = {};
    matched.forEach((item) => {
      const keywords = item.proposal.keywords as Record<string, string>;
      Object.values(keywords).forEach((keyword) => {
        keywordCount[keyword] = (keywordCount[keyword] || 0) + 1;
      });
    });

    // 내림차순으로 키워드 정렬
    const sortedKeywords = Object.entries(keywordCount).sort(
      (a, b) => b[1] - a[1],
    );

    // sortedKeywords 배열의 길이가 3 이하인 경우 전체를 반환
    if (sortedKeywords.length <= 3) {
      return NextResponse.json({
        keywordCounts: sortedKeywords.map(([keyword, count]) => ({
          id: keyword,
          count,
        })),
      });
    }

    // 3번째 상위 키워드 count수
    const countOfThird = sortedKeywords[2][1];

    // 3번재 상위 키워드와 동률인 모든 키워드를 포함한 배열
    const topKeywords = sortedKeywords.filter(
      ([, count]) => count >= countOfThird,
    );

    return NextResponse.json(
      {
        topKeywords: topKeywords.map(([keyword, count]) => ({
          id: keyword,
          count,
        })),
      },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
