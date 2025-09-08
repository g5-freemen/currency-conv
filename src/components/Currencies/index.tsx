import { useMemo, useState } from 'react';
import ArrowsIcon from '@/assets/icons/arrows.svg?react';
import css from './index.module.css';
import { useRates } from '@/api/hooks/useRates';
import { CurrencySelect } from '@/components/CurrencySelect';
import { CurrencyModal } from '@/components/CurrencyModal';

type ActiveSide = 'from' | 'to' | null;

export const Currencies = () => {
  const { data, isBusy } = useRates();

  const allCodes = useMemo(() => {
    if (!data) return [];
    const keys = Object.keys(data.rates || {});
    const res = [...new Set([data.base, ...keys])];
    return res;
  }, [data]);

  const [from, setFrom] = useState<string>('USD');
  const [to, setTo] = useState<string>('EUR');
  const [active, setActive] = useState<ActiveSide>(null);

  const openFrom = () => setActive('from');
  const openTo = () => setActive('to');
  const onClose = () => setActive(null);

  const handleSelect = (side: ActiveSide, code: string) => {
    if (side === 'from') setFrom(code);
    if (side === 'to') setTo(code);
  };

  const handleSwap = () => {
    if (isBusy) return;
    setFrom(to);
    setTo(from);
  };

  return (
    <>
      <div className={css.container} aria-label="Currency selectors">
        <CurrencySelect code={from} onClick={openFrom} disabled={!allCodes.length} />
        <ArrowsIcon role="button" tabIndex={0} onClick={handleSwap} className={css.swap} />
        <CurrencySelect code={to} onClick={openTo} disabled={!allCodes.length} />
      </div>

      <CurrencyModal
        open={active === 'from'}
        options={allCodes}
        value={from}
        onSelect={(v) => handleSelect('from', v)}
        onClose={onClose}
      />
      <CurrencyModal
        open={active === 'to'}
        options={allCodes}
        value={to}
        onSelect={(v) => handleSelect('to', v)}
        onClose={onClose}
      />
    </>
  );
};
