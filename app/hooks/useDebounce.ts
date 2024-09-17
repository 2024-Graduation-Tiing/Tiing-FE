import { useEffect, useState } from 'react';

/**
 * 
 * @param value 
 * @param delay - (ms 단위)
 * @returns 디바운스 처리된 값
 */
export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
