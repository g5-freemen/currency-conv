import { ToastContainerProps } from 'react-toastify';

import { version } from '../../package.json';

export const APP_VERSION = version;

export const URL_API = import.meta.env.VITE_API_BASE || 'https://api.vatcomply.com/rates';

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
