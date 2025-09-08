import { RatesResponse } from '@/api/types/rates';

export type RatesCache = { data: RatesResponse; savedAt: number };

export type Currency = { code: string; name: string; symbol: string };
