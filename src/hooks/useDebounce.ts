import { useState, useEffect } from 'react';

export default function useDebounce(value: string | number, delayMs: number = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(handler);
  }, [value]);

  return debouncedValue;
}
