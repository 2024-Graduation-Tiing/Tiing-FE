import { proposal } from '@prisma/client';
import { cookies } from 'next/headers';
import { getCookies } from 'cookies-next';
import fetchUserDataServer from '@/utils/FetchUserDataServer';

// const url = '/api/user/profile';
export async function getProfile() {
  // const token = getCookies({ cookies });
  // const data = await fetchUserDataServer(token.accessToken as string);
  const url = `/api/user/profile`;
  const res = await fetch(url, {
    method: 'GET',
  });

  return res.json();
}

// export async function createProfile(params: proposal) {
//   const res = await fetch(url, {
//     method: 'POST',
//     // headers: headers,
//     // body: params,
//   });
// }
