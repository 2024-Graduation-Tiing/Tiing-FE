import axios from 'axios';
import { getCookie } from 'cookies-next';

//
//
//

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SPRING_URL,
  withCredentials: true,
})

export const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SPRING_URL,
  headers: {
    'Authorization': `Bearer ${getCookie('accessToken')}`,
    withCredentials: true,
  }
})