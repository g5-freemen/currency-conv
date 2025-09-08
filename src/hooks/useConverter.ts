import type { RatesResponse } from '@/api/types/rates';

import { useMemo } from 'react';

export const computeRate = (from: string, to: string, data?: RatesResponse) => {
  if (!data) return null;
  const base = data.base.toUpperCase();
  const A = from.toUpperCase();
  const B = to.toUpperCase();
  if (A === B) return 1;

  const rA = A === base ? 1 : data.rates[A];
  const rB = B === base ? 1 : data.rates[B];
  if (!rA || !rB) return null;

  return rB / rA;
};

export const useConverter = (from: string, to: string, data?: RatesResponse) => {
  return useMemo(() => {
    const rate = computeRate(from, to, data);
    if (rate === null) return { rate: null, inverse: null };
    return { rate, inverse: 1 / rate };
  }, [from, to, data]);
};
