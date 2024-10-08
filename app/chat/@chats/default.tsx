'use client';

import { fetchRooms } from '@/app/api/chat/request';
import Chats from './Chats';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

//
//
//

export default function SidebarPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['chatRooms'],
    queryFn: fetchRooms,
  });

  if (error) {
    return <>{error}</>;
  }

  if (isLoading) return <>Loading...</>;

  if (data) {
    return (
      <section className="mt-8 flex flex-1 flex-col overflow-hidden ">
        <div className="mb-3 px-7 text-2xl font-semibold">Chats</div>
        <div className="w-full flex-1 divide-y overflow-y-auto">
          {data.map(
            (item: {
              room_id: string;
              enter_name: string;
              title: string;
              content: string;
              created_date: Date;
            }) => (
              <Chats params={item} key={item.room_id} />
            ),
          )}
        </div>
      </section>
    );
  }
}
