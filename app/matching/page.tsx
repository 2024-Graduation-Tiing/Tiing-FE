import React from 'react'
import ScrollProfile from './ScrollProfile'
import RatioImgContainer from '../mypage/RatioImgContainer'

//
//
//

interface iconProps {
  top: String
  left: String
}

//
//
//

const page = () => {
  const renderBackground = () => {
    return (
      <div className="absolute top-0 overflow-hidden">
        <div className="h-[100vh] w-screen bg-gradient-diagonal from-navy from-10% via-blue via-mint to-yellow"></div>
        <div className="absolute -left-56 top-[28rem] h-[100vh] w-150 bg-white blur-3xl"></div>
      </div>
    )
  }

  const renderCardsBox = () => {
    return (
      <div className="mx-52 mt-20 grid grid-cols-6">
        <div className="relative col-span-4 flex flex-row gap-7 px-24">
          <div className="">
            <RatioImgContainer
              width="w-full"
              radius="rounded-3xl"
              imgSrc="./mypage_enter_dummy.jpeg"
            />
          </div>
          <div className="">
            <RatioImgContainer
              width="w-full"
              radius="rounded-3xl"
              imgSrc="./mypage_proposal_dummy.jpeg"
            />
          </div>
        </div>
        <div className="col-span-2 flex flex-col justify-center">
          <div className="flex flex-row items-stretch justify-evenly">
            <div className="self-center pt-7 text-right text-2xl text-white">
              <span className="font-extrabold">리쿠&nbsp;</span>
              <span className="font-bold">님과의</span>
            </div>
            <img className="w-" src="matching_text_logo.svg" />
          </div>
          <div className="pt-5">
            <button className="text-medium w-full rounded-2xl bg-black/30 py-3 font-bold text-white">
              제안 전송하기
            </button>
            <div className="text-center text-sm leading-8	text-gray">
              지금 제안을 미루고 이후 채팅에서 전송할 수도 있어요!
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderIcon = ({ top, left }: iconProps) => {
    const tailwindStyle = `absolute top-${top} left-${left} bg-white`
    return (
      <div className={tailwindStyle}>
        <img src="/matching_back_icon.svg" />
      </div>
    )
  }

  return (
    <div className="relative">
      {renderBackground()}
      <div className="absolute top-0 w-full">
        {renderCardsBox()}
        <div className="z-2 mt-16 flex justify-center">
          <img src="/matching_scroll_arrow.svg" alt="arrow_icon" />
        </div>
        <div className="px-52">
          <ScrollProfile />
        </div>
      </div>
    </div>
  )
}

export default page
