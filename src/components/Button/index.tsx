import { forwardRef } from 'react';
import clsx from 'clsx';
import css from './index.module.css';
import { Spin } from 'antd';

interface Props extends React.ComponentPropsWithRef<'button'> {
  icon?: React.ReactNode;
  loading?: boolean;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ icon, children, className, disabled, loading, ...props }, ref) => (
    <button ref={ref} className={clsx(css.button, className)} disabled={disabled || loading} {...props}>
      {icon && !loading && <span>{icon}</span>}
      {loading && <Spin size="small" />}
      {children}
    </button>
  ),
);

Button.displayName = 'Button';
