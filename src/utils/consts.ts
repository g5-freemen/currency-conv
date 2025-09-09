import { ToastContainerProps } from 'react-toastify';

import { version } from '../../package.json';

export const APP_VERSION = version;

export const URL_API = import.meta.env.VITE_API_BASE || 'https://api.vatcomply.com';

export const toastConfig: ToastContainerProps = {
  position: 'top-right',
  autoClose: 2500,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: 'light',
};

export const btnProps = {
  role: 'button',
  tabIndex: 0,
  onKeyDown: (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const target: any = e.target;
      target?.click();
    }
  },
};

export const CACHE_TTL_MS = import.meta.env.VITE_CACHE_TTL_MS || 300_000; // 5 minutes
export const REFRESH_COOLDOWN_MS = import.meta.env.VITE_REFRESH_COOLDOWN_MS || 1_500;

export const RATES_LS_KEY = 'rates';
export const LAST_PAIR_LS_KEY = 'last_pair';
export const LAST_AMOUNT_LS_KEY = 'last_amount';
