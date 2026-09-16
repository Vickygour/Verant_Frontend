# VÉRANT — Maison de Couture

A luxury fashion storefront built with **Next.js 14 (App Router)**, **Tailwind CSS** and **GSAP**.
Converted from a single-file HTML prototype into a production-ready, deployable application.

![Stack](https://img.shields.io/badge/Next.js-14-000) ![Stack](https://img.shields.io/badge/Tailwind-3.4-06B6D4) ![Stack](https://img.shields.io/badge/Docker-ready-2496ED)

---

## Features

- **9 routed pages** — home, new arrivals, men's collection, bestsellers, about, lookbook, product detail, checkout, wishlist
- **Shopping bag** with quantity control, free-shipping progress and localStorage persistence
- **Wishlist** with drawer + dedicated page
- **Faceted filtering** on the Men collection — category, price, size, colour, material, availability, sort and search
- **Product pages** pre-rendered at build time with JSON-LD structured data
- **Quick view, search overlay, size guide, contact modal, toasts**
- **GSAP scroll animations** — reveals, clip wipes, staggers, counters and a pinned horizontal lookbook
- **Demo checkout** — address, shipping method, UPI / card / COD, order confirmation
- Reduced-motion support, keyboard focus rings, ARIA labelling throughout
- SEO: per-page metadata, Open Graph, generated `sitemap.xml` and `robots.txt`

---

## Quick start

```bash
# 1. Install
npm install

# 2. Environment
cp .env.example .env.local

# 3. Run
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build
npm run start        # serve the production build
npm run lint         # eslint
```

---

## Project structure

```
verant-maison/
├── Dockerfile                  Multi-stage production image
├── docker-compose.yml          One-command deployment
├── deploy/nginx.conf           Reverse proxy + TLS template for a VPS
├── next.config.mjs             standalone output, remote image hosts
├── tailwind.config.js          Brand tokens (colours, fonts, keyframes)
│
├── public/                     Static assets, web manifest
└── src/
    ├── app/                    Routes (App Router)
    │   ├── layout.jsx          Root shell, metadata, fonts
    │   ├── providers.jsx       Client boundary for global state
    │   ├── globals.css         Design system in Tailwind layers
    │   ├── page.jsx            Home
    │   ├── men/                Collection with filters
    │   ├── new/ bestseller/ about/ lookbook/
    │   ├── product/[id]/       SSG product pages + JSON-LD
    │   ├── checkout/ wishlist/
    │   ├── sitemap.js robots.js loading.jsx not-found.jsx
    │
    ├── components/
    │   ├── layout/             Header, Footer, Preloader, cursor, progress
    │   ├── overlays/           Cart, wishlist, search, quick view, modals, toasts
    │   ├── sections/           Home + lookbook + bestseller page sections
    │   ├── product/            Card, gallery, info panel, recently viewed
    │   ├── men/                Filter panel, collection grid
    │   ├── checkout/           Checkout flow
    │   └── ui/                 SmartImage, Stars, Badge, WishButton, SectionHead…
    │
    ├── context/
    │   ├── StoreContext.jsx    Bag, wishlist, recently viewed
    │   └── UIContext.jsx       Drawers, modals, toast queue
    │
    ├── hooks/                  localStorage state, scroll effects, GSAP reveals
    ├── data/                   products.js, navigation.js, site.js
    └── lib/                    format.js, constants.js, filterProducts.js
```

### Architecture notes

- **Server by default.** Pages are server components; only interactive leaves are `'use client'`. This keeps the shared JS bundle at ~87 kB.
- **State is split in two.** `UIContext` owns overlay visibility and toasts; `StoreContext` owns commerce data. Opening the bag never re-renders the catalogue.
- **GSAP is dynamically imported** inside `useRevealAnimations`, so it stays out of the server bundle and is torn down on every route change (`gsap.context().revert()`).
- **Data is one module.** Everything imports from `src/data/products.js`. Replacing it with a CMS or commerce API call is a single-file change.
- **Images** go through `next/image` (`SmartImage`) with a deterministic fallback when a remote asset 404s. Allowed hosts live in `next.config.mjs`.

---

## Deployment

### Option A — Docker (recommended)

```bash
docker compose up --build -d      # builds and starts on :3000
docker compose logs -f web        # follow logs
docker compose down               # stop
```

Or without compose:

```bash
docker build -t verant-maison .
docker run -p 3000:3000 --env NEXT_PUBLIC_SITE_URL=https://yourdomain.com verant-maison
```

The image is multi-stage and uses Next's `standalone` output, so the runtime layer
ships only the trimmed `node_modules` it actually needs and runs as a non-root user.

### Option B — VPS with a domain and HTTPS

1. Point your domain's A record at the server IP.
2. Copy the project to the server and edit `deploy/nginx.conf` with your domain.
3. Uncomment the `proxy` service in `docker-compose.yml`.
4. Issue certificates:

```bash
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com
sudo cp /etc/letsencrypt/live/yourdomain.com/{fullchain.pem,privkey.pem} deploy/certs/
docker compose up --build -d
```

### Option C — Vercel

```bash
npm i -g vercel
vercel --prod
```

Set `NEXT_PUBLIC_SITE_URL` in the project's environment variables. No other config needed.

---

## Environment variables

| Variable | Purpose | Required |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, OG tags and the sitemap | Yes in production |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Concierge email shown in the footer and contact modal | No |
| `NEXT_PUBLIC_SUPPORT_PHONE` | Support phone number | No |
| `PORT` | Server port (defaults to 3000) | No |

---

## Customisation

**Brand colours** — `tailwind.config.js` under `theme.extend.colors`. The same values
are mirrored as CSS variables at the top of `src/app/globals.css` for use in raw CSS.

**Catalogue** — `src/data/products.js`. Each product needs `id, name, cat, price, mrp,
rating, reviews, badge, isNew, isBest, sizes, colors, material, fit, stock, tagline,
desc, care, images`.

**Business rules** — `src/lib/constants.js` holds the free-shipping threshold, shipping
rates, GST rate and per-line quantity cap.

**Fonts** — currently loaded from Google Fonts in `src/app/layout.jsx`. To self-host
instead (better LCP, no third-party request), swap to `next/font`:

```js
import { Fraunces, Italiana, Manrope } from 'next/font/google';

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' });
const italiana = Italiana({ subsets: ['latin'], weight: '400', variable: '--font-italiana' });
const manrope  = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

// then: <html className={`${fraunces.variable} ${italiana.variable} ${manrope.variable}`}>
```

The Tailwind config already reads those exact CSS variable names, so nothing else changes.
Note that `next/font` downloads the families at build time, so the build machine needs
network access to Google Fonts.

---

## Going to production with real orders

The checkout is a demo — it validates input and shows a confirmation, but charges nothing.
To take real payments:

1. Add a payment provider SDK (Razorpay or Stripe suit an INR storefront).
2. Create a route handler at `src/app/api/checkout/route.js` that builds the order
   server-side and returns a payment intent or order id.
3. Replace the body of `placeOrder` in `src/components/checkout/CheckoutClient.jsx`
   with a call to that endpoint.
4. Recompute totals on the server — never trust prices sent from the browser.
5. Add a webhook handler to mark orders paid.

---

## Licence

Built as a freelance deliverable. VÉRANT is a fictional brand; product imagery is served
from Unsplash for demonstration purposes — replace it with licensed assets before launch.
