import { db } from '@/app/lib/db';

//
//
//

const Profile = async (props: any) => {
  const id = decodeURIComponent(props.params.id);
  const info = await db.profile.findUnique({
    where: {
      entertainer_id: id,
    },
  });
  console.log('아이디', info);

  const image: any[] = [];
  if (info?.images) {
    Object.entries(info?.images).forEach(([_, value]) => {
      image.push(value);
    });
  }

  return (
    <div className="mt-10 flex flex-col items-center">
      {/* <div className="mb-6 items-start justify-start text-left text-sm">홈 {`>`} 프로필상세</div> */}
      <div className="flex flex-row">
        <div className="mr-10 flex w-[284px] flex-col">
          <img src={image[0]} className="rounded-16 mb-3 w-[284px]" />
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
          <div className="mb-5 grid w-fit grid-cols-3 gap-2">
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
          <img src="/matching_btn.svg" className="w-[120px]" />
          <div className="mt-10">
            <div className="mb-6">
              <span className="text-sm text-gray">2023</span>
              <p>어쩌고 MV 출연</p>
              <p>어쩌고 드라마 단역</p>
            </div>
            <div>
              <span className="text-sm text-gray ">2022</span>
              <p>어쩌고 MV 출연</p>
              <p>어쩌고 드라마 단역</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
