'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { authApi } from './lib/authApi';
import ProposalSelectDialog from './ProposalSelectDialog';

//
//
//

interface ProposalListType {
  id: number;
  title: string;
}

interface MatchingButtonProps {
  entertainerId: string;
  proposalId?: number | null;
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
  const [selectedProposalId, setSelectedProposalId] = useState(0);

  /**
   *
   */
  const handleClick = () => {
    setIsDialogOpen(true);
  };

  /**
   *
   */
  const handlematching = () => {
    authApi
      .post(
        `${process.env.NEXT_PUBLIC_SPRING_URL}/api/match/create?entertainerId=${entertainerId}&proposalId=${selectedProposalId}`,
      )
      .then((res) => {
        console.log(res.data);
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
    if (selectedProposalId) {
      handlematching();
    }
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
