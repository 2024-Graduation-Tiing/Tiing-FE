import { db } from '@/app/lib/db';

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

  return matches;
}

export async function POST(request: Request) {
  const { entertainerId, proposalId } = await request.json();

  try {
    // 제안서 조회
    const proposal = await db.proposal.findUnique({
      where: {
        id: proposalId,
      },
    });
    if (!proposal) {
      return new Response('Proposal not found', { status: 404 });
    }

    // 새로운 match 데이터 추가
    const newMatch = await db.matches.create({
      data: {
        entertainer_id: entertainerId,
        proposal_id: proposalId,
        matched: false,
      },
    });
    return new Response(JSON.stringify(newMatch), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response('Error creating match', { status: 500 });
  }
}
