import React from 'react'
import { Breadcrumbs, Link } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import EditProfile from './EditProfile'
import EditProposal from './EditProposal'

//
//
//

interface Editprops {
  isEntertainer?: boolean
  isScouter?: boolean
}

// TODO: react-query 사용해서 proposal/[id] 별 정보 불러오기
// TODO: 새로 등록하기일 땐 어떻게?

export default function Edit({ isEntertainer, isScouter }: Editprops) {
  return (
    <div className="px-52 pt-10">
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          홈
        </Link>
        <Link underline="hover" color="inherit" href="/mypage">
          마이페이지
        </Link>
        <Link underline="hover" color="inherit" href="/edit">
          {/* TODO: 조건부 렌더링 필요 */}
          {/* {isEntertainer ? `프로필 관리` : ``}
          {isScouter ? `제안서 관리` : ``} */}
          제안서 관리
        </Link>
      </Breadcrumbs>
      {/* TODO: 조건부 렌더링 필요 */}
      {/* {isEntertainer ? <EditProfile /> : <></>}
      {isScouter ? <EditProposal /> : <></>} */}
      <EditProposal />
    </div>
  )
}
