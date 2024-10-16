import { db } from '@/app/lib/db';
import fetchUserDataServer from '@/utils/fetchUserDataServer';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getCookies } from 'cookies-next';

//
//
//

export async function GET(req: Request) {
  const token = getCookies({ cookies });
  const data = await fetchUserDataServer(token.accessToken as string);
  // const { searchParams } = new URL(req.url); // 쿼리 파라미터 추출
  // const memberId = searchParams.get('memberId') as string;
  try {
    const profile = await db.profile.findUnique({
      where: {
        entertainer_id: data.memberId,
      },
    });
    const gender = await db.member.findUnique({
      where: {
        member_id: data.memberId,
      },
      select: {
        gender: true,
      },
    });

    const responseData = {
      ...profile,
      gender: gender?.gender, // gender가 존재하는 경우에만 포함
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: 'fail to fetch profile' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  try {
    // TODO: 이미지 S3 저장하고 S3 URL 받아오기

    const newProfile = await db.profile.create({
      data: {
        entertainer_id: body.entertainer_id,
        name: body.name,
        platforms: body.platforms,
        age: body.age,
        height: body.height,
        weight: body.weight,
        keywords: body.keywords,
        description: body.description,
        images: body.images.map((image: File) => image.name), // (image name array)
        videos: body.videos,
        career: body.career,
        entertainer: {
          connect: { member_id: body.entertainer_id },
        },
      },
    });

    return NextResponse.json(newProfile, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: 'fail to update profile' },
      { status: 500 },
    );
  }
}
