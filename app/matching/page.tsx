import React from 'react';
import ScrollProfile from './ScrollProfile';
import RatioImgContainer from '../mypage/RatioImgContainer';
// 
// 
// 
interface iconProps{
  top:String,
  left:String
}
const page = () => {

  const renderBackground=()=>{
    return (
      <div className='absolute top-0 overflow-hidden'>
        <div className='w-screen h-[100vh] bg-gradient-diagonal from-navy from-10% via-blue via-mint to-yellow'>
        </div>
        <div className='absolute w-150 h-[100vh] top-[28rem] -left-56 blur-3xl bg-white'>
        </div>
      </div>
    )
  }

  const renderCardsBox=()=>{
    return (
      <div className='mx-52 grid grid-cols-6 mt-20' >
      <div className='col-span-4 relative flex flex-row gap-7 px-24' >
        <div className=''>
          <RatioImgContainer width='w-full' radius='rounded-3xl' imgSrc='./mypage_enter_dummy.jpeg'/>
        </div>
        <div className=''>
          <RatioImgContainer width='w-full' radius='rounded-3xl' imgSrc='./mypage_proposal_dummy.jpeg'/>
        </div>
      </div>
      <div className='col-span-2 flex flex-col justify-center'>
        <div className='flex flex-row justify-evenly items-stretch' >
          <div className='self-center pt-7 text-right text-white text-2xl'>
            <span className='font-extrabold'>리쿠&nbsp;</span>
            <span className='font-bold'>님과의</span>
          </div>
            <img className='w-' src='matching_text_logo.svg'/>
        </div>
        <div className='pt-5'>
          <button className='w-full py-3 rounded-2xl bg-black/30 text-medium text-white font-bold'>제안 전송하기</button>
          <div className='text-gray text-sm leading-8	text-center'>지금 제안을 미루고 이후 채팅에서 전송할 수도 있어요!</div>
        </div>
    </div>
    
  </div>
    )
  }

  const renderIcon=({top, left}:iconProps)=>{
    const tailwindStyle=`absolute top-${top} left-${left} bg-white`
    return(
      <div className={tailwindStyle}>
        <img src='/matching_back_icon.svg'/>
      </div>
    )
  }

  return (
    <div className='relative'>
      {renderBackground()}
      <div className='absolute top-0 w-full'>
        {renderCardsBox()}
        <div className='z-2 flex justify-center mt-16'>
          <img src='/matching_scroll_arrow.svg' alt='arrow_icon'/>
        </div>
        <div className='px-52'>
          <ScrollProfile/>
        </div>
      </div>
    </div>
  );
};

export default page;