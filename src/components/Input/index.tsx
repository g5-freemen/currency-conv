import { forwardRef } from 'react';

import css from './index.module.css';
import clsx from 'clsx';

interface Props extends React.ComponentPropsWithRef<'input'> {
  className?: string;
  label?: React.ReactNode;
  error?: React.ReactNode;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, Props>(({ className, icon, label, error, ...props }, ref) => (
  <div className={css.container}>
    {!!icon && <div className={css.icon}>{icon}</div>}
    {!!label && <label className={css.label}>{label}</label>}
    <input
      ref={ref}
      className={clsx(css.input, error && css.errorInput, icon && css.inputIcon, className)}
      {...props}
    />
    {!!error && <span className={css.error}>{error}</span>}
  </div>
));

Input.displayName = 'Input';
