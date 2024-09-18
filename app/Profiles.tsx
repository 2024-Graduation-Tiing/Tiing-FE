'use client';

import { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';

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

//
//
//

export default async function Profiles() {
  const [profileItems, setProfileItems] = useState<ProfileInfo[]>([]);
  const [proposalItems, setProposalItems] = useState<ProposalInfo[]>([]);
  const [allItems, setAllItems] = useState<(ProfileInfo | ProposalInfo)[]>([]);

  const fetchItems = async () => {
    try {
      const res = await fetch(`/api/list`, {
        method: 'GET',
      });
      if (res.ok) {
        const items = await res.json();
        console.log('fetch datas:', items);
        return items;
      }
    } catch (err) {
      console.error('Failed to fetch items:', err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

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
