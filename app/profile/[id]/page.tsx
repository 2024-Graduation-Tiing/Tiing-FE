import MatchingButton from '@/app/MatchingButton';
import { db } from '@/app/lib/db';
import fetchUserDataServer from '@/utils/fetchUserDataServer';
import { getCookies } from 'cookies-next';
import { cookies } from 'next/headers';
import ProfileImageContainer from '../_components/ProfileImageContainer';

//
//
//

const Profile = async (props: any) => {
  const accessToken = getCookies({ cookies }).accessToken;
  const userInfo = accessToken ? await fetchUserDataServer(accessToken) : null;
  const userId = userInfo?.memberId;
  const profileId = decodeURIComponent(props.params.id);
  let matchingProposal = null;
  let proposalList = null;

  const info = await db.profile.findUnique({
    where: {
      entertainer_id: profileId,
    },
  });

  if (userInfo) {
    matchingProposal = await db.proposal.findFirst({
      where: {
        scouter_id: userId,
      },
      select: {
        id: true,
      },
    });

    proposalList = await db.member.findUnique({
      where: {
        member_id: userId,
      },
      include: {
        proposals: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }

  const matchingProposalId = matchingProposal ? matchingProposal?.id : null;

  const image: any[] = [];
  if (info?.images) {
    Object.entries(info?.images).forEach(([_, value]) => {
      image.push(value);
    });
  }

  /**
   *
   */
  const renderImageSection = () => {
    return <ProfileImageContainer image={image} />;
  };

  /**
   *
   */
  const renderInfoSection = () => {
    return (
      <>
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
            proposalId={matchingProposalId ? matchingProposalId : null}
            proposalList={proposalList?.proposals}
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
      </>
    );
  };

  return (
    <div className="w-full mt-10 flex flex-col items-center px-[16rem]">
      {/* <div className="mb-6 items-start justify-start text-left text-sm">홈 {`>`} 프로필상세</div> */}
      <div className="flex flex-row">
        {renderImageSection()}
        {renderInfoSection()}
      </div>
    </div>
  );
};

export default Profile;
