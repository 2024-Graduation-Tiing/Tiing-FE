import Image from 'next/image';
import React from 'react';

//
//
//

interface BubbleContentPropos {
  isImage?: boolean;
  isProfile?: boolean;
  isProposal?: boolean;
  content: string;
}

const BubbleContent = ({
  isImage,
  isProfile,
  isProposal,
  content,
}: BubbleContentPropos) => {
  if (isImage) {
    return (
      <div className="m-3">
        <Image src={content} width={300} height={300} alt="sent image" />
      </div>
    );
  } else if (isProfile) {
    const data = JSON.parse(content);
    return (
      <div className="w-full h-full relative">
        <div className="absolute top-0 w-full h-full flex justify-center items-center">
          <div className="z-30 font-semibold text-base">프로필 보기</div>
          <div className="w-full h-full absolute top-0 bg-blue opacity-50"></div>
        </div>
        <Image
          src={data.images['1']}
          width={300}
          height={300}
          //   fill
          objectFit="cover"
          alt="profile image"
        />
      </div>
    );
  } else if (isProposal) {
    const data = JSON.parse(content);
    return (
      <div className="w-full h-full relative">
        <div className="absolute top-0 w-full h-full flex justify-center items-center">
          <div className="z-30 font-semibold text-base">제안서 보기</div>
          <div className="w-full h-full absolute top-0 bg-blue opacity-50"></div>
        </div>
        <Image
          src={data.images['1']}
          width={300}
          height={300}
          //   fill
          objectFit="cover"
          alt="profile image"
        />
      </div>
    );
  }

  return <div className="m-3">{content}</div>;
};

export default BubbleContent;
