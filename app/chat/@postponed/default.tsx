'use client';

import React, { useState } from 'react';
import PostponedProposal from './PostponedProposal';
import { Avatar, Badge, BadgeProps, styled } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchPostponed } from '@/app/api/matches/postponed/request';

//
//
//

export default function Postponed() {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['postponedProposals'],
    queryFn: fetchPostponed,
  });

  if (isLoading) return <>Loading...</>;

  if (error) return <>fail to fetch postponed proposals</>;

  return (
    <section className="overflow-hidden">
      <div className="flex flex-row justify-between px-7">
        <div className="flex flex-row items-center text-darkgray">
          <div className="mr-2">미뤄진 제안들</div>
          {!isOpen && (
            <Avatar
              sx={{ width: 24, height: 24, fontSize: 14, bgcolor: '#1E96FC' }}
            >
              {data.length}
            </Avatar>
          )}
        </div>
        <img
          src={isOpen ? '/arrow_up.svg' : '/arrow_down.svg'}
          alt="dropdown_arrow"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="hover:cursor-pointer"
        />
      </div>
      {/* 컴포넌트 나타나는 영역 */}
      {isOpen && (
        <div className="divide-y px-9 overflow-y-auto max-h-64">
          {data.map((proposal) => (
            <PostponedProposal key={proposal.id} params={proposal} />
          ))}
        </div>
      )}
    </section>
  );
}
