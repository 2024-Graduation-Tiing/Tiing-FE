'use client';

import React from 'react';
import ScrollProfile from './ScrollProfile';
import fetchUserData from '@/utils/fetchUserData';
import { createChatRoom } from '../api/chat/request';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import ProfileImage from '../ProfileImage';

//
//
//

const page = () => {
  const { data: userData } = fetchUserData();

  const searchParams = useSearchParams();
  const entertainerId = searchParams?.get('entertainerId');
  const proposalId = searchParams?.get('proposalId');

  const {
    data: matchData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['afterMatch', entertainerId, proposalId],
    queryFn: async () => {
      const res = await fetch(
        `/api/matches/match?entertainerId=${entertainerId}&proposalId=${proposalId}`,
      );
      if (!res.ok) {
        throw new Error('Failed to fetch match data');
      }
      return res.json(); // 응답을 JSON으로 변환
    },
    enabled: !!entertainerId && !!proposalId,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>Error fetching match data</div>;
  // }

  const renderBackground = () => {
    return (
      <div className="absolute top-0 overflow-hidden">
        <div className="h-[100vh] w-screen bg-gradient-diagonal from-navy from-10% via-blue via-mint to-yellow"></div>
        <div className="absolute -left-56 top-[27rem] h-[100vh] w-150 bg-white blur-3xl"></div>
      </div>
    );
  };

  const renderCardsBox = () => {
    const handleBtnClick = async () => {
      const data = await createChatRoom(
        matchData.enter.entertainer_id,
        matchData.proposal.scouter_id,
        parseInt(matchData.proposal.id),
      );
      if (data) {
        window.location.href = `/chat/${data.roomId}`;
      } else {
        console.log('Failed to create chat room');
      }
    };
    return (
      <div className="w-full mt-20 px-44 flex flex-row justify-evenly">
        <div className="w-7/12 flex flex-row gap-5">
          <div className="flex-1">
            <ProfileImage
              imgSrc={matchData && matchData.enter.images['1']}
              alt="cover_image"
              radius="rounded-3xl"
              width="w-full"
            />
          </div>
          <div className="flex-1">
            <ProfileImage
              imgSrc={matchData && matchData.proposal.image}
              alt="cover_image"
              radius="rounded-3xl"
              width="w-full"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex flex-row w-full items-stretch flex-wrap">
            <div className="py-7 text-2xl text-white">
              <span className="font-extrabold">
                {userData.result.role === 'scouter' && matchData
                  ? `${matchData?.enter.name}`
                  : `${matchData?.proposal.title}`}
              </span>
              <span className="font-semibold">님과의</span>
            </div>
            <div className="ml-0.5 w-full">
              <img className="w-full" src="matching_text_logo.svg" />
            </div>
          </div>
          <div className="pt-5">
            <button
              className="text-medium w-full rounded-2xl bg-black/30 py-3 font-bold text-white"
              onClick={handleBtnClick}
            >
              제안 전송하기
            </button>
            <div className="text-center text-sm leading-8	text-gray">
              지금 제안을 미루고 이후 채팅에서 전송할 수도 있어요!
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 백그라운드 아이콘
  // const renderIcon = ({ top, left }: iconProps) => {
  //   const tailwindStyle = `absolute top-${top} left-${left} bg-white`;
  //   return (
  //     <div className={tailwindStyle}>
  //       <img src="/matching_back_icon.svg" />
  //     </div>
  //   );
  // };

  return (
    <div className="relative">
      {renderBackground()}
      <div className="absolute top-0 w-full">
        {renderCardsBox()}
        <div className="mt-16 flex justify-center ">
          <img src="/matching_scroll_arrow.svg" alt="arrow_icon" />
        </div>
        <div className="px-52">
          <ScrollProfile />
        </div>
      </div>
    </div>
  );
};

export default page;
