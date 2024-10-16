import { Suspense } from 'react';
import Profiles from './Profiles';
import ScrollBtn from './ScrollBtn';
import dynamic from 'next/dynamic';

//
//
//

const ProfilesClient = dynamic(() => import('./Profiles'), { ssr: false });

//
//
//

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col items-center">
        <ProfilesClient />
        <ScrollBtn />
      </div>
    </Suspense>
  );
}
