import { authApi } from '@/app/lib/api';
import { getCookie } from 'cookies-next';

//
//
//

export const fetcher = (url: string) => {
  const accessToken = getCookie('accessToken');
  if (accessToken) {
    authApi.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  
  return authApi.get(url).then((res) => res.data);
}
