import React from 'react'
import EnterMatchingSituation from './EnterMatchingSituation'

//
//
//

export default function MatchingSituation() {
  return (
    <section className="flex basis-2/5 flex-col pl-10">
      <section className="align-start flex flex-row justify-between">
        <div className="text-lg font-semibold">매칭 현황</div>
        {/* <div className="text-slate-400">&lt;&ensp; 1/10 &ensp;&gt;</div> */}
        {/* TODO: Custom <Pagination /> */}
      </section>
      {/* TODO: 매칭 현황 컴포넌트 리스트 */}
      <div>
        <EnterMatchingSituation isOnProcess={true} />
        <EnterMatchingSituation isOnProcess={false} />
        <EnterMatchingSituation isMatched={true} />
      </div>
    </section>
  )
}
