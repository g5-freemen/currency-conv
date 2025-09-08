import { useRef } from 'react';
import css from './index.module.css';
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

  const handleClose = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onClose?.();
    }
  };

  return (
    <div className={css.layer} onMouseDown={handleClose}>
      <div className={clsx(css.modal, className)} ref={modalRef} role="dialog" aria-modal="true" onKeyDown={onKeyDown}>
        <CloseIcon className={css.closeBtn} onClick={onClose} role="button" tabIndex={0} />
        {children}
      </div>
    </div>
  );
};
