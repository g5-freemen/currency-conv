import { metaFor } from '@/utils/helpers';
import css from './index.module.css';
import { Divider } from '../Divider';

interface Props {
  loading?: boolean;
  amount: number | null;
  from: string;
  to: string;
  rate: number | null;
  inverse: number | null;
  error?: string | null;
}

const fmt = (n: number) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 6 }).format(n);

export function ConversionResult({ loading, amount, from, to, rate, inverse, error }: Props) {
  const toMeta = metaFor(to);
  const canShow = !loading && amount !== null && rate !== null;

  return (
    <div className={css.wrap}>
      <h2 className={css.title}>Conversion result</h2>

      {loading && (
        <div className={css.skeleton} aria-busy>
          Calculating…
        </div>
      )}

      {error && <div className={css.error}>{error}</div>}

      {canShow && (
        <>
          <div className={css.big}>
            {toMeta.symbol}
            {fmt(amount! * rate!)}
          </div>
          <Divider />

          <div className={css.rates}>
            <div className={css.row}>
              Exchange Rate
              <div className={css.eq}>
                1 {from} = {fmt(rate!)} {to}
              </div>
            </div>
            <div className={css.row}>
              Inverse Rate
              <div className={css.eq}>
                1 {to} = {fmt(inverse!)} {from}
              </div>
            </div>
          </div>

          <div className={css.note}>
            Rates are for informational purposes only and may not reflect real-time market rates.
          </div>
        </>
      )}
    </div>
  );
}
