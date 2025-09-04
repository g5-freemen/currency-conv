import { forwardRef } from 'react';
import clsx from 'clsx';
import css from './index.module.css';

interface Props extends React.ComponentPropsWithRef<'button'> {
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, Props>(({ icon, children, className, ...props }, ref) => (
  <button ref={ref} className={clsx(css.button, className)} {...props}>
    {icon && <span>{icon}</span>}
    {children}
  </button>
));

Button.displayName = 'Button';
