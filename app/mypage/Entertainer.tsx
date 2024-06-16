import React from 'react'
import RatioImgContainer from './RatioImgContainer'
import { Switch, FormControlLabel, Pagination, PaginationItem } from '@mui/material'
import Rate from './Rate'
import EnterMatchingSituation from './EnterMatchingSituation'

//
//
//

const Entertainer = () => {
  return (
    <div className="flex flex-row justify-between">
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
          <div className="text-xl font-medium leading-loose">
            <div>안녕하세요,</div>
            <div>
              <span className="text-3xl font-semibold">리쿠</span>&nbsp;님
            </div>
            <button className="btn-default mb-10 mt-3">프로필 수정하기</button>
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
      <section className="flex basis-2/5 flex-col pl-10" id="matching-situation">
        <section className="align-start flex flex-row justify-between">
          <div className="text-lg font-semibold">매칭 현황</div>
          <div className="text-slate-400">&lt;&ensp; 1/10 &ensp;&gt;</div>
          {/* TODO: Custom <Pagination /> */}
          {/* TODO: 매칭 현황 컴포넌트 리스트 */}
        </section>
        <div>
          <EnterMatchingSituation isOnProcess={true} />
          <EnterMatchingSituation isOnProcess={false} />
          <EnterMatchingSituation isOnProcess={false} />
        </div>
      </section>
    </div>
  )
}

export default Entertainer
