export async function turnMatch(roomId: string) {
  const res = await fetch('/api/matches/match', {
    method: 'PUT',
    headers: {
      //   'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      roomId: roomId,
    }),
  });

  if (!res.ok) throw new Error('Failed to update match');

  return res.json();
}
