import styles from '@/app/proposal/[id]/proposal.module.css';

const Proposal = () => {
  /**
   *
   */
  const renderHeader = () => {
    return (
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-col mb-8">
          <h3 className="text-2xl">아비브</h3>
          <h2 className="text-5xl font-bold">SNS 광고</h2>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm mb-1 text-gray">04.30 마감 예정</span>
          <img src="/matching_btn.svg" />
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
          <div className={styles.info_content_div}></div>
        </div>
        <div className={styles.info_div}>
          <h3 className={styles.info_title}>조건</h3>
          <div className={styles.info_content_div}></div>
        </div>
        <div className={styles.info_div}>
          <h3 className={styles.info_title}>선호 이미지</h3>
          <div className={styles.info_content_div}></div>
        </div>
        <div className={styles.info_div}>
          <h3 className={styles.info_title}>제안 상세</h3>
          <p></p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-row items-center justify-center mt-10 px-[16rem]">
      <img src="/profile_img.png" className="w-[20rem] rounded-16 mr-10" />
      <div className="w-[36rem]">
        {renderHeader()}
        {renderContent()}
      </div>
    </div>
  );
};

export default Proposal;
