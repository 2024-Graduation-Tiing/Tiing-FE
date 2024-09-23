import { createChatRoom } from '@/app/api/chat/request';
import fetchUserData from '@/utils/fetchUserData';
import React from 'react';

//
//
//

type Proposal = {
  params: {
    scouterId: string;
    title: string;
    id: number;
  };
};

const PostponedProposal = ({ params }: Proposal) => {
  const handleOnClick = async () => {
    const { data } = fetchUserData();
    const room = await createChatRoom(
      data.result.memberId,
      params.scouterId,
      params.id,
    );
    if (room) {
      window.location.href = `/chat/${room.roomId}`;
    } else {
      console.log('Failed to create chat room');
    }
  };
  return (
    <div className="w-full py-3">
      <div className="mb-2 font-semibold leading-relaxed">{params.title}</div>
      <button className="btn-default text-xs" onClick={handleOnClick}>
        프로필 보내기
      </button>
    </div>
  );
};

export default PostponedProposal;
