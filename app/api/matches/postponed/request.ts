export async function fetchPostponed() {
  const res = await fetch(`/api/matches/postponed`, {
    method: 'GET',
  });

  return res.json();
}
