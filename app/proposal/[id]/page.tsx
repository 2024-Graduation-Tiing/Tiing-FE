import MatchingButton from '@/app/MatchingButton';
import { db } from '@/app/lib/db';
import styles from '@/app/proposal/[id]/proposal.module.css';
import fetchUserDataServer from '@/utils/fetchUserDataServer';
import { getCookies } from 'cookies-next';
import { cookies } from 'next/headers';

//
//
//

const Proposal = async (props: any) => {
  const accessToken = getCookies({ cookies }).accessToken;
  const userInfo = accessToken ? await fetchUserDataServer(accessToken) : null;
  const userId = userInfo.memberId;
  const proposalId = Number(decodeURIComponent(props.params.id));

  const info = await db.proposal.findUnique({
    where: {
      id: Number(proposalId),
    },
  });

  /**
   *
   */
  const getDeadline = () => {
    if (info?.end_date) {
      const deadline = info?.end_date.toISOString().split('T')[0];
      const month = deadline.split('-')[1];
      const date = deadline.split('-')[2];
      return `${month}.${date} 마감 예정`;
    }
  };

  /**
   *
   */
  const getCondition = () => {
    let condition: string[] = [];
    if (info?.gender_condition) {
      Object.entries(info.gender_condition).map(([key, value]) => {
        if (value) condition.push(key);
      });
    }
    if (info?.age_condition) {
      Object.entries(info.age_condition).map(([key, value]) => {
        condition.push(value + '대');
      });
    }
    return condition;
  };

  /**
   *
   */
  const renderHeader = () => {
    return (
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-col mb-8">
          <h3 className="text-xl mb-2">{info?.company}</h3>
          <h2 className="w-[25rem] text-5xl font-bold break-keep">
            {info?.title}
          </h2>
        </div>
        <div className="flex flex-col items-center mt-3.5">
          <span className="text-sm mb-1 text-gray">{getDeadline()}</span>
          <MatchingButton entertainerId={userId} proposalId={proposalId} />
        </div>
      </div>
    );
  };

  /**
   *
   */
  const renderContent = () => {
    return (
      <div>
        <div className={styles.info_div}>
          <h3 className={styles.info_title}>분야</h3>
          <div className={styles.info_content_div}>
            {info?.platforms &&
              Object.entries(info?.platforms).map(([key, value]) => (
                <span key={key} className="keyword bg-gray-100">
                  {value}
                </span>
              ))}
          </div>
        </div>
        <div className={styles.info_div}>
          <h3 className={styles.info_title}>조건</h3>
          <div className={styles.info_content_div}>
            {getCondition().map((value, index) => (
              <span key={index} className="keyword bg-gray-100">
                {value}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.info_div}>
          <h3 className={styles.info_title}>선호 이미지</h3>
          <div className={styles.info_content_div}>
            {info?.keywords &&
              Object.entries(info?.keywords).map(([key, value]) => (
                <span key={key} className="keyword">
                  {value}
                </span>
              ))}
          </div>
        </div>
        <div className={styles.info_div}>
          <h3 className={styles.info_title}>제안 상세</h3>
          <p>{info?.description}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-fit flex flex-row items-center justify-center mt-10 px-[16rem]">
      <div className="w-[20rem] h-fit mr-10">
        <img
          src={info?.image ? info?.image : '/'}
          className="w-full rounded-16"
        />
      </div>
      <div className="w-[36rem]">
        {renderHeader()}
        {renderContent()}
      </div>
    </div>
  );
};

export default Proposal;
