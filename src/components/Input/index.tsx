import { forwardRef } from 'react';

import css from './index.module.css';
import clsx from 'clsx';

interface Props extends React.ComponentPropsWithRef<'input'> {
  className?: string;
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(({ className, label, error, ...props }, ref) => (
  <div className={css.container}>
    {label && <label className={css.label}>{label}</label>}
    <input ref={ref} className={clsx(css.input, error && css.errorInput, className)} {...props} />
    {error && <span className={css.error}>{error}</span>}
  </div>
));

Input.displayName = 'Input';
