import React from 'react'
import RatioImgContainer from './RatioImgContainer'

//
//
//

interface EnterMatchingSituationProps {
  isOnProcess: boolean
}

//
//
//

const EnterMatchingSituation = ({ isOnProcess }: EnterMatchingSituationProps) => {
  /** 받을 props
   * profile image src
   * isOnProcess
   * deadline
   * brand name
   * title
   * **/
  return (
    <div className="my-4 grid grid-cols-3 gap-4">
      <section className="col-span-1">
        {/* 조건부 렌더링 ->  isOnProcess ? <div>진행중</div> */}
        <RatioImgContainer
          width="w-full"
          radius="rounded-2xl"
          imgSrc="/mypage_proposal_dummy.jpeg"
        />
      </section>
      <section className="col-span-2 flex flex-col justify-between">
        <div>
          <div className="mb-3 text-sm text-slate-500">
            <span>마감</span>
            <span>D-20</span>
          </div>
          <div className="text-sm text-slate-500">VERSED 코리아</div>
          <div className="text-lg font-medium">코스메틱 제품 인스타그램 홍보 포스팅</div>
        </div>
        {isOnProcess ? <button className="btn-default w-1/2">채팅하기</button> : <div></div>}
      </section>
    </div>
  )
}

export default EnterMatchingSituation
