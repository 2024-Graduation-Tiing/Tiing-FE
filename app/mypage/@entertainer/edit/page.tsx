'use client';

import React, { useEffect, useRef, useState } from 'react';
import ProfileImage from '@/app/ProfileImage';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/app/api/user/profile/request';
import { FILTERS } from '@/app/lib/filters';

//
//
//

const EditProfile = () => {
  // TODO: 페이지 최초 렌더링시 해당 유저의 profile 데이터 있는지 없는지 확인
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 유지,
    initialData: {
      images: {},
      name: '',
      age: '',
      height: '',
      weight: '',
      description: '',
    },
  });

  // 데이터가 null인 경우 refetch 호출
  useEffect(() => {
    if (!data) {
      refetch();
    }
  }, [data, refetch]);

  const [imgSrcs, setImgSrcs] = useState<string[]>([]);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]); // 각 input의 ref를 저장하는 배열

  const handleImgInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const image = e.target.files?.[0];
    if (image) {
      const imageUrl = URL.createObjectURL(image);
      const updatedImgSrcs = [...imgSrcs];
      updatedImgSrcs[idx] = imageUrl; // 선택한 이미지로 업데이트
      setImgSrcs(updatedImgSrcs);
    }
  };

  const renderImgDiv = (imgSrc: string | undefined, idx: number) => {
    // if (images && idx) {
    return (
      <div
        className="group relative overflow-hidden rounded-2xl"
        key={idx}
        onClick={() => fileInputRefs.current[idx]?.click()}
      >
        {idx === 0 ? (
          <div className="card-label absolute left-3 top-3  group-hover:text-white z-20">
            대표사진
          </div>
        ) : (
          <></>
        )}
        {(imgSrc || imgSrcs[idx]) && (
          <div className="absolute left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center bg-blue opacity-0 group-hover:opacity-60 z-10">
            <img src="/edit_image_white.svg" alt="edit_ic" />
          </div>
        )}
        {!imgSrc && !imgSrcs[idx] && (
          <div className="absolute left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center bg-lightblue z-20">
            <img className="w-[13%]" src="/edit_add_sign.svg" alt="edit_ic" />
          </div>
        )}
        <ProfileImage
          imgSrc={imgSrc || imgSrcs[idx]}
          width="w-full"
          alt="profile_image"
        />
        <input
          type="file"
          ref={(el) => {
            fileInputRefs.current[idx] = el;
          }}
          style={{ display: 'none' }}
          onChange={(e) => handleImgInputChange(e, idx)}
        />
      </div>
    );
    // }
  };

  const [selectedOptions, setSelectedOptions] = useState({
    gender: data.gender || '0',
    platforms: Object.values(data.platforms || {}),
    keywords: Object.values(data.keywords || {}),
  });

  const handleGenderClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    gender: string,
  ) => {
    event.preventDefault();
    const genderValue = gender === '남성' ? '0' : '1'; // '남성'은 '0', '여성'은 '1'로 설정
    setSelectedOptions((prev) => ({
      ...prev,
      gender: genderValue, // 선택된 성별 업데이트
    }));
  };

  const handlePlatformClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    platform: string,
  ) => {
    event.preventDefault();
    setSelectedOptions((prev) => {
      const isSelected = prev.platforms.includes(platform);
      const updatedPlatforms = isSelected
        ? prev.platforms.filter((p) => p !== platform) // 이미 선택된 경우 제거
        : [...prev.platforms, platform]; // 선택되지 않은 경우 추가

      return {
        ...prev,
        platforms: updatedPlatforms, // 선택된 플랫폼 업데이트
      };
    });
  };

  const handleKeywordClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    keyword: string,
  ) => {
    event.preventDefault();
    setSelectedOptions((prev) => {
      const isSelected = prev.keywords.includes(keyword);
      const updatedKeywords = isSelected
        ? prev.keywords.filter((k) => k !== keyword) // 이미 선택된 경우 제거
        : [...prev.keywords, keyword]; // 선택되지 않은 경우 추가

      return {
        ...prev,
        keywords: updatedKeywords, // 선택된 키워드 업데이트
      };
    });
  };

  if (isFetching) {
    return <h1>Updating...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  if (!data) {
    return <h1>No profile data available.</h1>;
  }

  return (
    <div className="mb-28 mt-8 flex w-full flex-col items-center px-16">
      {/* 이미지 섹션 */}
      <section className="w-full">
        <div className="mb-4 ml-1 font-semibold">프로필 이미지</div>
        <section className="grid grid-cols-3 gap-8">
          {data.images ? (
            Array(3)
              .fill('')
              .map((_, idx) => renderImgDiv(data.images[`${idx + 1}`], idx))
          ) : (
            <>NONONO</>
          )}
        </section>
      </section>
      {/* 그 외 Input 섹션 */}
      <section className="mt-8 w-full px-40">
        <form className="w-full">
          <section className="mb-6 flex items-center gap-10">
            <label htmlFor="name" className="font-semibold">
              이름
            </label>
            <input
              className="input-box w-2/3"
              type="text"
              id="name"
              name="name"
              value={data.name}
            />
          </section>
          <section className="mb-6 flex flex-row items-center">
            <label htmlFor="platforms" className="mr-10 font-semibold">
              성별
            </label>
            <div className="flex flex-row gap-3">
              {FILTERS.gender.options.map((item) => (
                <button
                  className={
                    selectedOptions.gender ===
                    (item.name === '남성' ? '0' : '1')
                      ? 'select-btn-selected'
                      : 'select-btn-default'
                  }
                  key={item.id}
                  onClick={(e) => handleGenderClick(e, item.name)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </section>
          <section className="mb-6 flex flex-row items-center">
            <label htmlFor="platforms" className="mr-10 font-semibold">
              분야
            </label>
            <div className="flex flex-row gap-3">
              {FILTERS.field.options.map((item) => (
                <button
                  className={
                    selectedOptions.platforms.includes(item.name)
                      ? 'select-btn-selected'
                      : 'select-btn-default'
                  }
                  key={item.id}
                  onClick={(e) => handlePlatformClick(e, item.name)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </section>
          <section className="mb-6 flex items-center gap-10">
            <label htmlFor="age" className="font-semibold">
              연령
            </label>
            <input
              className="input-box w-2/12"
              type="text"
              id="age"
              name="age"
              value={data.age}
            />
          </section>
          <section className="mb-6 grid grid-cols-5 items-center gap-3">
            <div className="font-semibold">신체 정보</div>
            <div className="col-span-3 grid grid-cols-2">
              <div className="flex ">
                <input
                  className="input-box mr-3 w-1/2"
                  type="text"
                  id="height"
                  name="height"
                  value={data.height}
                />
                <label htmlFor="height" className="self-end font-semibold">
                  cm
                </label>
              </div>
              <div className="flex">
                <input
                  className="input-box mr-3 w-1/2"
                  type="text"
                  id="weight"
                  name="weight"
                  value={data.weight}
                />
                <label htmlFor="weight" className="self-end font-semibold">
                  kg
                </label>
              </div>
            </div>
          </section>
          <section className="mb-6 flex flex-row">
            <label htmlFor="keyword" className="mr-7 pt-1 font-semibold">
              이미지 키워드
              <div className="text-xs font-medium leading-7 text-gray">
                최대 3개
              </div>
            </label>
            <div>
              <div className="flex flex-row gap-2">
                {FILTERS.keyword.options.slice(0, 4).map((item) => (
                  <button
                    key={item.id}
                    className={
                      selectedOptions.keywords.includes(item.name)
                        ? 'select-btn-selected'
                        : 'select-btn-default'
                    }
                    onClick={(e) => handleKeywordClick(e, item.name)}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              <div className="mt-2 flex flex-row gap-2">
                {FILTERS.keyword.options.slice(4, 8).map((item) => (
                  <button key={item.id} className="select-btn-default">
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </section>
          <section className="mb-6">
            <label htmlFor="keyword" className="pt-1 font-semibold">
              자기소개
              <span className="ml-3 text-xs font-medium leading-7 text-gray">
                최대 200자
              </span>
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                rows={4}
                className="block w-full rounded-12 border-[1px] border-lightgray p-4 text-sm outline-none"
                value={data.description}
              />
            </div>
          </section>
          <section className="mb-6">
            <label htmlFor="vidlinks" className="pt-1 font-semibold">
              포트폴리오 영상
            </label>
            <div className="mt-2 grid grid-rows-3 gap-4">
              <input
                className="input-box"
                type="text"
                id="vidlinks"
                name="vidlinks"
                placeholder="링크를 입력해주세요."
              />
              <input
                className="input-box"
                type="text"
                id="vidlinks"
                name="vidlinks"
                placeholder="링크를 입력해주세요."
              />
              <input
                className="input-box"
                type="text"
                id="vidlinks"
                name="vidlinks"
                placeholder="링크를 입력해주세요."
              />
            </div>
          </section>
          {/* <section className="mb-12">
            <label htmlFor="experience" className="pt-1 font-semibold">
              활동 내역
            </label>
            <div className="mt-2 grid grid-rows-3 gap-4">
              {data?.careers.map((item, idx) => (
                <div className="grid grid-cols-4" key={idx}>
                  <div className="flex items-center">
                    <input
                      className="input-box mr-3 w-3/5"
                      type="text"
                      id="exp-year"
                      name="exp-year"
                      value={item.year}
                      onChange={(e) => {
                        // const newCareers = [...careers];
                        // newCareers[idx].year = e.target.value;
                        // setCareers(newCareers);
                      }}
                    />
                    <label htmlFor="exp-year" className="font-semibold">
                      년
                    </label>
                  </div>
                  <input
                    className="input-box col-span-3"
                    type="text"
                    id="exp-content"
                    name="exp-content"
                    value={item.content}
                    placeholder="활동 내용 소개 (최대 50자)"
                    onChange={(e) => {
                      // const newCareers = [...careers];
                      // newCareers[idx].content = e.target.value;
                      // setCareers(newCareers);
                    }}
                  />
                </div>
              ))}
              {/* TODO: add button 클릭시 div 추가  
              <button
                type="button"
                className="hover:btn-addsign-hover btn-addsign"
                onClick={handleAddCareers}
              >
                +
              </button>
            </div>
          </section> */}
          <div className="flex justify-end">
            <button className="btn-default">등록하기</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default EditProfile;
