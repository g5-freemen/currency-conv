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
  EUR: ['EUR', 'Euro', '€'],
  USD: ['USD', 'United States Dollar', '$'],
  JPY: ['JPY', 'Japanese Yen', '¥'],
  BGN: ['BGN', 'Bulgarian Lev', 'лв'],
  CZK: ['CZK', 'Czech Koruna', 'Kč'],
  DKK: ['DKK', 'Danish Krone', 'kr'],
  GBP: ['GBP', 'British Pound', '£'],
  HUF: ['HUF', 'Hungarian Forint', 'Ft'],
  PLN: ['PLN', 'Polish Złoty', 'zł'],
  RON: ['RON', 'Romanian Leu', 'lei'],
  SEK: ['SEK', 'Swedish Krona', 'kr'],
  CHF: ['CHF', 'Swiss Franc', 'Fr'],
  ISK: ['ISK', 'Icelandic Króna', 'kr'],
  NOK: ['NOK', 'Norwegian Krone', 'kr'],
  TRY: ['TRY', 'Turkish Lira', '₺'],
  AUD: ['AUD', 'Australian Dollar', '$'],
  BRL: ['BRL', 'Brazilian Real', 'R$'],
  CAD: ['CAD', 'Canadian Dollar', '$'],
  CNY: ['CNY', 'Chinese Yuan', '¥'],
  HKD: ['HKD', 'Hong Kong Dollar', '$'],
  IDR: ['IDR', 'Indonesian Rupiah', 'Rp'],
  ILS: ['ILS', 'Israeli New Shekel', '₪'],
  INR: ['INR', 'Indian Rupee', '₹'],
  KRW: ['KRW', 'South Korean Won', '₩'],
  MXN: ['MXN', 'Mexican Peso', '$'],
  MYR: ['MYR', 'Malaysian Ringgit', 'RM'],
  NZD: ['NZD', 'New Zealand Dollar', '$'],
  PHP: ['PHP', 'Philippine Peso', '₱'],
  SGD: ['SGD', 'Singapore Dollar', '$'],
  THB: ['THB', 'Thai Baht', '฿'],
  ZAR: ['ZAR', 'South African Rand', 'R'],
};

export const metaFor = (code: string): Currency => {
  if (code in CURRENCIES) {
    const upper = code.toUpperCase() as keyof typeof CURRENCIES;
    return { code, name: CURRENCIES[upper][1], symbol: CURRENCIES[upper][2] };
  }
  return { code, name: code, symbol: '?' };
};
