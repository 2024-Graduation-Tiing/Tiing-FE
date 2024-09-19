'use client';

import { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';
import { useSearchParams } from 'next/navigation';

//
//
//

type DynamicObject = { [key: string]: string };

interface ProfileInfo {
  id: number;
  name: string;
  image: string;
  keywords: DynamicObject;
  fields: string[];
  description: string;
}

interface ProposalInfo {
  id: number;
  title: string;
  company: string;
  fields: DynamicObject;
  gender_requirement: string;
  keyword: DynamicObject;
  description: string;
}

type ParamsObject = {
  [key: string]: string[];
};

//
//
//

export default async function Profiles() {
  const [profileItems, setProfileItems] = useState<ProfileInfo[]>([]);
  const [proposalItems, setProposalItems] = useState<ProposalInfo[]>([]);
  const [allItems, setAllItems] = useState<(ProfileInfo | ProposalInfo)[]>([]);

  const searchParams = useSearchParams();

  /**
   *
   */
  const getURLParams = (params: URLSearchParams) => {
    const paramsObj: ParamsObject = {};
    params.forEach((value, key) => {
      if (!paramsObj[key]) {
        paramsObj[key] = [];
      }
      paramsObj[key].push(value);
    });
    console.log('paramsObj:', paramsObj);
    return paramsObj;
  };

  /**
   *
   */
  const convertObjectToQueryString = (obj: ParamsObject) => {
    const queryString = Object.entries(obj)
      .map(([key, values]) =>
        values
          .map(
            (value: string) =>
              `${key}=${value}`,
          )
          .join('&'),
      )
      .join('&');
    console.log('queryString:', queryString);
    return queryString;
  };

  /**
   *
   */
  const fetchItems = async () => {
    try {
      const requestParams = searchParams
        ? convertObjectToQueryString(getURLParams(searchParams))
        : null;
      const res = await fetch(`/api/list?${requestParams}`, {
        method: 'GET',
      });
      if (res.ok) {
        const items = await res.json();
        console.log('요청 성공', items);
        return items;
      }
    } catch (err) {
      console.error('요청 실패', err);
    }
  };

  /**
   *
   */
  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (searchParams) getURLParams(searchParams);
  }, [searchParams]);

  return (
    <div className="mt-10 grid grid-cols-5 gap-[24px]">
      {/* {profileInfo.map((item: ProfileInfo) => (
        <div key={item.id}>
          <ProfileCard {...item} />
        </div>
      ))} */}
    </div>
  );
}
