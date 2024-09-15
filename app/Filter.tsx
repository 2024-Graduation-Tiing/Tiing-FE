'use client';

import { FILTERS } from '@/app/lib/filters';

//
//
//

export default function Filter() {
  return (
    <div className="w-[1200px] rounded-16 bg-lightblue px-10 py-6">
      {Object.entries(FILTERS).map(([key, value]) => (
        <div className="mb-3 flex items-center" key={key}>
          <h3 className="text-md mr-10">{value.title}</h3>
          {value.options.map((option) => (
            <button className="select-btn-default mr-4 border-0">
              {option.name}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
