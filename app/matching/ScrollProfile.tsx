'use client';

import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import RatioImgContainer from '../mypage/RatioImgContainer';
import { useQuery } from '@tanstack/react-query';
import fetchUserData from '@/utils/fetchUserData';
import Link from 'next/link';

//
//
//

const ScrollProfile = () => {
  const { data: userData } = fetchUserData();
  useEffect(() => {
    AOS.init({
      offset: 150,
    });
  }, []);

  const {
    data: queryData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['recommendOthers', userData?.result?.role],
    queryFn: async () => {
      if (userData?.result?.role === 'entertainer') {
        return fetch('/api/proposals').then((res) => res.json());
      } else {
        return fetch('/api/profiles').then((res) => res.json());
      }
    },
    enabled: !!userData?.result?.role,
  });

  // const renderCard = (item) => {
  //   return (

  //   );
  // };

  if (error) return <>{error.message}</>;

  if (isLoading) return <>Loading...</>;

  const dataArray = Array.isArray(queryData) ? queryData : [];

  return (
    <div>
      <div className="my-7 text-center text-lg font-bold">
        프로필 더 찾아보기
      </div>
      <div
        className="z-10 grid grid-cols-5 gap-4 bg-white pt-5"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-easing="ease"
      >
        {dataArray.map((item, idx) => (
          <div className="w-full" key={idx}>
            <Link
              href={
                item.entertainer_id
                  ? `/profile/${item.entertainer_id}`
                  : `/proposal/${item.id}`
              }
            >
              <RatioImgContainer
                width="w-full"
                imgSrc={
                  userData.result.role === 'entertainer'
                    ? item.image
                    : item.images['1']
                }
                radius="rounded-xl"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollProfile;
