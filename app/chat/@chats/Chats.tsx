'use client';

import Link from 'next/link';
import { redirect, usePathname, useRouter } from 'next/navigation';
import React from 'react';

//
//
//

type Chat = {
  params: {
    room_id: string;
    title: string;
    content: string;
    created_date: string;
  };
};

const Chats = ({ params }: Chat) => {
  const pathname = usePathname();
  const url = `/chat/${params.room_id}`;
  return (
    <div className={pathname === url ? 'bg-gray-200	px-10 ' : 'mx-10'}>
      <Link href={url} replace>
        <div className="w-full py-4">
          <div className="mb-2 font-semibold leading-relaxed">
            {params.title}
          </div>
          <div className="truncate text-xs text-darkgray">{params.content}</div>
        </div>
      </Link>
    </div>
  );
};

export default Chats;
