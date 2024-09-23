'use client';

import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
} from '@mui/material';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';

//
//
//

interface ProposalListType {
  id: number;
  title: string;
}

interface ProposalSelectDialogProps {
  proposalList?: ProposalListType[];
  setSelectedProposalId: React.Dispatch<React.SetStateAction<number>>;
}

//
//
//

const ProposalSelectDialog: React.FC<ProposalSelectDialogProps> = ({
  proposalList,
  setSelectedProposalId,
}) => {
  /**
   *
   */
  const handleClick = (id: number) => {
    setSelectedProposalId(id);
    console.log('선택된 제안서 id:', id);
  };

  return (
    <div>
      <Dialog open={true} sx={{ width: 1 }}>
        <DialogTitle sx={{ fontSize: 18, fontWeight: 700 }}>
          <TaskAltRoundedIcon sx={{ mr: 1, color: '#1E96FC' }} />
          매칭할 제안서 선택
        </DialogTitle>
        <List>
          {proposalList?.map((proposal) => (
            <ListItem>
              <ListItemButton onClick={() => handleClick(proposal.id)}>
                {proposal.title}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </div>
  );
};

export default ProposalSelectDialog;
