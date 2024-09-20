import axios from 'axios';
import { getCookie, getCookies } from 'cookies-next';
import { cookies } from 'next/headers';

//
//
//

export const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SPRING_URL,
  withCredentials: true,
});

authApi.interceptors.request.use(
  (config) => {
    const token = getCookie('accessToken');
    // const token = getCookies({ cookies }).accessToken;
    console.log('겟쿠키스!!:', token);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
