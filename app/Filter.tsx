'use client'

import React from 'react'

//
//
//

const GENDER = ['남자', '여자']
const AGE = ['10대', '20대', '30대', '40대', '50대 +']
const PLATFORMS = ['배우', '모델/광고', '인플루언서', '소속 오디션']
const KEYWORDS = [
  '☕️ 따뜻한',
  '🫧 깨끗한',
  '🌱 풋풋한',
  '🐈‍⬛ 시크한',
  '🥃 성숙한',
  '👓 지적인',
  '️🤾🏻‍♂️ 스포티한',
  '🎀 키치한',
]

//
//
//

export default function Filter() {
  return (
    <div className="w-[1200px] rounded-16 bg-lightblue px-10 py-6">
      <div className="mb-3 flex items-center">
        <h3 className="text-md mr-10">성별</h3>
        {GENDER.map((gender, i) => (
          <button className="select-btn-default mr-4 border-0">{gender}</button>
        ))}
      </div>
      <div className="mb-3 flex items-center">
        <h3 className="text-md mr-10">연령대</h3>
        {AGE.map((age) => (
          <button className="select-btn-default mr-4 border-0">{age}</button>
        ))}
      </div>
      <div className="mb-3 flex items-center">
        <h3 className="text-md mr-10">분야</h3>
        {PLATFORMS.map((platfrom) => (
          <button className="select-btn-default mr-4 border-0">{platfrom}</button>
        ))}
      </div>
      <div className="flex items-center">
        <h3 className="text-md mr-10">이미지 키워드</h3>
        {KEYWORDS.map((keyword) => (
          <button className="select-btn-default mr-4 border-0">{keyword}</button>
        ))}
      </div>
    </div>
  )
}

export { GENDER, AGE, PLATFORMS, KEYWORDS }
