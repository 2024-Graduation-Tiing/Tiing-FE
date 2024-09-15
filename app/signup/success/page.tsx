'use client'

import React from 'react'
import Link from 'next/link';

//
//
//

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen overflow-hidden box-border' style={{ height: 'calc(100vh - 5rem)' }}>
      <h2 className='text-2xl font-bold mb-5'>회원가입이 완료되었습니다.</h2>
      <div className='flex flex-row items-center gap-4'>
        <Link href='/' className='btn-default text-blue bg-lightblue'>홈으로 가기</Link>
        <Link href='/login' className='btn-default'>로그인 하러 가기</Link>
      </div>
    </div>
  );
};

//
//
//

export default page;