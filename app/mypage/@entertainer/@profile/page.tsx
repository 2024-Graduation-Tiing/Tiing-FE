'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { FormControlLabel, Switch } from '@mui/material';
import Rate from './Rate';
import ProfileImage from '@/app/ProfileImage';
import fetchUserData from '@/utils/fetchUserData';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/app/api/user/profile/request';
import { updateMatch } from '@/app/api/user/request';

//
//
//

export default function Profile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { data, error, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  if (isLoading) {
    return <></>;
  }

  if (error) {
    return <></>;
  }

  // useEffect(() => {
  //   if (containerRef.current && imageRef.current) {
  //     containerRef.current.style.height = `${imageRef.current.offsetHeight}px`;
  //   }
  // }, []);

  return (
    <section ref={containerRef} className="grid grid-cols-9">
      {/* 대표 프로필 이미지 섹션 */}
      <div ref={imageRef} className="aspect-3/4 col-span-4">
        <ProfileImage
          imgSrc={data.images['1']}
          alt="profile_image"
          width="w-full"
          radius="rounded-3xl"
        />
      </div>

      {/* Name, Rate 섹션 */}
      <div
        className="col-span-5 flex flex-col pl-7"
        style={{ position: 'relative', height: 'auto', width: '100%' }}
      >
        <div className="text-xl font-medium font-semibold leading-loose">
          <div>안녕하세요,</div>
          <div>
            <span className="text-3xl font-bold">{data?.name}</span>&nbsp;님
          </div>
          <Link href="/mypage/edit">
            <button className="btn-default mb-10 mt-3">프로필 수정하기</button>
          </Link>
        </div>
        <section className="box-border flex h-full flex-1 flex-col">
          <div className="mb-2 box-border flex flex-row items-center justify-between">
            <div className="text-lg font-semibold">키워드별 매칭수</div>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="공개"
            />
          </div>
          <div className="chart-container h-full w-full">
            <Rate />
          </div>
        </section>
      </div>
    </section>
  );
}
