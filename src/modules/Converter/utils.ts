import { LAST_PAIR_LS_KEY } from '@/utils/consts';

export const readPair = () => {
  const lastPair = localStorage.getItem(LAST_PAIR_LS_KEY);
  if (lastPair) {
    return JSON.parse(lastPair) as { from: string; to: string };
  }
  return null;
};

export const sanitizeAmount = (s: string) => {
  let v = s.replace(',', '.').replace(/[^\d.]/g, '');
  const firstDotIndex = v.indexOf('.');
  if (firstDotIndex >= 0) v = v.slice(0, firstDotIndex + 1) + v.slice(firstDotIndex + 1).replace(/\./g, '');
  return v;
};
