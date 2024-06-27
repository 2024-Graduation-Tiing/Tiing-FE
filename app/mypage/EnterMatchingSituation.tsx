import React from 'react'
import RatioImgContainer from './RatioImgContainer'

//
//
//

interface EnterMatchingSituationProps {
  isOnProcess?: boolean
  isMatched?: boolean
}

//
//
//

const EnterMatchingSituation = ({ isOnProcess, isMatched }: EnterMatchingSituationProps) => {
  /** 받을 props
   * profile image src
   * isOnProcess
   * deadline
   * brand name
   * title
   * **/
  const renderCover = () => {
    if (isMatched) {
      return (
        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl bg-black bg-opacity-60">
          <img src="/mypage_matchingstate_icon_blue.svg" alt="state_icon" className="block" />
          <div className="text-md font-semibold text-blue">매칭 성공</div>
        </div>
      )
    }

    if (isOnProcess) {
      return <div className="card-label absolute left-2 top-2">진행중</div>
    } else if (isOnProcess === false) {
      return (
        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl bg-black bg-opacity-60">
          <img src="/mypage_matchingstate_icon_gray.svg" alt="state_icon" className="block" />
          <div className="text-md font-semibold text-[#CDCDCD]"> 캐스팅 마감</div>
        </div>
      )
    }

    return <></>
  }

  return (
    <div className="my-4 grid grid-cols-3 gap-4">
      <section className="relative col-span-1">
        {renderCover()}
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
