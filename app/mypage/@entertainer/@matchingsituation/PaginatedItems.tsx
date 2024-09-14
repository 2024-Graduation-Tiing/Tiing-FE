'use client'

import React, { useEffect, useState } from 'react'
import { NavigateBeforeRounded, NavigateNextRounded } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query'
import EnterMatchingSituation from './EnterMatchingSituation'

//
//
//

const fetchMatches = async (
  page = 0,
): Promise<{
  matches: Array<{
    id: number
    scouter_id: string
    entertainer_id: string
    proposal_id: string
    matched: boolean
    proposal: {
      company: string
      end_date: string
      image: string | undefined
      title: string
    }
  }>
  totalPages: number
  hasMore: boolean
}> => {
  const res = await fetch(`/api/matches/paginated?page=${page}`)
  if (!res.ok) {
    // HTTP status가 2xx가 아닌 경우
    throw new Error(`Failed to fetch data: ${res.statusText}`)
  }
  return await res.json()
}

const PaginatedItems = () => {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const { status, data, error, isFetching, isPlaceholderData } = useQuery({
    queryKey: ['matches', page],
    queryFn: () => fetchMatches(page),
    placeholderData: keepPreviousData,
  })

  // 다음 페이지 prefetch
  useEffect(() => {
    if (!isPlaceholderData && data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ['matches', page + 1],
        queryFn: () => fetchMatches(page + 1),
      })
    }
  }, [data, isPlaceholderData, page, queryClient])
  return (
    <section className="flex flex-col">
      <section className="align-start flex flex-row justify-between">
        <div className="text-lg font-semibold">매칭 현황</div>
        <div className="flex items-center text-slate-400">
          <IconButton
            size="small"
            sx={{ color: 'rgb(148 163 184)' }}
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            <NavigateBeforeRounded />
          </IconButton>
          <div>
            <span>{page}</span> {/* current page number */}
            <span className="mx-1">/</span>
            <span>{data?.totalPages}</span> {/* total page number */}
          </div>
          <IconButton
            size="small"
            sx={{ color: 'rgb(148 163 184)' }}
            disabled={!data?.hasMore}
            onClick={() => setPage((prev) => prev + 1)}
          >
            <NavigateNextRounded />
          </IconButton>
        </div>
      </section>
      {/*  매칭 현황 컴포넌트 리스트 */}
      <div>
        {data?.matches.map((match) => <EnterMatchingSituation matchInfo={match} key={match.id} />)}
      </div>
    </section>
  )
}

export default PaginatedItems
