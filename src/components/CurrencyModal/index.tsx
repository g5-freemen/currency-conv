import { useEffect, useMemo, useRef, useState } from 'react';
import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { Currency } from '@/utils/types';
import { metaFor } from '@/utils/helpers';
import { useRates } from '@/api/hooks/useRates';
import css from './index.module.css';
import cssSelect from '../CurrencySelect/index.module.css';
import SearchIcon from '@/assets/icons/search.svg?react';
import TickIcon from '@/assets/icons/tick.svg?react';
import clsx from 'clsx';

type Props = {
  open: boolean;
  options: string[];
  value?: string;
  onSelect: (code: string) => void;
  onClose: () => void;
};

export const CurrencyModal = ({ open, options, value, onSelect, onClose }: Props) => {
  const { data } = useRates();
  const rates = data?.rates;

  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement | null>(null);

  const metas: Currency[] = useMemo(
    () => options.map((code) => metaFor(code)).sort((a: Currency, b: Currency) => (a.code > b.code ? 1 : -1)),
    [options],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return metas;
    return metas.filter((m) => m.code.toLowerCase().includes(q) || m.name.toLowerCase().includes(q));
  }, [metas, query]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [active, filtered.length]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
    }
  }, [open]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (!filtered.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      onSelect(filtered[active].code);
      onClose();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!open) return null;

  return (
    <Modal onClose={onClose} className={css.wrap} onKeyDown={handleKey}>
      <div className={css.header}>
        <h3 className={css.title}>Select currency</h3>
        <p className={css.desc}>
          Choose a currency from the list below or use the search bar to find a specific currency.
        </p>
        <Input
          className={css.search}
          icon={<SearchIcon />}
          aria-label="Search currency"
          placeholder="Search by code or name…"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          autoFocus
        />
      </div>

      <div className={css.list} ref={listRef} role="listbox" aria-label="Currency list">
        {filtered.length === 0 && <div className={css.empty}>No matches</div>}

        {filtered.map((m, idx) => {
          const selected = value?.toUpperCase() === m.code;
          const isActive = idx === active;

          return (
            <button
              key={m.code}
              className={clsx(css.row, selected && css.selected, isActive && css.active)}
              data-idx={idx}
              role="option"
              aria-selected={selected}
              onMouseEnter={() => setActive(idx)}
              onClick={() => {
                onSelect(m.code);
                onClose();
              }}
            >
              <span className={cssSelect.symbol}>{m.symbol}</span>
              <div className={cssSelect.currencyBlock}>
                <span className={cssSelect.code}>{m.code}</span>
                <span className={cssSelect.name}>{m.name}</span>
              </div>
              {selected && <TickIcon />}
            </button>
          );
        })}
      </div>
    </Modal>
  );
};
