import { NetworkStatus } from '@/components/NetworkStatus';
import RefreshIcon from '@/assets/icons/refresh.svg?react';
import { Button } from '@/components/Button';

import css from './index.module.css';
import { Input } from '@/components/Input';
import { Currencies } from '@/components/Currencies';

export default function ConverterPage() {
  return (
    <div className={css.page}>
      <header className={css.header}>
        <h1 className={css.title}>Currency Converter</h1>
        <p className={css.subtitle}>Get real-time exchange rates</p>
      </header>

      <section className={css.statusBar} aria-label="Network status and actions">
        <NetworkStatus />
        <Button icon={<RefreshIcon />} aria-label="Refresh exchange rates">
          Refresh rates
        </Button>
      </section>

      <main className={css.layout}>
        <section className={`${css.card} ${css.converter}`} aria-labelledby="converter-heading">
          <Input label="Amount" />
          <Currencies />
        </section>

        <aside className={`${css.card} ${css.sidebar}`} aria-labelledby="rates-heading">
          <h2 id="rates-heading" className={css.sectionTitle}>
            Latest rates
          </h2>
          {/* TODO: список/виджет курсов */}
        </aside>
      </main>
    </div>
  );
}
