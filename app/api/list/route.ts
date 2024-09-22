import { authApi } from '@/app/lib/api';
import { db } from '@/app/lib/db';
import { getCookie } from 'cookies-next';
import { NextResponse } from 'next/server';
import searchParams from './searchParams';
import fetchUserDataServer from '@/utils/fetchUserDataServer';

//
//
//

type AgeRange = {
  lowerBound: number;
  upperBound: number;
};

//
//
//

export async function GET(req: Request) {
  const accessToken = getCookie('accessToken', { req });

  try {
    console.log('리퀘스트파람~:', req.url);
    const params = req.url.includes('?') ? req.url.split('?')[1] : null;
    const conditions = params ? searchParams(params) : searchParams('');
    const searchWords = params?.includes('search=')
      ? decodeURIComponent(params.split('search=')[1].split('&')[0])
      : null;
    console.log('조건:', conditions);
    console.log('검색어:', searchWords);

    const profiles = await db.profile.findMany({
      where: {
        AND: [
          // 성별 필터링 (gender 조건이 있을 경우)
          conditions.gender
            ? { entertainer: { gender: { in: conditions.gender } } }
            : {},

          // 연령대 필터링 (age 조건이 있을 경우, member 테이블의 age 필드 사용)
          conditions.age
            ? {
                AND: conditions.age.map((range: AgeRange) => ({
                  age: {
                    gte: range.lowerBound,
                    lte: range.upperBound,
                  },
                })),
              }
            : {},

          // 분야 필터링 (platforms 조건이 있을 경우)
          conditions.platforms
            ? {
                AND: Object.keys(conditions.platforms).map((platformKey) => ({
                  platforms: {
                    path: `$[${platformKey}]`, // path는 문자열로 전달되어야 함
                    equals: conditions.platforms[platformKey], // 해당 키의 값이 일치하는지 확인
                  },
                })),
              }
            : {},

          // 키워드 필터링 (keywords 조건이 있을 경우)
          conditions.keywords
            ? {
                AND: Object.keys(conditions.keywords).map((keywordKey) => ({
                  keywords: {
                    path: `$[${keywordKey}]`, // path는 문자열로 전달되어야 함
                    equals: conditions.keywords[keywordKey], // 해당 키의 값이 일치하는지 확인
                  },
                })),
              }
            : {},

          searchWords
            ? {
                name: { contains: searchWords },
              }
            : {},
        ],
      },
      include: {
        entertainer: {
          select: {
            gender: true,
          },
        },
      },
    });
    const proposals = await db.proposal.findMany({
      where: searchWords
        ? {
            OR: [
              {
                title: {
                  contains: searchWords,
                },
              },
              {
                company: {
                  contains: searchWords,
                },
              },
            ],
          }
        : {},
    });

    console.log('선택된 애들:', profiles);

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
      const user = await fetchUserDataServer(accessToken);
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
