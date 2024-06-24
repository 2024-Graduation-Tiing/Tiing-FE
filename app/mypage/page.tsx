import React from 'react'
import Entertainer from './Entertainer'
import Scouter from './Scouter'
import { Breadcrumbs, Link } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

//
//
//

interface MypageProps {
  isEntertainer: boolean
  isScouter: boolean
}

//
//
//

export default function Mypage({ isEntertainer, isScouter }: MypageProps) {
  return (
    <div className="px-52 pt-10">
      <div className="mb-3 text-2xl font-semibold">My Page</div>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          홈
        </Link>
        <Link underline="hover" color="inherit" href="/mypage">
          마이페이지
        </Link>
      </Breadcrumbs>
      {/*
       *  조건부 렌더링 필요: 현재 로그인한 유저가 entertainer 인가 scouter인가 */}
      {/* <Entertainer /> */}
      <Scouter />
    </div>
  )
}
