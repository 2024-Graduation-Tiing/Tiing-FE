import React from 'react'
import RatioImgContainer from '../../RatioImgContainer'

//
//
//

export default function MatchingHistory() {
  return (
    <section className="col-span-3">
      <div className="font-semibold">
        <div className="text-xl">안녕하세요,</div>
        <div className="text-2xl">
          <span className="font-bold">박지영</span>&nbsp;스카우터님
        </div>
      </div>
      <section className="mt-9">
        <div className="mb-4 text-xl font-semibold">매칭 내역</div>
        <div className="mb-8 w-full">
          <div className="mb-2 text-darkgray">2024.3</div>
          <div className="grid w-full grid-cols-3 gap-3">
            <RatioImgContainer imgSrc="/mypage_proposal_dummy.jpeg" radius="rounded-xl" />
            <RatioImgContainer imgSrc="/mypage_proposal_dummy.jpeg" radius="rounded-xl" />
            <RatioImgContainer containerStyle="flex flex-col justify-around">
              <section>
                <div className="mb-2 font-medium text-darkgray">제안</div>
                <div className="text-lg font-medium">맥도날드 코리아</div>
              </section>
              <section>
                <div className="mb-2 font-medium text-darkgray">캐스팅</div>
                <div className="text-lg font-medium">임동현</div>
              </section>
            </RatioImgContainer>
          </div>
        </div>
      </section>
    </section>
  )
}
