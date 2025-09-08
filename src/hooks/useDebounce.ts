import { useState, useEffect } from 'react';

export default function useDebounce(value: any, delayMs: number = 250) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(handler);
  }, [value]);

  return debouncedValue;
}
