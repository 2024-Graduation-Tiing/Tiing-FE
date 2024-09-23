import { db } from '@/app/lib/db'
import { Prisma, proposal } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

// 제안서 목록 조회
export async function GET() {
  try {
    const profile = await db.proposal.findMany({
      where: {
        scouter_id: 'enter1@email.com',
      },
    })
    return NextResponse.json(profile, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: 'fail to fetch profile' }, { status: 500 })
  }
}

// 새로운 제안서 등록
export async function POST(req: NextRequest) {
  try {
    // token 검증
    const authHeader = req.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Authorization header missing or invalid' },
        { status: 401 },
      )
    }

    // body parsing
    const body = await req.json()
    const {
      scouter_id,
      company,
      title,
      platforms,
      age_condition,
      gender_condition,
      keywords,
      description,
      image,
    } = body

    // 필드 검증
    if (!scouter_id || !company || !title || !platforms || !keywords || !description) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 })
    }

    // DB에 데이터 추가
    const newProposal = await db.proposal.create({
      data: {
        scouter_id,
        company,
        title,
        platforms,
        age_condition,
        gender_condition,
        keywords,
        description,
        image,
      },
    })
    return NextResponse.json(newProposal, { status: 201 })
  } catch (err) {
    console.error('Error creating proposal:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT() {
  try {
    const proposal = await db.proposal.update({
      where: {
        id: 1,
      },
      data: {
        image: 'https://tiing-bucket.s3.amazonaws.com/c775e27ad2cd353ace0bdf101e71610f.jpg',
      },
    })
    return NextResponse.json(proposal, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: 'fail to update user' }, { status: 500 })
  }
}
