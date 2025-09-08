import type { RatesResponse } from '@/api/types/rates';

import { useMemo } from 'react';

export const computeRate = (from: string, to: string, data?: RatesResponse) => {
  if (!data) return null;
  const base = data.base.toUpperCase();
  const rates = data.rates;
  const A = from.toUpperCase();
  const B = to.toUpperCase();
  if (A === B) return 1;

  const rA = A === base ? 1 : rates[A];
  const rB = B === base ? 1 : rates[B];
  if (!rA || !rB) return null;

  return rB / rA;
};

export const useConverter = (amount: number | null, from: string, to: string, data?: RatesResponse) => {
  return useMemo(() => {
    const rate = computeRate(from, to, data);
    if (rate == null || amount == null) {
      return { rate: null as number | null, result: null as number | null, inverse: null as number | null };
    }
    const result = amount * rate;
    const inverse = 1 / rate;
    return { rate, result, inverse };
  }, [amount, from, to, data]);
};
