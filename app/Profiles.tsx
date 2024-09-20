'use client';

import { use, useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';
import { useSearchParams } from 'next/navigation';
import { v4 as uuid } from 'uuid';

//
//
//

type DynamicObject = { [key: string]: string };

interface ProfileInfo {
  type: string;
  id: string; // email
  title: string; // name
  image: string;
  keywords: DynamicObject;
  subtitle: string; // field
  description: string;
}

interface ProposalInfo {
  type: string;
  id: string; // id
  title: string; // title
  image: string;
  keywords: DynamicObject;
  subtitle: string; // company
  description: string;
}

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
  const [items, setItems] = useState<Info>({ profiles: [], proposals: [] });

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
          setItems(data);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const renderCards = () => {
    if (items.profiles) {
      return items.profiles.map((profile: any) => (
        <ProfileCard
          key={uuid()}
          type="profile"
          id={profile.entertainer_id}
          title={profile.name}
          image={profile['images']['1']}
          keywords={profile['keywords']}
          subtitle={JSON.stringify(profile.platforms)}
          description={profile.description}
        />
      ));
    }
    if (items.proposals) {
      return items.proposals.map((proposal: any) => (
        <ProfileCard
          key={uuid()}
          type="proposal"
          id={proposal.id}
          title={proposal.title}
          image={proposal.image}
          keywords={proposal.keywords}
          subtitle={proposal.company}
          description={proposal.description}
        />
      ));
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

  useEffect(() => {
    console.log('items', items.profiles);
    console.log(items.profiles.map((profile) => profile['keywords']));
  }, [items]);

  return (
    <div className="px-[10rem] mt-5 columns-5">
      {renderCards()}
    </div>
  );
}
