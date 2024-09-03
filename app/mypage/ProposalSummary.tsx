import React from 'react'
import RatioImgContainer from './RatioImgContainer'

//
//
//

const ProposalSummary = () => {
  return (
    <div className="mb-8 grid w-full grid-cols-11 gap-5">
      <RatioImgContainer
        imgSrc="/mypage_proposal_dummy.jpeg"
        width="col-span-4"
        radius="rounded-xl"
      />
      <div className="col-span-7 grid grid-rows-7 gap-3 pr-1">
        <section className="row-span-3 grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <div className="mb-2 text-darkgray">구달</div>
            <div className="text-xl font-semibold">코스메틱 신제품 캠페인</div>
          </div>
          <div className="text-right text-gray">
            <span>04.30</span> 마감예정
          </div>
        </section>
        <section className="row-span-4 flex flex-col justify-between">
          <div className="flex flex-row justify-between">
            <div className="font-semibold text-blue">
              제안 프로필 목록 총 <span>6</span>명
            </div>
            <div className="text-gray">전체</div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <RatioImgContainer imgSrc="/profile_img.png" radius="rounded-lg" />
            <RatioImgContainer imgSrc="/profile_img.png" radius="rounded-lg" />
            <RatioImgContainer imgSrc="/profile_img.png" radius="rounded-lg" />
            <RatioImgContainer imgSrc="/profile_img.png" radius="rounded-lg" />
          </div>
        </section>
      </div>
    </div>
  )
}

export default ProposalSummary
