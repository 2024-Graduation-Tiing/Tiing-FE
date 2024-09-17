'use client';

import React, { useEffect, useState } from 'react';
import FilterIcon from '../public/header_filter.svg';
import { useSearchParams } from 'next/navigation';
import { useDebounce } from './hooks/useDebounce';
import { useRouter } from 'next/navigation';

//
//
//

interface SearchBarProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
}

//
//
//

const SearchBar: React.FC<SearchBarProps> = ({
  isFilterOpen,
  setIsFilterOpen,
}) => {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500);

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams?.toString());
  const router = useRouter();

  /**
   *
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    console.log('inputValue:', inputValue);
  };

  /**
   *
   */
  const handleUrlQuery = () => {
    if (searchParams?.has('search')) {
      params.set('search', debouncedValue);
    } else {
      if (debouncedValue) params.append('search', debouncedValue);
    }
    router.replace(`?${params.toString()}`);
  };

  /**
   *
   */
  useEffect(() => {
    handleUrlQuery();
    console.log('debouncedValue:', debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="ml-20 flex h-[44px] w-[600px] items-center justify-between rounded-16 bg-lightblue">
      <div className="ml-5 flex items-center">
        <img src="/header_search.svg" className="h-[20px] w-[20px]" />
        <input
          className="ml-3.5 bg-transparent text-sm outline-0"
          type="text"
          placeholder="검색어를 입력하세요"
          value={inputValue}
          onChange={handleChange}
        />
      </div>
      <FilterIcon
        stroke={isFilterOpen ? '#1E96FC' : '#999999'}
        className="mr-6 cursor-pointer"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      />
    </div>
  );
};

export default SearchBar;
