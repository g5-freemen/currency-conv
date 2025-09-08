import { useRef } from 'react';
import css from './index.module.css';
import { useClickOutside } from '@/hooks/useClickOutside';
import CloseIcon from '../../assets/icons/cross.svg?react';
import clsx from 'clsx';

interface Props {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export const Modal = ({ children, className, onKeyDown, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  // useClickOutside(modalRef, () => onClose?.());

  return (
    <div className={css.layer}>
      <div className={clsx(css.modal, className)} ref={modalRef} role="dialog" aria-modal="true" onKeyDown={onKeyDown}>
        <CloseIcon className={css.closeBtn} onClick={onClose} role="button" tabIndex={0} />
        {children}
      </div>
    </div>
  );
};
