import { RatesResponse } from '@/api/types/rates';

import { RATES_LS_KEY } from './consts';
import { Currency, RatesCache } from './types';

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

export const CURRENCIES = {
  EUR: ['Euro', '€'],
  USD: ['United States Dollar', '$'],
  JPY: ['Japanese Yen', '¥'],
  BGN: ['Bulgarian Lev', 'лв'],
  CZK: ['Czech Koruna', 'Kč'],
  DKK: ['Danish Krone', 'kr'],
  GBP: ['British Pound', '£'],
  HUF: ['Hungarian Forint', 'Ft'],
  PLN: ['Polish Złoty', 'zł'],
  RON: ['Romanian Leu', 'lei'],
  SEK: ['Swedish Krona', 'kr'],
  CHF: ['Swiss Franc', 'Fr'],
  ISK: ['Icelandic Króna', 'kr'],
  NOK: ['Norwegian Krone', 'kr'],
  TRY: ['Turkish Lira', '₺'],
  AUD: ['Australian Dollar', '$'],
  BRL: ['Brazilian Real', 'R$'],
  CAD: ['Canadian Dollar', '$'],
  CNY: ['Chinese Yuan', '¥'],
  HKD: ['Hong Kong Dollar', '$'],
  IDR: ['Indonesian Rupiah', 'Rp'],
  ILS: ['Israeli New Shekel', '₪'],
  INR: ['Indian Rupee', '₹'],
  KRW: ['South Korean Won', '₩'],
  MXN: ['Mexican Peso', '$'],
  MYR: ['Malaysian Ringgit', 'RM'],
  NZD: ['New Zealand Dollar', '$'],
  PHP: ['Philippine Peso', '₱'],
  SGD: ['Singapore Dollar', '$'],
  THB: ['Thai Baht', '฿'],
  ZAR: ['South African Rand', 'R'],
};

export const metaFor = (code: string): Currency => {
  if (code in CURRENCIES) {
    const upper = code.toUpperCase() as keyof typeof CURRENCIES;
    return { code, name: CURRENCIES[upper][0], symbol: CURRENCIES[upper][1] };
  }
  return { code, name: code, symbol: '?' };
};
