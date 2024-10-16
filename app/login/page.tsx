import Login from '@/app/Login';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="py-[100px]">
        <Login />
      </div>
    </Suspense>
  );
}
