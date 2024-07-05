import React from 'react'
import EditProfile from './EditProfile'
import EditProposal from './EditProposal'

//
//
//

interface Editprops {
  role: boolean
}

// TODO: 새로 등록하기일 땐 어떻게?

export default function Edit({ role }: Editprops) {
  role = false
  return (
    <div>
      {/* TODO: 조건부 렌더링 필요 */}
      {role ? <EditProfile /> : <EditProposal />}
    </div>
  )
}
