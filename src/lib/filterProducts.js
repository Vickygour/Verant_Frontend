import { PRODUCTS } from '@/data/products';

/**
 * Apply the Men-collection filter + sort state to a catalogue.
 * Server-side filtering now happens in GET /api/products; this stays as the
 * offline fallback (and for the free-text box, which filters the fetched page
 * client-side exactly like the original storefront did).
 * Kept pure so it can be unit-tested without React.
 */
export function filterProducts(filters, source = PRODUCTS) {
  let list = [...source];

  if (filters.cats.length) list = list.filter((p) => filters.cats.includes(p.cat));

  list = list.filter((p) => p.price <= filters.maxPrice);

  if (filters.sizes.length) {
    list = list.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)));
  }

  if (filters.colors.length) {
    const wanted = filters.colors.map((c) => c.toLowerCase());
    list = list.filter((p) =>
      p.colors.some((c) => {
        const name = c.n.toLowerCase();
        return wanted.some(
          (w) =>
            name.includes(w) ||
            w.includes(name.split(' ')[0]) ||
            (w === 'green' && (name.includes('emerald') || name.includes('forest'))),
        );
      }),
    );
  }

  if (filters.materials.length) {
    list = list.filter((p) =>
      filters.materials.some((m) => p.material.toLowerCase().includes(m.toLowerCase())),
    );
  }

  if (filters.avail === 'in') list = list.filter((p) => p.stock > 0);
  if (filters.avail === 'low') list = list.filter((p) => p.stock > 0 && p.stock < 10);

  if (filters.query) {
    const q = filters.query.toLowerCase();
    list = list.filter((p) => `${p.name}${p.cat}${p.material}`.toLowerCase().includes(q));
  }

  if (filters.sort === 'low') list.sort((a, b) => a.price - b.price);
  if (filters.sort === 'high') list.sort((a, b) => b.price - a.price);
  if (filters.sort === 'rating') list.sort((a, b) => b.rating - a.rating);
  if (filters.sort === 'new') list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

  return list;
}

/** Free-text search — mirrors GET /api/products/search, used as its fallback. */
export function searchProducts(query, source = PRODUCTS) {
  const q = (query || '').trim().toLowerCase();
  if (!q) return source.filter((p) => p.isBest).slice(0, 4);
  return source.filter((p) =>
    `${p.name}${p.cat}${p.material}${p.tagline}`.toLowerCase().includes(q),
  );
}

/** Substring match applied to an already-filtered list (the men search box). */
export function matchesQuery(list, query) {
  const q = (query || '').trim().toLowerCase();
  if (!q) return list;
  return list.filter((p) => `${p.name}${p.cat}${p.material}`.toLowerCase().includes(q));
}
