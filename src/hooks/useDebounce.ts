import { useState, useEffect } from 'react';

export const useDebounce = (value: any, delayMs: number = 250) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(handler);
  }, [value]);

  return debouncedValue;
};
