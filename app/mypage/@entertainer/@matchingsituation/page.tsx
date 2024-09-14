'use client'

import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PaginatedItems from './PaginatedItems'

//
//
//

const queryClient = new QueryClient()

export default function MatchingSituation() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaginatedItems />
    </QueryClientProvider>
  )
}
