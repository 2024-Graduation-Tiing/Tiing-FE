'use client';

import { FILTERS } from '@/app/lib/filters';
import { useSearchParams, useRouter } from 'next/navigation';

//
//
//

export default function Filter() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams?.toString());
  const router = useRouter();

  /**
   *
   */
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const clickedItem = e.currentTarget.textContent;
    const clickedCategory =
      e.currentTarget.parentElement?.firstChild?.textContent;

    if (clickedItem && clickedCategory) {
      if (searchParams?.getAll(clickedCategory).includes(clickedItem)) {
        const currentValues = params.getAll(clickedCategory);
        const updatedValues = currentValues.filter(
          (value) => value !== clickedItem,
        );
        params.delete(clickedCategory);
        updatedValues.forEach((value) => params.append(clickedCategory, value));
      } else {
        params.append(clickedCategory, clickedItem);
      }
      router.replace(`?${params.toString()}`);
    }
  };

  return (
    <div className="w-[1200px] rounded-16 bg-lightblue px-10 py-6">
      {Object.entries(FILTERS).map(([key, value]) => (
        <div className="mb-3 flex items-center" key={key}>
          <h3 className="text-md mr-10">{value.title}</h3>
          {value.options.map((option) => (
            <button
              className={`${searchParams?.getAll(value.title).includes(option.name) ? 'select-btn-selected' : 'select-btn-default border-0'} mr-4`}
              key={option.id}
              onClick={handleClick}
            >
              {option.name}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
