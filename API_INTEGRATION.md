# VÉRANT Maison — API Integration Notes

The storefront now reads and writes everything through the Express/MongoDB
backend (`verant-backend`). **No UI, layout, styling or copy was changed** —
only the data source behind each screen.

---

## 1. Running it

```bash
# terminal 1 — backend
cd verant-backend
npm install
npm run seed        # loads the 67 products + content blocks + admin user
npm run dev         # http://localhost:5000

# terminal 2 — frontend
cd verant-maison
npm install         # axios is now a dependency
npm run dev         # http://localhost:3000
```

`.env.local` (already included):

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

The URL **must** include the `/api` prefix — the backend mounts every route
under `app.use('/api', routes)`.

The backend's `CLIENT_URL` must list the frontend origin or CORS will block the
browser. For local work `CLIENT_URL=http://localhost:3000` is correct.

---

## 2. New files

| File | Purpose |
| --- | --- |
| `src/lib/api/client.js` | Axios instance, JWT request interceptor, response-envelope unwrapping, error normalisation |
| `src/lib/api/server.js` | Server-side axios used by React Server Components, with a seed-data fallback + circuit breaker |
| `src/lib/api/normalize.js` | Maps the backend's `isNewArrival` → the UI's `isNew`, and shapes review documents |
| `src/lib/api/auth.service.js` | signup · verify-otp · resend-otp · login · forgot-password · reset-password · me |
| `src/lib/api/products.service.js` | list · fetchAll · getById · featured · search · categories · admin CRUD |
| `src/lib/api/content.service.js` | looks · craft · testimonials · categoryTiles · size/colour/material options |
| `src/lib/api/wishlist.service.js` | get · toggle |
| `src/lib/api/reviews.service.js` | forProduct · create · like · delete |
| `src/lib/api/orders.service.js` | create · mine · getById · admin all/updateStatus |
| `src/lib/api/users.service.js` | updateMe · addAddress · deleteAddress · admin list |
| `src/lib/api/index.js` | Barrel export |
| `src/context/AuthContext.jsx` | Session state, JWT persistence, `/auth/me` revalidation |
| `src/context/CatalogContext.jsx` | Client-side catalogue + CMS content, boots from seed then swaps in live data |
| `src/components/auth/AuthForm.jsx` | The existing auth UI, verbatim, now calling the real endpoints |

---

## 3. Endpoint → screen map

| Endpoint | Where it is used |
| --- | --- |
| `GET /products` | `/` home, `/new`, `/bestseller`, `/product/[id]` related rail, sitemap (server-side); `MenCollection` facets/sort; `CatalogContext` |
| `GET /products/:id` | `/product/[id]` page + `generateMetadata` |
| `GET /products/featured` | Available via `productService.featured()` |
| `GET /products/search` | `SearchOverlay` (debounced 250 ms) |
| `GET /products/categories` | `/men` initial category, `FilterPanel` |
| `GET /content` | `CategoryGrid`, `CraftSection`, `Testimonials`, `LookbookPreview`, `LookbookGrid`, `LookbookRail`, `FilterPanel`, `/about` |
| `POST /auth/signup` | Register tab → OTP step |
| `POST /auth/verify-otp` | 6-digit OTP screen (logs the user straight in) |
| `POST /auth/resend-otp` | "Resend Code Now" |
| `POST /auth/login` | Sign In tab |
| `POST /auth/forgot-password` | "Forgot Password?" link |
| `POST /auth/reset-password` | `authService.resetPassword()` (no screen exists yet) |
| `GET /auth/me` | `AuthContext` session revalidation on load |
| `GET /wishlist`, `POST /wishlist/:id` | `StoreContext` — synced on sign-in, mirrored on every heart tap |
| `GET /products/:id/reviews` | `ProductReviews` list |
| `POST /products/:id/reviews` | "Submit Review" |
| `PATCH /reviews/:id/like` | "Helpful" counter |
| `POST /orders` | "Place Order" on checkout |
| `POST /users/me/addresses` | Best-effort address-book save after a successful order |
| `GET /orders/my`, `GET /orders/:id` | `orderService.mine()` / `.getById()` |
| Admin routes | Wrapped in the services, no admin screen exists yet |

---

## 4. Behaviour worth knowing

**Seed fallback.** `src/data/products.js` is byte-identical to the backend's
`src/seed/data.json`, so it is kept as an offline fallback. If the API is
unreachable the site still renders and the console logs a warning — it is never
used when the API answers.

**Checkout is protected.** `POST /orders` requires a JWT. A signed-out visitor
pressing "Place Order" gets a toast and is sent to
`/login?redirect=/checkout`, then returns automatically after signing in.

**Prices are server-side.** Only `productId`, `qty`, `size` and `color` are
sent. The backend re-prices every line from MongoDB, validates stock and size,
decrements inventory and emails the confirmation.

**Men collection search.** Facets, price, availability and sort are resolved by
`GET /products`. The free-text box still matches client-side because the
backend uses a Mongo `$text` index (whole words only) while the storefront has
always done substring matching — this keeps the results identical to before.

**Reviews.** The two hard-coded placeholder reviews were removed; the list is
now whatever the API returns. Posting requires sign-in (the backend allows one
review per user per product).

**Wishlist.** Guests keep using localStorage. On sign-in the local list and the
server list are merged (union), local-only items are pushed up, and every later
toggle hits `POST /wishlist/:productId`.

---

## 5. One fix outside the API work

`src/app/(auth)/signup/page.jsx` was an empty file, which breaks `next build`
(a route with no default export). The auth screen was moved verbatim into
`src/components/auth/AuthForm.jsx` and both `/login` and `/signup` render it
with a different `initialMode`. The markup is unchanged.

---

## 6. Security note

`verant-backend/.env` currently contains a live MongoDB Atlas connection
string, JWT secrets and a Gmail app password. Rotate all three and make sure
`.env` is gitignored before this goes anywhere near a repository.
