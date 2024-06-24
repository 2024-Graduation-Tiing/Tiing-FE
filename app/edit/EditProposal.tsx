import React from 'react'
import ProposedProfile from './ProposedProfile'
import RatioImgContainer from '../mypage/RatioImgContainer'

const EditProposal = () => {
  return (
    <div className="mt-8">
      <section className="grid grid-cols-8 gap-10">
        <div className="relative col-span-2">
          <RatioImgContainer
            imgSrc="/mypage_proposal_dummy.jpeg"
            radius="rounded-3xl"
            blur="blur-lg"
          />
          <RatioImgContainer
            imgSrc="/mypage_proposal_dummy.jpeg"
            width="w-full"
            radius="rounded-2xl"
            position="absolute inset-0"
          />
          <img
            src="/edit_image.svg"
            alt="edit_ic"
            className="absolute right-5 top-5 cursor-pointer opacity-30 hover:opacity-100"
          />
        </div>
        <div className="col-span-6">
          {/* TODO: implement onSubmit event https://nextjs.org/docs/pages/building-your-application/data-fetching/forms-and-mutations#examples*/}
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="mr-7 font-semibold">
                제안사 이름
              </label>
              <input className="input-box" type="text" id="name" name="name" />
            </div>
            <div className="mb-4">
              <label htmlFor="title" className="mr-7 font-semibold">
                제안서 제목
              </label>
              <input className="input-box w-1/2" type="text" id="title" name="title" />
            </div>
            <div className="mb-4 flex flex-row items-center">
              <label htmlFor="field" className="mr-7 font-semibold">
                분야
              </label>
              <div className="flex flex-row gap-2">
                <button className="select-btn-default">모델</button>
                <button className="select-btn-default">광고</button>
                <button className="select-btn-default">배우</button>
                <button className="select-btn-default">소속 오디션</button>
              </div>
            </div>
            <div className="mb-4 flex flex-row">
              <label htmlFor="condition" className="mr-7 pt-1 font-semibold">
                조건
              </label>
              <div>
                <div className="flex flex-row gap-2">
                  <button className="select-btn-default">10대</button>
                  <button className="select-btn-default">20대</button>
                  <button className="select-btn-default">30대</button>
                  <button className="select-btn-default">40대 +</button>
                </div>
                <div className="mt-2 flex flex-row gap-2">
                  <button className="select-btn-default">여성</button>
                  <button className="select-btn-default">남성</button>
                </div>
              </div>
            </div>
            <div className="mb-4 flex flex-row">
              <label htmlFor="keyword" className="mr-7 pt-1 font-semibold">
                선호 이미지
                <div className="text-xs font-medium leading-7 text-gray">최대 3개</div>
              </label>
              <div>
                <div className="flex flex-row gap-2">
                  <button className="select-btn-default">🫧 깨끗한</button>
                  <button className="select-btn-default">🌱 풋풋한</button>
                  <button className="select-btn-default">🐈‍⬛ 시크한</button>
                  <button className="select-btn-default">☕️ 따뜻한</button>
                </div>
                <div className="mt-2 flex flex-row gap-2">
                  <button className="select-btn-default">🥃 성숙한</button>
                  <button className="select-btn-default">🎀 키치한</button>
                  <button className="select-btn-default">👓 지적인</button>
                  <button className="select-btn-default">🏄 스포티한</button>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="mr-7 block font-semibold">
                제안 상세
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="block w-full rounded-12 border-[1px] border-lightgray p-4 text-sm outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button className="btn-default">등록하기</button>
            </div>
          </form>
        </div>
      </section>
      <section className="mt-6">
        <div className="mb-5 text-lg font-semibold">제안 프로필 목록</div>
        <div className="grid grid-cols-2 gap-14">
          <ProposedProfile />
          <ProposedProfile />
          <ProposedProfile />
        </div>
      </section>
    </div>
  )
}

export default EditProposal
