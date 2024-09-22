'use client';

import React from 'react';
import { authApi } from './lib/authApi';

//
//
//

interface MatchingButtonProps {
  entertainerId: string;
  proposalId: number | null;
}

//
//
//

const MatchingButton: React.FC<MatchingButtonProps> = ({
  entertainerId,
  proposalId,
}) => {
  /**
   *
   */
  const handleClick = () => {
    authApi
      .post(
        `${process.env.NEXT_PUBLIC_SPRING_URL}/api/match/create?entertainerId=${entertainerId}&proposalId=${proposalId}`,
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <img
      src="/matching_btn.svg"
      className="w-[7.5rem] cursor-pointer"
      onClick={handleClick}
    />
  );
};

export default MatchingButton;
