'use client';

import { api } from '@/services/api';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { setCookie } from 'cookies-next';
import fetchUserData from '@/utils/fetchUserData';
import { redirect } from 'next/navigation';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const { data: user, mutate } = fetchUserData();

  /**
   *
   */
  const onIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  /**
   *
   */
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  /**
   *
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api
      .post('/api/auth/login', {
        id: id,
        password: password,
      })
      .then((res) => {
        setCookie('accessToken', res.headers.access_token);
        mutate();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   * 
   */
  useEffect(() => {
    redirect('/');
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center">
      <img src="/logo.svg" alt="logo" className="mb-[20px]" />
      <h3 className="mb-[28px] text-2xl font-bold">로그인</h3>
      <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
        <input
          className="mb-[16px] h-[48px] w-[382px] rounded-12 border-[1px] border-lightgray pl-[28px] text-sm outline-none"
          type="text"
          placeholder="Email"
          autoComplete="true"
          onChange={onIdChange}
        />
        <input
          className="mb-[44px] h-[48px] w-[382px] rounded-12 border-[1px] border-lightgray pl-[28px] text-sm outline-none"
          type="password"
          placeholder="Password"
          autoComplete="true"
          onChange={onPasswordChange}
        />
        <button
          className="mb-[24px] h-[48px] w-[382px] rounded-12 bg-blue font-semibold text-white"
          type="submit"
        >
          Sign In
        </button>
      </form>
      <div className="flex flex-row text-sm text-darkgray">
        <p>아직 회원이 아니신가요?</p>
        <Link href="/signup" className="font-semibold underline ml-1">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Login;
