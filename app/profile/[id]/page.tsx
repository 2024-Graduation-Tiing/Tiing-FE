import MatchingButton from '@/app/MatchingButton';
import { db } from '@/app/lib/db';
import fetchUserDataServer from '@/utils/fetchUserDataServer';
import { getCookies } from 'cookies-next';
import { cookies } from 'next/headers';

//
//
//

const Profile = async (props: any) => {
  const accessToken = getCookies({ cookies }).accessToken;
  const userInfo = accessToken ? await fetchUserDataServer(accessToken) : null;
  const userId = userInfo.memberId;
  const profileId = decodeURIComponent(props.params.id);

  console.log('프픕', props);

  const info = await db.profile.findUnique({
    where: {
      entertainer_id: profileId,
    },
  });

  const matchingProposal = await db.proposal.findFirst({
    where: {
      scouter_id: userId,
    },
    select: {
      id: true,
    },
  });
  const matchingProposalId = matchingProposal ? matchingProposal?.id : null;

  const image: any[] = [];
  if (info?.images) {
    Object.entries(info?.images).forEach(([_, value]) => {
      image.push(value);
    });
  }

  return (
    <div className="w-full mt-10 flex flex-col items-center px-[16rem]">
      {/* <div className="mb-6 items-start justify-start text-left text-sm">홈 {`>`} 프로필상세</div> */}
      <div className="flex flex-row">
        <div className="mr-10 flex w-[20rem] flex-col">
          <img src={image[0]} className="rounded-16 mb-5 w-full shadow-xl" />
          <div className="grid w-fit grid-cols-3 gap-4">
            <img src={image[1]} className="rounded-16 mb-3" />
            <img src={image[2]} className="rounded-16 mb-3" />
            <img src={image[3]} className="rounded-16 mb-3" />
          </div>
        </div>
        <div className="mr-20 w-[440px]">
          <div className="mb-5">
            {info?.platforms &&
              Object.entries(info?.platforms).map(([key, value]) => (
                <span key={key} className="tag mr-2">
                  {value}
                </span>
              ))}
          </div>
          <h3 className="mb-1 text-[1.7rem] font-semibold">{info?.name}</h3>
          <p className="mb-8 text-sm">
            {info?.height}cm {info?.weight}kg &nbsp;l&nbsp;{' '}
            {2024 - (info?.age || 2024)}살
          </p>
          <div className="mb-10 grid w-fit grid-cols-3 gap-2">
            {info?.keywords &&
              Object.entries(info?.keywords).map(([key, value]) => (
                <span key={key} className="keyword">
                  {value}
                </span>
              ))}
          </div>
          <p>{info?.description}</p>
        </div>
        <div>
          <MatchingButton
            entertainerId={profileId}
            proposalId={matchingProposalId}
          />
          <div className="mt-10">
            <div className="mb-6">
              <span className="text-sm text-gray">2024</span>
              <p>Yotube 채널 구독자 10만</p>
            </div>
            <div>
              <span className="text-sm text-gray ">2023</span>
              <p>'Shine' MV 출연</p>
              <p>코스메틱 브랜드 'Soffy' 모델</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
