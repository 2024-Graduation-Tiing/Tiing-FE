import { db } from '@/app/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const memberId = 'lsa_test1@gmail.com'
  const { searchParams } = new URL(req.url)

  const page = parseInt(searchParams.get('page') as string) || 1
  const take = 3
  const skip = (page - 1) * take

  try {
    const matches = await db.matches.findMany({
      where: {
        entertainer_id: memberId,
      },
      skip: skip,
      take: take,
      include: {
        proposal: {
          select: {
            image: true,
            end_date: true,
            company: true,
            title: true,
          },
        },
      },
    })

    const totalMatches = await db.matches.count({
      where: {
        entertainer_id: memberId,
      },
    })
    const totalPages = Math.ceil(totalMatches / take)

    // BigInt를 문자열로 변환
    const transformedMatches = matches.map((match) => ({
      ...match,
      id: match.id.toString(), // BigInt 필드를 문자열로 변환
      proposal_id: match.proposal_id.toString(),
    }))

    return NextResponse.json({
      matches: transformedMatches,
      currentPage: page,
      totalPages,
      hasMore: page < totalPages,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
