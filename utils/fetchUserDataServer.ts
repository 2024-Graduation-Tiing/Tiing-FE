import { authApi } from '@/app/lib/api';

//
//
//

export default async function fetchUserDataServer(accessToken: string) {
  try {
    const res = await authApi.get(
      `${process.env.NEXT_PUBLIC_SPRING_URL}/api/user/detail`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log('user data!!:', res.data.result);
    return res.data.result;
  } catch (err) {
    console.error('failed to fetch user data!:', err);
    return;
  }
};