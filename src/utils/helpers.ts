import { RatesResponse } from '@/api/types/rates';

import { RATES_LS_KEY } from './consts';
import { RatesCache } from './types';

export const saveRatesToLS = (payload: RatesResponse) => {
  const dataToLS = { data: payload, savedAt: Date.now() };
  localStorage.setItem(RATES_LS_KEY, JSON.stringify(dataToLS));
};

export const getRatesFromLS = () => {
  const ratesLS = localStorage.getItem(RATES_LS_KEY);
  if (!ratesLS) return null;
  const parsed = JSON.parse(ratesLS) as RatesCache;
  if (!parsed?.data || !parsed?.savedAt) return null;
  return parsed;
};

export const formatDate = (d?: Date | null) => {
  if (!d) return '—';
  return d.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
