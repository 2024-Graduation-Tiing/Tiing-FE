import React from 'react'
import RatioImgContainer from './RatioImgContainer'
import { Switch, FormControlLabel, Pagination, PaginationItem } from '@mui/material';
import Rate from './Rate';
import EnterMatchingSituation from './EnterMatchingSituation';
//
//
//
const Entertainer = () => {

  return (
    <div className="flex flex-row justify-between">
      <section className='basis-3/5 grid grid-cols-9 items-stretch box-border place-self-start mt-9' id="profile-section">
      {/* TODO: 첫번째 자식요소 height받아와서 parent의 height값으로 고정 */}
        <RatioImgContainer width="col-span-4" radius="rounded-3xl" imgSrc='/mypage_enter_dummy.jpeg' />
        <div className='col-span-5 pl-7 flex flex-col box-border' >
          <div className='text-xl font-medium leading-loose'>
            <div>안녕하세요,</div>
            <div>
              <span className='text-3xl font-semibold'>리쿠</span>&nbsp;님
            </div>
            <button className="btn-default mt-3 mb-10">프로필 수정하기</button>
          </div>
          <section className='flex-1 flex flex-col box-border' >
            <div className='flex flex-row justify-between items-center box-border mb-2'>
                <div className='text-lg font-semibold'>키워드별 매칭률</div>
                <FormControlLabel control={<Switch defaultChecked />} label="공개"  />
            </div>
            <Rate />
          </section>
        </div>
          
      </section>
      <section className='basis-2/5 pl-10 flex flex-col' id="matching-situation">
        <section className="flex flex-row justify-between align-start">
          <div className='text-lg font-semibold'>매칭 현황</div>
          <div className='text-slate-400'>&lt;&ensp; 1/10 &ensp;&gt;</div>
          {/* TODO: Custom <Pagination /> */}
        {/* TODO: 매칭 현황 컴포넌트 리스트 */}
        </section>
        <div>
          <EnterMatchingSituation isOnProcess={true}/>
          <EnterMatchingSituation isOnProcess={false}/>
          <EnterMatchingSituation isOnProcess={false}/>
        </div>
      </section>
    </div>
  )
}

export default Entertainer
