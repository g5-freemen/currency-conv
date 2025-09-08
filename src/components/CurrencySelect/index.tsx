import { metaFor } from '@/utils/helpers';
import css from './index.module.css';

type Props = {
  code: string;
  disabled?: boolean;
  onClick: () => void;
};

export const CurrencySelect = ({ code, disabled, onClick }: Props) => {
  const meta = metaFor(code);
  return (
    <button
      type="button"
      className={css.btn}
      onClick={onClick}
      disabled={disabled}
      aria-label={`Change currency ${meta.code}`}
    >
      <span className={css.symbol}>{meta.symbol}</span>
      <div className={css.currencyBlock}>
        <span className={css.code}>{meta.code}</span>
        <span className={css.name}>{meta.name}</span>
      </div>
    </button>
  );
};
