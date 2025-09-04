import { useIsOnline } from '@/hooks/useIsOnline';
import { Tag } from 'antd';
import OnlineIcon from '@/assets/icons/online.svg?react';
import ClockIcon from '@/assets/icons/clock.svg?react';
import css from './index.module.css';

export const NetworkStatus = () => {
  const { isOnline } = useIsOnline();

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
        <ClockIcon /> {isOnline ? 'Last updated: 09/01/2025, 00:39 PM' : 'Using cached rates from ... .'}
      </span>
    </div>
  );
};
