'use client';

import React, { useEffect, useState } from 'react';
import { authApi } from './lib/authApi';
import ProposalSelectDialog from './ProposalSelectDialog';
import fetchUserData from '@/utils/fetchUserData';
import { useRouter } from 'next/navigation';

//
//
//

interface ProposalListType {
  id: number;
  title: string;
}

interface MatchingButtonProps {
  entertainerId: string;
  proposalId: number | null;
  proposalList?: ProposalListType[];
}

//
//
//

const MatchingButton: React.FC<MatchingButtonProps> = ({
  entertainerId,
  proposalId,
  proposalList,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [matchingProposalId, setMatchingProposalId] = useState(0);
  const [selectedProposalId, setSelectedProposalId] = useState(0);

  const { data: user, error } = fetchUserData();

  const router = useRouter();
  /**
   *
   */
  const handleClick = () => {
    if (error) {
      alert('로그인 후 이용해주세요.');
      return;
    }

    if (proposalList?.length === 0) {
      alert('매칭할 제안서가 없습니다. 제안서를 등록해주세요.');
      return;
    }

    if (user?.result.role === 'scouter') {
      setIsDialogOpen(true);
    }

    handlematching();
  };

  /**
   *
   */
  const handlematching = () => {
    if (user?.result.role === 'scouter' && selectedProposalId === 0) return;

    authApi
      .post(
        `${process.env.NEXT_PUBLIC_SPRING_URL}/api/match/create?entertainerId=${entertainerId}&proposalId=${matchingProposalId}`,
      )
      .then((res) => {
        if (!res.data) {
          router.push(
            `/matching?entertainerId=${entertainerId}&proposalId=${matchingProposalId}`,
          );
        }
        setIsDialogOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   *
   */
  const showDialog = () => {
    if (!isDialogOpen) return;

    return (
      <ProposalSelectDialog
        proposalList={proposalList}
        setSelectedProposalId={setSelectedProposalId}
      />
    );
  };

  /**
   *
   */
  useEffect(() => {
    if (selectedProposalId && matchingProposalId !== 0) {
      handlematching();
    }
  }, [selectedProposalId, matchingProposalId]);

  useEffect(() => {
    const handleSetProposalId = async () => {
      if (user?.result.role === 'scouter') {
        await setMatchingProposalId(selectedProposalId);
      } else {
        if (proposalId) {
          await setMatchingProposalId(proposalId);
        }
      }
    };
    handleSetProposalId();
  }, [selectedProposalId]);

  return (
    <div>
      <img
        src="/matching_btn.svg"
        className="w-[7.5rem] cursor-pointer"
        onClick={handleClick}
      />
      {showDialog()}
    </div>
  );
};

export default MatchingButton;
