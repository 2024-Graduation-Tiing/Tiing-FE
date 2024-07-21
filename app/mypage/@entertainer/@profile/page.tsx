import React from 'react'
import RatioImgContainer from '../../RatioImgContainer'
import Link from 'next/link'
import { FormControlLabel, Switch } from '@mui/material'
import Rate from './Rate'

export default function Profile() {
  return (
    <section
      className="mt-9 box-border grid basis-3/5 grid-cols-9 items-stretch place-self-start"
      id="profile-section"
    >
      {/* TODO: 첫번째 자식요소 height받아와서 parent의 height값으로 고정 */}
      <RatioImgContainer
        width="col-span-4"
        radius="rounded-3xl"
        imgSrc="/mypage_enter_dummy.jpeg"
      />
      <div className="col-span-5 box-border flex flex-col pl-7">
        <div className="text-xl font-medium font-semibold leading-loose">
          <div>안녕하세요,</div>
          <div>
            <span className="text-3xl font-bold">리쿠</span>&nbsp;님
          </div>
          <Link href="/mypage/edit">
            <button className="btn-default mb-10 mt-3">프로필 수정하기</button>
          </Link>
        </div>
        <section className="box-border flex flex-1 flex-col">
          <div className="mb-2 box-border flex flex-row items-center justify-between">
            <div className="text-lg font-semibold">키워드별 매칭률</div>
            <FormControlLabel control={<Switch defaultChecked />} label="공개" />
          </div>
          <Rate />
        </section>
      </div>
    </section>
  )
}
