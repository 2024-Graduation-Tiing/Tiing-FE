'use client';

import { use, useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';
import { useSearchParams } from 'next/navigation';
import { v4 as uuid } from 'uuid';
import { ProfileInfo, ProposalInfo } from '../typings/type';

//
//
//

type DynamicObject = { [key: string]: string };

interface Info {
  profiles: ProfileInfo[];
  proposals: ProposalInfo[];
}

type ParamsObject = {
  [key: string]: string[];
};

//
//
//

export default function Profiles() {
  const [profileItems, setProfileItems] = useState<ProfileInfo[]>([]);
  const [proposalItems, setProposalItems] = useState<ProposalInfo[]>([]);
  const [items, setItems] = useState<(ProfileInfo | ProposalInfo)[]>([]);

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
        values.map((value: string) => `${key}=${value}`).join('&'),
      )
      .join('&');
    console.log('queryString:', queryString);
    return queryString;
  };

  /**
   *
   */
  const fetchItems = () => {
    try {
      console.log(searchParams);
      const requestParams = searchParams
        ? convertObjectToQueryString(getURLParams(searchParams))
        : null;
      console.log(requestParams);

      fetch(`/api/list?${requestParams}`, {
        method: 'GET',
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('요청 실패');
          }
        })
        .then((data) => {
          setProfileItems(data.profiles);
          setProposalItems(data.serializedProposals);
          setItems([...data.profiles, ...data.serializedProposals]);
          console.log('data:', items);
        });
    } catch (err) {
      console.error(err);
    }
  };

  /**
   *
   */
  const renderCards = () => {
    return items.map((item: any) =>
      item.name ? (
        <ProfileCard
          key={uuid()}
          type="profile"
          id={item.entertainer_id}
          title={item.name}
          image={item['images']['1']}
          keywords={item['keywords']}
          subtitle={JSON.stringify(item.platforms)}
          description={item.description}
        />
      ) : (
        <ProfileCard
          key={uuid()}
          type="proposal"
          id={item.id}
          title={item.title}
          image={item.image}
          keywords={item.keywords}
          subtitle={item.company}
          description={item.description}
        />
      ),
    );
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

  useEffect(() => {
    console.log('items', items);
  }, [items]);

  return <div className="px-[10rem] mt-5 columns-5">{renderCards()}</div>;
}
