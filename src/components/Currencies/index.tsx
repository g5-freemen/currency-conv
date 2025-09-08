import ArrowsIcon from '@/assets/icons/arrows.svg?react';

import css from './index.module.css';
import { Modal } from '../Modal';
import { useRates } from '@/api/hooks/useRates';

export const Currencies = () => {
  const { isBusy } = useRates();

  const onCloseModal = () => {
    console.log('onClose');
  };

  const handleSwap = () => {
    if (isBusy) return;
    console.log('swap');
  };

  return (
    <>
      <div className={css.container}>
        <div>1</div>
        <ArrowsIcon role="button" tabIndex={0} onClick={handleSwap} />
        <div>3</div>
      </div>
      {/* <Modal onClose={onCloseModal}>123</Modal> */}
    </>
  );
};
