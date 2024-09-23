import React from 'react';
import Breadcrumb from '../Breadcrumb';
import fetchUserDataServer from '@/utils/fetchUserDataServer';
import { getCookie, getCookies } from 'cookies-next';
import { cookies } from 'next/headers';

//
//
//

export default async function Layout({
  entertainer,
  scouter,
}: Readonly<{
  entertainer: React.ReactNode;
  scouter: React.ReactNode;
}>) {
  const token = getCookies({ cookies });
  const data = await fetchUserDataServer(token.accessToken as string);

  return (
    <div className="box-border pt-10 md:px-10 xl:px-52">
      <Breadcrumb userRole={data.role} />
      {data.role === 'entertainer' ? entertainer : scouter}
    </div>
  );
}
