'use client'

import React from 'react'
import { GENDER, KEYWORDS, PLATFORMS, AGE } from '@/app/Filter'
import ProposedProfile from './ProposedProfile'
import RatioImgContainer from '../../RatioImgContainer'

//
//
//

const EditProposal = () => {
  return (
    <div className="col-span-full">
      <section className="grid grid-cols-8 gap-10">
        <div className="relative col-span-2">
          <RatioImgContainer
            imgSrc="/mypage_proposal_dummy.jpeg"
            radius="rounded-3xl"
            blur="blur-lg"
          />
          <RatioImgContainer
            imgSrc="/mypage_proposal_dummy.jpeg"
            width="w-full"
            radius="rounded-2xl"
            position="absolute inset-0"
          />
          <img
            src="/edit_image.svg"
            alt="edit_ic"
            className="absolute right-5 top-5 cursor-pointer opacity-30 hover:opacity-100"
          />
        </div>
        <div className="col-span-6">
          {/* TODO: implement onSubmit event https://nextjs.org/docs/pages/building-your-application/data-fetching/forms-and-mutations#examples*/}
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="mr-7 font-semibold">
                제안사 이름
              </label>
              <input className="input-box" type="text" id="name" name="name" />
            </div>
            <div className="mb-4">
              <label htmlFor="title" className="mr-7 font-semibold">
                제안서 제목
              </label>
              <input className="input-box w-1/2" type="text" id="title" name="title" />
            </div>
            <div className="mb-4 flex flex-row items-center">
              <label htmlFor="field" className="mr-7 font-semibold">
                분야
              </label>
              <div className="flex flex-row gap-3">
                {PLATFORMS.map((platfrom) => (
                  <button className="select-btn-default" key={platfrom}>
                    {platfrom}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4 flex flex-row">
              <label htmlFor="condition" className="mr-7 pt-1 font-semibold">
                조건
              </label>
              <div>
                <div className="flex flex-row gap-2">
                  {GENDER.map((gender) => (
                    <button className="select-btn-default" key={gender}>
                      {gender}
                    </button>
                  ))}
                </div>
                <div className="mt-2 flex flex-row gap-2">
                  {AGE.map((age) => (
                    <button className="select-btn-default" key={age}>
                      {age}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mb-4 flex flex-row">
              <label htmlFor="keyword" className="mr-7 pt-1 font-semibold">
                선호 이미지
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
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="mr-7 block font-semibold">
                제안 상세
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="block w-full rounded-12 border-[1px] border-lightgray p-4 text-sm outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button className="btn-default">등록하기</button>
            </div>
          </form>
        </div>
      </section>
      <section className="mt-6">
        <div className="mb-5 text-lg font-semibold">제안 프로필 목록</div>
        <div className="grid grid-cols-2 gap-14">
          <ProposedProfile />
          <ProposedProfile />
          <ProposedProfile />
        </div>
      </section>
    </div>
  )
}

export default EditProposal
