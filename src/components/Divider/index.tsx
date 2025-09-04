import clsx from 'clsx';
import css from './index.module.css';

interface Props {
  className?: string;
}

export const Divider = ({ className }: Props) => <div className={clsx(css.divider, className)} />;
