import React from 'react'
import RatioImgContainer from '../../RatioImgContainer'

//
//
//

interface EnterMatchingSituationProps {
  matchInfo: {
    id: number
    image: string
    end_date: Date
    company: string
    title: string
    matched: boolean
  }
}

//
//
//

const EnterMatchingSituation = ({ matchInfo }: EnterMatchingSituationProps) => {
  const today = new Date()

  const renderCover = () => {
    if (matchInfo.matched) {
      return (
        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl bg-black bg-opacity-60">
          <img src="/mypage_matchingstate_icon_blue.svg" alt="state_icon" className="block" />
          <div className="text-md font-semibold text-blue">매칭 성공</div>
        </div>
      )
    }

    if (!matchInfo.matched) {
      if (matchInfo.end_date > today) {
        return <div className="card-label absolute left-2 top-2">진행중</div>
      } else {
        return (
          <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl bg-black bg-opacity-60">
            <img src="/mypage_matchingstate_icon_gray.svg" alt="state_icon" className="block" />
            <div className="text-md font-semibold text-[#CDCDCD]"> 캐스팅 마감</div>
          </div>
        )
      }
    }
  }

  const calculateDDay = (endDate: Date, today: Date) => {
    const timeDiff = endDate.getTime() - today.getTime()
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) // 일 단위로 변환
    return dayDiff
  }

  return (
    <div className="my-4 grid grid-cols-3 gap-4">
      <section className="relative col-span-1">
        {renderCover()}
        <RatioImgContainer width="w-full" radius="rounded-2xl" imgSrc={matchInfo.image} />
      </section>
      <section className="col-span-2 flex flex-col justify-between">
        <div>
          <div className="mb-3 text-sm text-slate-500">
            <span>마감</span>
            <span>D-{calculateDDay(matchInfo.end_date, today)}</span>
          </div>
          <div className="text-sm text-slate-500">{matchInfo.company}</div>
          <div className="text-lg font-medium">{matchInfo.title}</div>
        </div>
        {!matchInfo.matched && matchInfo.end_date > today ? (
          <button className="btn-default w-1/2">채팅하기</button>
        ) : (
          <div></div>
        )}
      </section>
    </div>
  )
}

export default EnterMatchingSituation
