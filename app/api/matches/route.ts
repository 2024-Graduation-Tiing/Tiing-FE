import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { userId, userRole } = await request.json();
  let matches;

  try {
    if (userRole === 'entertainer') {
      matches = await db.matches.findMany({
        where: {
          entertainer_id: userId,
        },
      });
    } else if (userRole === 'scouter') {
      matches = await db.matches.findMany({
        where: {
          proposal: {
            scouter_id: userId,
          },
        },
      });
    }
  } catch (err) {
    console.error(err);
  }

  return new NextResponse(JSON.stringify(matches), { status: 200 });
}
