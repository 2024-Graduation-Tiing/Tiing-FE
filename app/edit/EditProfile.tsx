'use client'

import React from 'react'
import RatioImgContainer from '../mypage/RatioImgContainer'
import { GENDER, KEYWORDS, PLATFORMS } from '../Filter'

//
//
//

const EditProfile = () => {
  return (
    <div className="mb-28 mt-8 px-20">
      <section>
        <div className="mb-4 font-semibold">프로필 이미지</div>
        <div className="grid grid-cols-3 gap-11">
          <div className="group relative overflow-hidden rounded-2xl">
            <div className="card-label absolute left-3 top-3">대표사진</div>
            <div className="absolute left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center bg-blue opacity-0 group-hover:opacity-60">
              <img src="/edit_image_white.svg" alt="edit_ic" />
            </div>
            <RatioImgContainer imgSrc="/profile_img.png" width="w-full" />
          </div>
          <div className="group relative overflow-hidden rounded-2xl">
            <div className="absolute left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center bg-blue opacity-0 group-hover:opacity-60">
              <img src="/edit_image_white.svg" alt="edit_ic" />
            </div>
            <RatioImgContainer imgSrc="/profile_img.png" width="w-full" />
          </div>
          <div className="group relative overflow-hidden rounded-2xl">
            <div className="absolute left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center bg-blue opacity-0 group-hover:opacity-60">
              <img src="/edit_image_white.svg" alt="edit_ic" />
            </div>
            <RatioImgContainer imgSrc="/profile_img.png" width="w-full" />
          </div>
        </div>
      </section>
      <section className="mx-52 mt-8 ">
        <form className="w-full">
          <section className="mb-6 flex items-center gap-10">
            <label htmlFor="name" className="font-semibold">
              이름
            </label>
            <input className="input-box w-2/3" type="text" id="name" name="name" />
          </section>
          <section className="mb-6 flex flex-row items-center">
            <label htmlFor="platforms" className="mr-10 font-semibold">
              성별
            </label>
            <div className="flex flex-row gap-3">
              {GENDER.map((gender) => (
                <button className="select-btn-default" key={gender}>
                  {gender}
                </button>
              ))}
            </div>
          </section>
          <section className="mb-6 flex flex-row items-center">
            <label htmlFor="platforms" className="mr-10 font-semibold">
              분야
            </label>
            <div className="flex flex-row gap-3">
              {PLATFORMS.map((platfrom) => (
                <button className="select-btn-default" key={platfrom}>
                  {platfrom}
                </button>
              ))}
            </div>
          </section>
          <section className="mb-6 flex items-center gap-10">
            <label htmlFor="age" className="font-semibold">
              연령
            </label>
            <input className="input-box w-2/12" type="text" id="age" name="age" />
          </section>
          <section className="mb-6 grid grid-cols-5 items-center gap-3">
            <div className="font-semibold">신체 정보</div>
            <div className="col-span-3 grid grid-cols-2">
              <div className="flex ">
                <input className="input-box mr-3 w-1/2" type="text" id="height" name="height" />
                <label htmlFor="height" className="self-end font-semibold">
                  cm
                </label>
              </div>
              <div className="flex">
                <input className="input-box mr-3 w-1/2" type="text" id="weight" name="weight" />
                <label htmlFor="weight" className="self-end font-semibold">
                  kg
                </label>
              </div>
            </div>
          </section>
          <section className="mb-6 flex flex-row">
            <label htmlFor="keyword" className="mr-7 pt-1 font-semibold">
              이미지 키워드
              <div className="text-xs font-medium leading-7 text-gray">최대 3개</div>
            </label>
            <div>
              <div className="flex flex-row gap-2">
                {KEYWORDS.slice(0, 4).map((keyword, index) => (
                  <button key={index} className="select-btn-default">
                    {keyword}
                  </button>
                ))}
              </div>
              <div className="mt-2 flex flex-row gap-2">
                {KEYWORDS.slice(4, 8).map((keyword, index) => (
                  <button key={index + 4} className="select-btn-default">
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          </section>
          <section className="mb-6">
            <label htmlFor="keyword" className="pt-1 font-semibold">
              자기소개
              <span className="ml-3 text-xs font-medium leading-7 text-gray">최대 200자</span>
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
              <div className="grid grid-cols-4">
                <div className="flex items-center">
                  <input
                    className="input-box mr-3 w-3/5"
                    type="text"
                    id="exp-year"
                    name="exp-year"
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
                  placeholder="활동 내용 소개 (최대 50자)"
                />
              </div>
              <div className="grid grid-cols-4">
                <div className="flex items-center">
                  <input
                    className="input-box mr-3 w-3/5"
                    type="text"
                    id="exp-year"
                    name="exp-year"
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
                  placeholder="활동 내용 소개 (최대 50자)"
                />
              </div>
              {/* TODO: add button 클릭시 div 추가 */}
              <button className="hover:btn-addsign-hover btn-addsign">+</button>
            </div>
          </section>
          <div className="flex justify-end">
            <button className="btn-default">등록하기</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default EditProfile
