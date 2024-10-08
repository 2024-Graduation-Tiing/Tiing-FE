'use client';

import React, { useEffect, useRef, useState } from 'react';
import RatioImgContainer from '../../RatioImgContainer';
import ProfileImage from '@/app/ProfileImage';
import { useQuery } from '@tanstack/react-query';
import { profile } from '@prisma/client';
import { getProfile } from '@/app/api/user/profile/request';
import { FILTERS } from '@/app/lib/filters';

//
//
//

const EditProfile = () => {
  const [images, setImages] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  // 파일 선택 창을 열기위한 위한 ref, handler
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImgDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleImgInputChange = () => {};

  const renderImgDiv = (imgSrc: string, idx: number) => {
    return (
      <div
        className="group relative overflow-hidden rounded-2xl"
        key={idx}
        onClick={handleImgDivClick}
      >
        <div className="card-label absolute left-3 top-3  group-hover:text-white z-20">
          대표사진
        </div>
        <div className="absolute left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center bg-blue opacity-0 group-hover:opacity-60 z-10">
          <img src="/edit_image_white.svg" alt="edit_ic" />
        </div>
        <ProfileImage imgSrc={imgSrc} width="w-full" alt="profile_image" />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => handleImgInputChange()}
        />
      </div>
    );
  };

  // TODO: 페이지 최초 렌더링시 해당 유저의 profile 데이터 있는지 없는지 확인
  // useEffect(()=>{

  // },[])

  // const { data, error, isLoading } = useQuery({
  //   queryKey: ['profile'],
  //   queryFn: getProfile,
  // });

  // // TODO: 로딩 페이지 설정
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // // TODO: 에러 페이지 설정
  // if (error) {
  //   return <div>Error loading profile</div>;
  // }

  // let profileData;
  // const defaultProfileData: profile = {
  //   entertainer_id: '', //Signup/Login 후 response로 받은 memberid
  //   name: '',
  //   platforms: {},
  //   age: 0, //년도
  //   height: 0,
  //   weight: 0,
  //   keywords: {},
  //   description: '',
  //   images: {},
  //   videos: {},
  //   career: {},
  // };
  // if (!data || Object.keys(data).length === 0) {
  //   profileData;
  // } else profileData = data;

  // 출생년도 age를 현재 나이로 바꾸는 함수

  // 활동내역 input 추가 핸들
  const [careers, setCareers] = useState([{ year: '', content: '' }]);
  const handleAddCareers = () => {
    setCareers([...careers, { year: '', content: '' }]);
  };

  return (
    <div className="mb-28 mt-8 flex w-full flex-col items-center px-16">
      {/* 이미지 섹션 */}
      <section className="w-full">
        <div className="mb-4 ml-1 font-semibold">프로필 이미지</div>
        <section className="grid grid-cols-3 gap-8">
          {Array(3)
            .fill('')
            .map((_, idx) => renderImgDiv('', idx))}
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
            />
          </section>
          <section className="mb-6 flex flex-row items-center">
            <label htmlFor="platforms" className="mr-10 font-semibold">
              성별
            </label>
            <div className="flex flex-row gap-3">
              {FILTERS.gender.options.map((item) => (
                <button className="select-btn-default" key={item.id}>
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
                <button className="select-btn-default" key={item.id}>
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
                  <button key={item.id} className="select-btn-default">
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
          <section className="mb-12">
            <label htmlFor="experience" className="pt-1 font-semibold">
              활동 내역
            </label>
            <div className="mt-2 grid grid-rows-3 gap-4">
              {careers.map((item, idx) => (
                <div className="grid grid-cols-4" key={idx}>
                  <div className="flex items-center">
                    <input
                      className="input-box mr-3 w-3/5"
                      type="text"
                      id="exp-year"
                      name="exp-year"
                      value={item.year}
                      onChange={(e) => {
                        const newCareers = [...careers];
                        newCareers[idx].year = e.target.value;
                        setCareers(newCareers);
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
                      const newCareers = [...careers];
                      newCareers[idx].content = e.target.value;
                      setCareers(newCareers);
                    }}
                  />
                </div>
              ))}
              {/* TODO: add button 클릭시 div 추가 */}
              <button
                type="button"
                className="hover:btn-addsign-hover btn-addsign"
                onClick={handleAddCareers}
              >
                +
              </button>
            </div>
          </section>
          <div className="flex justify-end">
            <button className="btn-default">등록하기</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default EditProfile;
