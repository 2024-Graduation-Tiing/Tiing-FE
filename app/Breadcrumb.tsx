'use client';

import React from 'react';
import { Breadcrumbs, Link } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { usePathname } from 'next/navigation';

//
//
//

interface BreadcrumbProps {
  userRole: string;
}

//
//
//

const changeKR = (segment: string, userRole: string) => {
  // changeKR(): 경로에 따라 한국어 맵핑
  switch (segment) {
    case '':
      return '홈';
    case 'mypage':
      return '마이페이지';
    case 'edit':
      if (userRole === 'entertainer') return '프로필 편집';
      else return '제안서 편집';
    case 'profile':
      return '프로필 상세';
    case 'proposal':
      return '제안 상세';
    default:
      return;
  }
};

const Breadcrumb = ({ userRole }: BreadcrumbProps) => {
  const path = usePathname();
  const segments: readonly string[] = path.split('/');

  return (
    <>
      <div className="mb-3 text-2xl font-semibold">
        {changeKR(segments[segments.length - 1], userRole)}
      </div>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        className="mb-9"
      >
        {segments.map((segment, idx) => (
          <Link
            key={idx}
            underline="hover"
            color="inherit"
            href={idx === 0 ? '/' : `/${segments.slice(1, idx + 1).join('/')}`}
          >
            {changeKR(segment, userRole)}
          </Link>
        ))}
      </Breadcrumbs>
    </>
  );
};

export default Breadcrumb;
export { changeKR };
