import { useCallback, useMemo, useRef, useState } from 'react';
import { NetworkStatus } from '@/components/NetworkStatus';
import RefreshIcon from '@/assets/icons/refresh.svg?react';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Currencies } from '@/components/Currencies';
import { ConversionResult } from '@/components/ConversionResult';
import { useRates } from '@/api/hooks/useRates';
import { useDebounce } from '@/hooks/useDebounce';
import { useConverter } from '@/hooks/useConverter';
import { LAST_AMOUNT_LS_KEY, LAST_PAIR_LS_KEY, REFRESH_COOLDOWN_MS } from '@/utils/consts';
import { readPair, sanitizeAmount } from './utils';
import { useIsOnline } from '@/hooks/useIsOnline';
import clsx from 'clsx';
import css from './index.module.css';

export default function ConverterPage() {
  const { isOnline } = useIsOnline();
  const { isBusy, refetch: refetchRates, data, isError } = useRates();

  const [amountRaw, setAmountRaw] = useState<string>(() => localStorage.getItem(LAST_AMOUNT_LS_KEY) || '1');
  const amountNumber = useMemo(() => {
    const v = +sanitizeAmount(amountRaw);
    return Number.isFinite(v) ? v : null;
  }, [amountRaw]);

  const amount = useDebounce(amountNumber, 250);

  const initialPair = readPair() || { from: 'USD', to: 'EUR' };
  const [pair, setPair] = useState<{ from: string; to: string }>(initialPair);

  const onPairChange = (p: { from: string; to: string }) => {
    setPair(p);
    localStorage.setItem(LAST_PAIR_LS_KEY, JSON.stringify(p));
  };

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = sanitizeAmount(e.currentTarget.value);
    setAmountRaw(next);
    localStorage.setItem(LAST_AMOUNT_LS_KEY, next);
  };

  const { rate, inverse } = useConverter(pair.from, pair.to, data);

  const lastClickAtRef = useRef<number>(0);
  const safeRefresh = useCallback(() => {
    const now = Date.now();
    if (now - lastClickAtRef.current < REFRESH_COOLDOWN_MS || isBusy) return;
    lastClickAtRef.current = now;
    refetchRates();
  }, [isBusy, refetchRates]);

  const errorMsg = useMemo(() => {
    let msg = '';
    if (isError && !isOnline) {
      msg = 'Failed to load rates. Check your connection and try again.';
    }
    if (rate == null) {
      msg = 'Unknown currency code or rates missing.';
    }
    return msg;
  }, [isError, isOnline]);

  return (
    <div className={css.page}>
      <header className={css.header}>
        <h1 className={css.title}>Currency Converter</h1>
        <p className={css.subtitle}>Get real-time exchange rates</p>
      </header>

      <section className={css.statusBar} aria-label="Network status and actions">
        <NetworkStatus />
        <Button icon={<RefreshIcon />} aria-label="Refresh exchange rates" onClick={safeRefresh} loading={isBusy}>
          Refresh rates
        </Button>
      </section>

      <main className={css.layout}>
        <section className={clsx(css.card, css.converter)} aria-labelledby="converter-heading">
          <Input
            label="Amount"
            inputMode="decimal"
            value={amountRaw}
            onChange={onAmountChange}
            placeholder="Enter amount..."
          />
          <Currencies from={pair.from} to={pair.to} onChange={onPairChange} />
        </section>

        <aside className={css.card} aria-labelledby="rates-heading">
          <ConversionResult
            loading={isBusy}
            amount={amount}
            from={pair.from}
            to={pair.to}
            rate={rate}
            inverse={inverse}
            error={errorMsg}
          />
        </aside>
      </main>
    </div>
  );
}
