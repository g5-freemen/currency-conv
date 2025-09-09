import { metaFor } from '@/utils/helpers';
import css from './index.module.css';
import { Divider } from '../Divider';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const toMeta = metaFor(to);
  const canShow = !loading && amount !== null && rate !== null;

  const refreshPage = () => navigate(0);

  return (
    <div className={css.wrap}>
      <h2 className={css.title}>Conversion result</h2>

      {loading && <Spin size="large" spinning={loading} />}

      {error && (
        <div className={css.error} role="button" tabIndex={0} onClick={refreshPage} title={'Refresh Page'}>
          {error}
        </div>
      )}

      {canShow && (
        <>
          <div className={css.big}>
            {toMeta.symbol}
            {fmt(amount! * rate!)}
          </div>
          <div className={css.amount}>{`${amount} ${from} =`}</div>
          <Divider className={css.divider} />

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

          <Divider className={css.divider} />
          <div className={css.note}>
            Rates are for informational purposes only and may not reflect real-time market rates.
          </div>
        </>
      )}
    </div>
  );
}
