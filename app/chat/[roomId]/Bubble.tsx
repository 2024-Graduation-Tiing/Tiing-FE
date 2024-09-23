import React from 'react';
import BubbleContent from './BubbleContent';

//
//
//

type Message = {
  sender: string;
  message: string;
  sendingTime: string;
};

type BubbleProps = {
  message: Message;
  isMine: boolean;
};

//
//
//

const isImageUrl = (url: string) => {
  return url.match(/\.(jpeg|jpg|gif|png|webp)$/i) !== null;
};

const isProfileData = (message: string) => {
  if (
    message.includes('"entertainer_id":') &&
    message.includes('"name":') &&
    message.includes('"platforms":')
  )
    return true;
};

const isProposalData = (message: string) => {
  return (
    message.includes('"scouter_id":') &&
    message.includes('"age_condition":') &&
    message.includes('"description":')
  );
};

const formatTime = (sendingTime: string) => {
  const date = new Date(sendingTime);
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  const formatted = date.toLocaleTimeString('ko-KR', options);
  return formatted;
};

const Bubble = ({ message, isMine }: BubbleProps) => {
  const isImage = isImageUrl(message.message);
  const isProfile = isProfileData(message.message);
  const isProposal = isProposalData(message.message);
  const formattedDate = formatTime(message.sendingTime);
  if (isMine) {
    return (
      <div className="my-3 flex flex-col self-end items-end max-w-2/3">
        <div className="mb-1 w-fit text-pretty rounded-b-xl rounded-l-xl bg-blue text-sm text-white overflow-hidden">
          <BubbleContent
            isImage={isImage}
            isProfile={isProfile}
            isProposal={isProposal}
            content={message.message}
          />
        </div>
        <div className="text-xs text-gray-500">{formattedDate}</div>
      </div>
    );
  } else {
    return (
      <div className="my-3 flex flex-col max-w-2/3">
        <div className="mb-1 w-fit text-pretty rounded-b-xl rounded-r-xl bg-skyblue text-sm text-darkgray overflow-hidden">
          <BubbleContent
            isImage={isImage}
            isProfile={isProfile}
            isProposal={isProposal}
            content={message.message}
          />
        </div>
        <div className="text-xs text-gray-500">{formattedDate}</div>
      </div>
    );
  }
};

export default Bubble;
