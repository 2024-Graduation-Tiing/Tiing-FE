'use client';

import fetchUserData from '@/utils/fetchUserData';
import Link from 'next/link';
import { redirect, usePathname, useRouter } from 'next/navigation';
import React from 'react';

//
//
//

type Chat = {
  params: {
    room_id: string;
    enter_name: string;
    title: string;
    content: string;
    created_date: string;
  };
};

const Chats = ({ params }: Chat) => {
  const pathname = usePathname();
  const url = `/chat/${params.room_id}`;
  const { data } = fetchUserData();
  return (
    <div className={pathname === url ? 'bg-gray-200	px-10 ' : 'mx-10'}>
      <Link href={url} replace>
        <div className="w-full py-4">
          <div className="mb-2 font-semibold leading-relaxed">
            {data.result.role === 'entertainer'
              ? params.title
              : params.enter_name}
          </div>
          <div className="truncate text-xs text-darkgray">{params.content}</div>
        </div>
      </Link>
    </div>
  );
};

export default Chats;
