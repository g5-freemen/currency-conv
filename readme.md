# Currency Converter (React + TypeScript)

A single‑page currency converter built with **React 18 + TypeScript**, powered by the **VATComply** exchange‑rates API. The app supports **offline mode with cache**, responsive UI for **mobile (≤480px)** and **desktop (≥1024px)**, keyboard‑friendly currency selection, and manual/auto rate refresh.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [How it works (architecture)](#how-it-works-architecture)
  - [Data & caching](#data--caching)
  - [Hooks](#hooks)
  - [UI components](#ui-components)
  - [Responsiveness](#responsiveness)
  - [Accessibility](#accessibility)
  - [Performance](#performance)

- [Environment & configuration](#environment--configuration)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Build & deploy](#build--deploy)
- [Code quality](#code-quality)
- [Error handling](#error-handling)
- [Known limitations & roadmap](#known-limitations--roadmap)

---

## Features

- **Accurate conversion** for any two currencies provided by the API.
- **Live update while typing** (with input debounce \~250ms). Supports both `.` and `,` as decimal separators.
- **Currency selectors** for **From/To** with a **swap** button.
- **Searchable currency modal** with code, name, symbol; keyboard: **↑/↓**, **Enter**, **Esc**; selected item highlighted.
- **Network status** with last update timestamp. If offline, clearly shows _“Using cached rates from …”_.
- **Caching & offline support:** stores last successful response and timestamp; uses cache when offline.
- **Manual refresh** button with cooldown to avoid spam; auto refresh when cache expires and network is online.
- **Persistence:** remembers last currency pair and last amount in `localStorage`.
- **Responsive UI** for **≤480px** and **≥1024px** breakpoints.
- **Friendly errors** and loading spinners.

---

## Tech stack

- **React 18**, **TypeScript 5**, **Vite 6** (SWC React plugin)
- **Ant Design 5** (tags/spin), **CSS Modules** for styling
- **Axios** + **@tanstack/react-query** for data fetching & caching primitives
- **React Router** (basic), **clsx**, **lodash**
- **SVGR** for importing SVGs as React components

### Tooling

- **ESLint 9**, **TypeScript ESLint**, **Prettier**
- Vite **manualChunks** for vendor splitting (see `vite.config.ts`)

---

## Project structure

```
├─ src/
│  ├─ api/
│  │  └─ hooks/
│  │     └─ useRates.ts            # Fetch VATComply, cache to localStorage, expose online/offline + lastUpdated
│  ├─ assets/
│  │  └─ icons/                    # .svg files imported via SVGR
│  ├─ components/
│  │  ├─ Button/
│  │  ├─ Input/
│  │  ├─ Divider/
│  │  ├─ NetworkStatus/            # Online/Offline tag + timestamp
│  │  ├─ CurrencySelect/           # Compact selector (symbol + code + full name)
│  │  ├─ CurrencyModal/            # Search + keyboard navigation + selected highlight
│  │  ├─ Currencies/               # From/To + Swap icon + modals wiring
│  │  ├─ ConversionResult/         # Result card with big number + pair rates
│  │  └─ Modal/                    # Generic modal wrapper
│  ├─ hooks/
│  │  ├─ useConverter.ts           # Pure conversion logic (rate & inverse)
│  │  ├─ useDebounce.ts            # Debounce any value (used for amount)
│  │  └─ useIsOnline.ts            # Window online/offline + listener
│  ├─ pages/
│  │  └─ ConverterPage/            # Page shell & layout
│  ├─ utils/
│  │  ├─ consts.ts                 # LAST_* keys, refresh cooldown, cache TTL, etc.
│  │  ├─ helpers.ts                # formatDate, metaFor, sanitizeAmount, etc.
│  │  └─ types.ts                  # Currency, API response types
│  └─ main.tsx
├─ vite.config.ts
└─ package.json
```

---

## How it works (architecture)

### Data & caching

- **API:** [`https://api.vatcomply.com/rates`](https://api.vatcomply.com/rates). Typical response:

  ```ts
  type RatesResponse = {
    base: string; // e.g., "EUR"
    date: string; // ISO date
    rates: Record<string, number>; // { USD: 1.09, GBP: 0.85, ... }
  };
  ```

- **Conversion formula** (when API is base‑anchored):

  ```ts
  // A → B using base C (e.g., EUR)
  rateAtoB = rates[B] / rates[A];
  inverseBtoA = 1 / rateAtoB;
  ```

- **Cache:** the last successful `RatesResponse` + timestamp is stored in `localStorage`. On startup and whenever offline, the app reads this cache. When online and cache **TTL** (default 5 minutes) is exceeded, the app refreshes in the background.
- **Persistence:** last **amount** and last **pair** are also saved to `localStorage` (see constants like `LAST_AMOUNT_LS_KEY`, `LAST_PAIR_LS_KEY`).

### Hooks

- **`useRates()`**
  - Fetches the VATComply rates via Axios.
  - Exposes `data`, `isBusy`, `isError`, `isOnline/isOffline`, `usingCache`, `lastUpdated`, and `refetch()`.
  - Reads/writes cache in `localStorage`; respects TTL; does background refresh when online.

- **`useConverter(from, to, data)`**
  - Pure function hook that returns `{ rate, inverse }` computed from `data.rates` and the API base.
  - Guards against missing/unknown currency codes (returns `null`).

- **`useDebounce(value, delay)`**
  - Delays value updates (used to debounce the amount field \~250ms).

- **`useIsOnline()`**
  - Lightweight hook around the browser’s `online/offline` events.

### UI components

- **`NetworkStatus`** — shows Online/Offline tag + _Last updated_ timestamp (or _Using cached rates from …_ when offline). Mobile layout stacks elements with 16px gaps; desktop keeps them in a row.
- **`Currencies`** — wraps two `CurrencySelect` components and a swap control, handles opening `CurrencyModal` for each side.
- **`CurrencyModal`** — searchable list of currencies; highlights the selected one; keyboard navigation: **↑/↓** moves an active row, **Enter** picks, **Esc** closes; active row auto‑scrolls into view.
- **`ConversionResult`** — displays the big formatted result, _amount =_, the **Exchange Rate** and **Inverse Rate**, and an informational note. Renders a spinner while loading and a friendly error on failure.

### Responsiveness

- Two breakpoints per spec:
  - **Mobile (≤480px):** single‑column layout; currency selectors in a vertical stack with the swap icon centered; `NetworkStatus` elements stacked with **16px** gaps; cards have tighter spacing.
  - **Desktop (≥1024px):** page grid `2fr / 1fr` (converter on the left, results on the right); larger paddings/typography.

- Implemented via **CSS Modules** with media queries colocated per component.

### Accessibility

- Form controls have **labels** and **aria‑labels**.
- The currency list uses proper **`role="listbox"` / `role="option"`** and **`aria-selected`** for screen readers.
- Keyboard support in modal (**↑/↓/Enter/Esc**). Focus styles are visible.

### Performance

- **React 18 + SWC** for fast dev/build.
- **Vite manualChunks** groups common vendors (`react‑ecosystem‑vendor`, `utility‑vendor`) and auto‑splits the rest to improve caching and initial load.
- Memoization with `useMemo`/`useCallback`; derived values only recompute when inputs change.
- Input changes are **debounced**; refresh button has a **cooldown** (`REFRESH_COOLDOWN_MS`).

---

## Environment & configuration

Create `.env` at the project root. Example:

```bash
# API endpoint (defaults to VATComply if omitted in code)
VITE_RATES_URL=https://api.vatcomply.com/rates

# Cache TTL for rates (ms). Example: 5 minutes
VITE_CACHE_TTL_MS=300000

# Throttle/cooldown for manual refresh (ms)
VITE_REFRESH_COOLDOWN_MS=2000
```

> Vite only exposes vars prefixed with `VITE_` to the client. If a particular variable is not present, the app falls back to the hardcoded defaults in `utils/consts.ts`.

Key Vite settings (`vite.config.ts`):

- **Aliases:** `@ → src/`
- **Ports:** dev/preview on **3000** (auto‑open)
- **SVGR:** import SVGs as React components (`import Icon from '.../icon.svg?react'`)
- **Build:** output to `./build`; vendor **manualChunks** (preset `react-ecosystem-vendor`, `utility-vendor`) + per‑dependency splitting for the rest

---

## Getting started

### Prerequisites

- **Node.js ≥ 20** (recommended), **npm** or **pnpm/yarn**

### Install & run

```bash
# 1) install deps
npm i

# 2) start dev server (http://localhost:3000)
npm run dev

# 3) typecheck (optional)
npm run typecheck

# 4) build for production (outputs ./build)
npm run build

# 5) preview production build
npm run preview
```

---

## Available scripts

- `npm run dev` — start Vite dev server
- `npm run start` — alias to `dev`
- `npm run typecheck` — TypeScript check without emit
- `npm run build` — typecheck + Vite build
- `npm run preview` — local preview of the production build

---

## Build & deploy

- **Static output** in `./build`. Can be deployed to any static host (Vercel, Netlify, S3 + CloudFront, Nginx).
- Ensure the environment variables used by the app are available at build time (Vercel/Netlify dashboard → Environment variables) or hardcoded defaults are acceptable.

---

## Code quality

- **Strict TypeScript** types for API payloads and domain logic.
- ESLint + Prettier are configured. Suggested workflow:
  - Keep components small and focused; prefer composition over inheritance.
  - Follow **SOLID, KISS, DRY, YAGNI**.
  - Co‑locate styles (CSS Modules) and keep media queries/component‑specific CSS near the component.

---

## Error handling

- **Network/API errors** → a friendly message in the `ConversionResult` with a hint to refresh.
- **Unknown currency codes** → conversion is disabled (`rate=null`), and the UI explains the issue.
- **Offline without cache** → explicit message in `NetworkStatus`.

---

## Known limitations & roadmap

- No service worker/PWA yet. Could be added to cache the HTML/JS and last rates for true offline‑first.
- No i18n; UI strings are in English only.
- Minimal test coverage; consider adding unit tests for `useConverter`, `sanitizeAmount`, and integration tests for offline/cache flows.
- VATComply base is usually `EUR`; if API changes behavior or is rate‑limited, consider a secondary provider with the same `RatesResponse` shape and a simple adapter.

---

### Maintainer

**Anton Borkovskij**

### License

MIT
