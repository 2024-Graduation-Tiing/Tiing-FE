'use client'

import React from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import RatioImgContainer from '../mypage/RatioImgContainer'

//
//
//

const ScrollProfile = () => {
  useEffect(() => {
    AOS.init({
      offset: 150,
    })
  }, [])

  const renderCard = (imgSrc: String) => {
    return (
      <div className="">
        <RatioImgContainer width="w-full" imgSrc={imgSrc} radius="rounded-xl" />
      </div>
    )
  }

  return (
    <div>
      <div className="my-10 text-center text-lg font-bold">프로필 더 찾아보기</div>
      <div
        className="z-10 grid grid-cols-5 gap-4 bg-white pt-5"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-easing="ease"
      >
        {renderCard('/matching_person_dummy.jpeg')}
        {renderCard('/matching_person_dummy.jpeg')}
        {renderCard('/matching_person_dummy.jpeg')}
        {renderCard('/matching_person_dummy.jpeg')}
        {renderCard('/matching_person_dummy.jpeg')}
        {renderCard('/matching_person_dummy.jpeg')}
        {renderCard('/matching_person_dummy.jpeg')}
        {renderCard('/matching_person_dummy.jpeg')}
        {renderCard('/matching_person_dummy.jpeg')}
        {renderCard('/matching_person_dummy.jpeg')}
      </div>
    </div>
  )
}

export default ScrollProfile
