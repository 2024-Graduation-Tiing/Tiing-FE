import React, { useEffect } from 'react';
import ProfileImage from '@/app/ProfileImage';
import { useQuery } from '@tanstack/react-query';
import { getRoom } from '@/app/api/chat/request';
import { useRouter } from 'next/navigation';

//
//
//

interface EnterMatchingSituationProps {
  matchInfo: {
    id: number;
    entertainer_id: string;
    proposal_id: string;
    matched: boolean;
    proposal: {
      scouter_id: string;
      company: string;
      end_date: string;
      image: string | undefined;
      title: string;
    };
  };
}

//
//
//

const EnterMatchingSituation = ({ matchInfo }: EnterMatchingSituationProps) => {
  const router = useRouter();

  const { data, error, refetch, isFetching, isSuccess } = useQuery({
    queryKey: [
      'roomId',
      matchInfo.entertainer_id,
      matchInfo.proposal.scouter_id,
      matchInfo.proposal_id,
    ],
    queryFn: () =>
      getRoom({
        entertainer_id: matchInfo.entertainer_id,
        scouter_id: matchInfo.proposal.scouter_id,
        proposal_id: matchInfo.proposal_id,
      }),
    enabled: false, // 버튼을 눌렀을 때만 실행되도록 초기에는 비활성화
  });

  const handleBtnClick = () => {
    refetch(); // 버튼을 눌렀을 때만 데이터를 가져오도록 refetch
    console.log('Refetching...');
  };

  // roomId를 가져온 후 URL로 이동
  useEffect(() => {
    if (isFetching) {
      console.log('Fetching data...');
    }

    if (data && isSuccess) {
      console.log('Data fetched:', data);
      sessionStorage.setItem('receiver', JSON.stringify(data.receiver));
      window.location.href = `/chat/${data.roomId}`;
    }

    if (error) {
      console.error('Error fetching data:', error);
    }
  }, [data, isFetching, error, router]);

  const today = new Date();
  const endDate = new Date(matchInfo.proposal.end_date);

  const renderCover = () => {
    if (matchInfo.matched) {
      return (
        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl bg-black bg-opacity-60 z-20">
          <img
            src="/mypage_matchingstate_icon_blue.svg"
            alt="state_icon"
            className="block"
          />
          <div className="text-md font-semibold text-blue">매칭 성공</div>
        </div>
      );
    }

    if (!matchInfo.matched) {
      if (endDate > today) {
        return (
          <div className="card-label absolute left-2 top-2 z-20">진행중</div>
        );
      } else {
        return (
          <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl bg-black bg-opacity-60 z-20">
            <img
              src="/mypage_matchingstate_icon_gray.svg"
              alt="state_icon"
              className="block"
            />
            <div className="text-md font-semibold text-[#CDCDCD]">
              {' '}
              캐스팅 마감
            </div>
          </div>
        );
      }
    }
  };

  const calculateDDay = (endDate: Date, today: Date) => {
    const timeDiff = endDate.getTime() - today.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // 일 단위로 변환
    return dayDiff;
  };

  return (
    <div className="my-4 grid grid-cols-3 gap-4">
      <section className="relative col-span-1">
        {renderCover()}
        <ProfileImage
          width="w-full"
          radius="rounded-2xl"
          imgSrc={matchInfo.proposal.image}
          alt="proposal_cover"
        />
      </section>
      <section className="col-span-2 flex flex-col justify-between">
        <div>
          {!matchInfo.matched && endDate > today ? (
            <div className="mb-3 text-sm text-slate-500">
              <span className="pr-1">마감</span>
              <span>D-{calculateDDay(endDate, today)}</span>
            </div>
          ) : (
            <></>
          )}
          <div className="text-sm text-slate-500">
            {matchInfo.proposal.company}
          </div>
          <div className="text-lg font-medium">{matchInfo.proposal.title}</div>
        </div>
        {!matchInfo.matched && endDate > today ? (
          <button
            className="btn-default w-1/2"
            onClick={() => handleBtnClick()}
          >
            채팅하기
          </button>
        ) : (
          <div></div>
        )}
      </section>
    </div>
  );
};

export default EnterMatchingSituation;
