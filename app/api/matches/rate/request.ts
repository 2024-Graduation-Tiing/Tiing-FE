export async function fetchTopKeywords() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_ROUTER_URL}/matches/rate`,
    {
      method: 'GET',
    },
  );

  const data = await res.json();
  return data;
}
