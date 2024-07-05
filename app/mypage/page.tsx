import React from 'react'
import Entertainer from './Entertainer'
import Scouter from './Scouter'

//
//
//

interface MypageProps {
  role: boolean
}

//
//
//

// user role에 따라 conditional routes
export default function Mypage({ role }: MypageProps) {
  role = false
  return <div>{role ? <Entertainer /> : <Scouter />}</div>
}
