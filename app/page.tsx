import { Suspense } from 'react';
import Profiles from './Profiles';
import ScrollBtn from './ScrollBtn';

//
//
//

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col items-center">
        <Profiles />
        <ScrollBtn />
      </div>
    </Suspense>
  );
}
