import { db } from '@/app/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const memberId = 'lsa_test1@gmail.com'
  const page = parseInt(req.query.page as string) || 1
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

    res.status(200).json({
      matches,
      currentPage: page,
      totalPages,
      hasMore: page < totalPages,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
