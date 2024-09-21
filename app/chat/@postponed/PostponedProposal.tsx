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
  };
};

const PostponedProposal = ({ params }: Proposal) => {
  const handleOnClick = async () => {
    const { data } = fetchUserData();
    const roomId = await createChatRoom(data.result.memberId, params.scouterId);
    if (roomId) {
      window.location.href = `/chat/${roomId}`;
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
