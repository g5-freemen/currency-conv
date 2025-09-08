import { useRates } from '@/api/hooks/useRates';
import { Spin, Tag } from 'antd';
import OnlineIcon from '@/assets/icons/online.svg?react';
import ClockIcon from '@/assets/icons/clock.svg?react';
import css from './index.module.css';
import { formatDate } from '@/utils/helpers';

export const NetworkStatus = () => {
  const { isOnline, isOffline, isBusy, usingCache, lastUpdated } = useRates();

  let statusText = '—';
  if (isOffline && usingCache && lastUpdated) {
    statusText = `Using cached rates from ${formatDate(lastUpdated)}`;
  } else if (isOffline && !usingCache) {
    statusText = 'Offline — no cached rates yet';
  } else if (isOnline) {
    statusText = `Last updated: ${formatDate(lastUpdated)}`;
  }

  return (
    <div className={css.stats}>
      {isOnline ? (
        <Tag color="success" className={css.tag}>
          <OnlineIcon /> Online
        </Tag>
      ) : (
        <Tag color="error">Offline</Tag>
      )}

      <span className={css.status}>
        <ClockIcon /> {isBusy ? <Spin size="small" /> : statusText}
      </span>
    </div>
  );
};
