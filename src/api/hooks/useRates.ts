import { useIsOnline } from '@/hooks/useIsOnline';
import { getRatesFromLS, saveRatesToLS } from '@/utils/helpers';
import { CACHE_TTL_MS } from '@/utils/consts';

import { useQuery } from '@tanstack/react-query';

import { useMemo } from 'react';

import type { AxiosError } from 'axios';

import { getRates } from '../rates';
import type { RatesResponse } from '../types/rates';

export const useRates = () => {
  const { isOnline } = useIsOnline();

  const cache = useMemo(getRatesFromLS, []);
  const initialData = cache?.data;
  const initialDataUpdatedAt = cache?.savedAt;

  const query = useQuery<RatesResponse, AxiosError>({
    queryKey: ['currencies'],
    queryFn: async () => {
      if (!isOnline && initialData) return initialData;
      const response = await getRates();
      const data: RatesResponse = response.data;
      if (data) {
        saveRatesToLS(data);
      }
      return data;
    },
    initialData,
    initialDataUpdatedAt,
    enabled: isOnline || !!initialData,
    staleTime: CACHE_TTL_MS,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    refetchInterval: isOnline ? CACHE_TTL_MS : false,
  });

  const lastUpdatedMs = query.dataUpdatedAt || initialDataUpdatedAt || 0;
  const lastUpdated = lastUpdatedMs ? new Date(lastUpdatedMs) : null;
  const usingCache = !isOnline && !!initialData;

  return {
    ...query,
    isBusy: query.isFetching || query.isLoading,
    isOnline,
    isOffline: !isOnline,
    usingCache,
    lastUpdated,
  };
};
