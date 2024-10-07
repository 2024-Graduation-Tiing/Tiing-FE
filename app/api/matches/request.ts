export async function turnMatch(roomId: string, proposalId: string) {
  const res = await fetch('/api/matches', {
    method: 'PUT',
    headers: {
      //   'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      roomId: roomId,
      proposalId: proposalId,
    }),
  });

  if (!res.ok) throw new Error('Failed to update match');

  return res.json();
}
