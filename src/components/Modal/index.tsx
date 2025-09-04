import { useRef } from 'react';
import css from './index.module.css';
import { useClickOutside } from '@/hooks/useClickOutside';

interface Props {
  children: React.ReactNode;
  onClose?: () => void;
}

export const Modal = ({ children, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(modalRef, () => onClose?.());

  return (
    <div className={css.layer}>
      <div className={css.modal} ref={modalRef}>
        {children}
      </div>
    </div>
  );
};
