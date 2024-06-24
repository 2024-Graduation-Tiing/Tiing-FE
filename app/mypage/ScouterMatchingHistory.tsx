import React from 'react'
import RatioImgContainer from './RatioImgContainer'

//
//
//

interface MatchingHistoryProps {
  date: String
  tittle: String
  enterName: String
}

//
//
//

const ScouterMatchingHistory = () => {
  return (
    <div className="mb-8 w-full">
      <div className="mb-2 text-darkgray">2024.3</div>
      <div className="grid w-full grid-cols-3 gap-3">
        <RatioImgContainer imgSrc="/mypage_proposal_dummy.jpeg" radius="rounded-xl" />
        <RatioImgContainer imgSrc="/mypage_proposal_dummy.jpeg" radius="rounded-xl" />
        <RatioImgContainer containerStyle="flex flex-col justify-around">
          <section>
            <div className="mb-2 text-darkgray">제안</div>
            <div className="text-lg">맥도날드 코리아</div>
          </section>
          <section>
            <div className="mb-2 text-darkgray">캐스팅</div>
            <div className="text-lg">임동현</div>
          </section>
        </RatioImgContainer>
      </div>
    </div>
  )
}

export default ScouterMatchingHistory
