import { db } from '@/app/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    // TODO: token 검증
    const authHeader = req.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Authorization header missing or invalid' },
        { status: 401 },
      )
    }

    // 사용자가 참여중인 채팅방 불러오기
    const rooms = await db.participants.findMany({
      where: {
        email: 'next_test_1@gmail.com', //userId
      },
    })
    return NextResponse.json(rooms, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: 'fail to fetch profile' }, { status: 500 })
  }
}
