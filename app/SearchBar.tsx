'use client';

import React from 'react';
import FilterIcon from '../public/header_filter.svg';

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
  return (
    <div className="ml-20 flex h-[44px] w-[600px] items-center justify-between rounded-16 bg-lightblue">
      <div className="ml-5 flex items-center">
        <img src="/header_search.svg" className="h-[20px] w-[20px]" />
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="ml-3.5 bg-transparent text-sm outline-0"
        />
      </div>
      <FilterIcon
        stroke={isFilterOpen ? '#1E96FC' : '#999999'}
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="mr-6 cursor-pointer"
      />
    </div>
  );
};

export default SearchBar;
