import React from 'react'
import RatioImgContainer from '../mypage/RatioImgContainer'

const ProposedProfile = () => {
  return (
    <div className="grid w-full grid-cols-3 gap-4">
      <RatioImgContainer imgSrc="/profile_img.png" width="col-span-1" radius="rounded-2xl" />
      <section className="col-span-2 flex flex-col justify-between py-2">
        <div className="tag">모델</div>
        <div>
          <div className="text-lg font-semibold">진영</div>
          <div className="text-sm text-darkgray">18* cm 7*kg | 24살</div>
        </div>
        <div className="flex flex-row gap-3">
          <div className="keyword">🫧 깨끗한</div>
          <div className="keyword">🥃 성숙한</div>
          <div className="keyword">🐈‍⬛ 시크한</div>
        </div>
        <button className="btn-default w-1/2">대화하기</button>
      </section>
    </div>
  )
}

export default ProposedProfile
