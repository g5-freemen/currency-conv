import { ToastContainerProps } from 'react-toastify';

import { version } from '../../package.json';

export const APP_VERSION = version;

export const themeConfig = {
  token: {
    colorPrimary: '#003eb3',
    colorSuccess: '#389e0d',
    colorError: '#cf1322',
  },
};

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
