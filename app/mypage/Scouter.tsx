import React from 'react'
import ScouterMatchingHistory from './ScouterMatchingHistory'
import ProposalSummary from './ProposalSummary'

//
//
//

const Scouter = () => {
  return (
    <div className="mt-10 grid grid-cols-7 gap-14">
      <section className="col-span-3">
        <div className="font-bold">
          <div className="text-xl">안녕하세요,</div>
          <div className="text-2xl">
            <span>박지영</span>디렉터님
          </div>
        </div>
        <section className="mt-8">
          <div className="mb-4 text-xl font-bold">매칭 내역</div>
          <ScouterMatchingHistory />
          <ScouterMatchingHistory />
        </section>
      </section>
      <section className="col-span-4 pl-4">
        <div className="mb-4 flex flex-row justify-between">
          <div className="text-xl font-bold">제안서 관리</div>
          <button className="btn-default">새로 등록하기</button>
        </div>
        <ProposalSummary />
        <ProposalSummary />
      </section>
    </div>
  )
}

export default Scouter
