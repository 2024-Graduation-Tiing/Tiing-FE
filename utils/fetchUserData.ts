import React from 'react';
import useSWR from 'swr';
import { fetcher } from './fetcher';
import { GetApiUserDetail } from '@/typings/type';

//
//
//

interface FetchUserData {
  data: GetApiUserDetail;
  error: any;
  mutate: () => void;
}

/**
 * `/api/user/detail` API에 대한 데이터 패칭 함수
 * @returns { GetApiUserDetail } data - role, memberId가 담긴 유저 정보 (=`/api/user/detail` API 요청에 대한 response data)
 * @returns { () => void } mutate - 변경된 데이터를 업데이트하는 함수 (`data`가 변경되었을 때 혹은 변경이 예상될 때 호출)
 * @example
 * ```jsx
 * const { data: user, mutate } = fetchUserData();
 * if (user.role) {
 *   mutate();
 * }
 * ```
 */
const fetchUserData = (): FetchUserData => {
  const { data, error, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_SPRING_URL}/api/user/detail`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      dedupingInterval: 6000000,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (error.status === 404) return;
        if (retryCount >= 10) return;
      },
    },
  );

  return { data, error, mutate };
};

export default fetchUserData;
