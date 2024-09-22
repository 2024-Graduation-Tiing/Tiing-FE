export async function fetchTopKeywords() {
  const res = await fetch(`/api/matches/rate`, {
    method: 'GET',
  });

  const data = await res.json();
  return data;
}
