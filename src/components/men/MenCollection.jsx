'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, SearchX, SlidersHorizontal } from 'lucide-react';
import FilterPanel from '@/components/men/FilterPanel';
import ProductCard from '@/components/product/ProductCard';
import PageAnimations from '@/components/ui/PageAnimations';
import { PRODUCTS } from '@/data/products';
import { filterProducts } from '@/lib/filterProducts';
import { DEFAULT_FILTERS, SORT_OPTIONS } from '@/lib/constants';
import { useUI } from '@/context/UIContext';

/**
 * The Men collection: facets, sort, search and a responsive grid.
 * `initialCategory` comes from the /men?cat= link used by the category tiles.
 */
export default function MenCollection({ initialCategory = null }) {
  const { toast } = useUI();

  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    cats: initialCategory ? [initialCategory] : [],
  });
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Debounce the free-text search so typing doesn't thrash the grid.
  useEffect(() => {
    const t = setTimeout(() => setFilters((f) => ({ ...f, query })), 300);
    return () => clearTimeout(t);
  }, [query]);

  // Brief skeleton on first paint, matching the original storefront.
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const results = useMemo(() => filterProducts(filters), [filters]);

  const toggleArrayFilter = (key, value) =>
    setFilters((f) => ({
      ...f,
      [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value],
    }));

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setQuery('');
    toast('Filters', 'All filters cleared.');
  };

  return (
    <>
      <PageAnimations deps={[results.length]} />

      <section className="pt-[150px] pb-20 px-5 md:px-10 lg:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8" data-reveal>
          <div>
            <div className="eyebrow text-emerald">Collection — Men · FW26</div>
            <h1 className="font-display text-5xl md:text-7xl h-display mt-3">
              MEN<span className="text-emerald">.</span>
            </h1>
          </div>

          <div className="flex gap-3 items-center">
            <div className="relative">
              <Search
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                aria-hidden="true"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search men…"
                aria-label="Search the men's collection"
                className="input-lux !py-3 !pl-10 !w-[200px]"
              />
            </div>

            <label htmlFor="men-sort" className="sr-only">
              Sort products
            </label>
            <select
              id="men-sort"
              value={filters.sort}
              onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value }))}
              className="input-lux !py-3 !w-auto cursor-pointer font-bold text-sm"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden btn btn-primary btn-sm"
            >
              <span>Filters</span>
              <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex gap-8 items-start">
          <FilterPanel
            filters={filters}
            mobileOpen={mobileOpen}
            onToggle={toggleArrayFilter}
            onMaxPrice={(value) => setFilters((f) => ({ ...f, maxPrice: value }))}
            onAvail={(value) => setFilters((f) => ({ ...f, avail: value }))}
            onClear={clearFilters}
          />

          <div className="flex-1">
            <div className="flex justify-between items-center mb-5">
              <div className="text-sm text-muted">
                Showing <b className="text-ink">{results.length}</b> of {PRODUCTS.length} styles
              </div>
              <div className="text-[11px] tracking-[0.2em] uppercase font-bold text-muted hidden md:block">
                Sharp · Minimal · Bespoke
              </div>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="border border-line bg-white">
                    <div className="skeleton aspect-[3/4]" />
                    <div className="p-5 space-y-2">
                      <div className="skeleton h-3 w-1/3" />
                      <div className="skeleton h-5 w-3/4" />
                      <div className="skeleton h-4 w-1/2" />
                    </div>
                  </div>
                ))
              ) : results.length === 0 ? (
                <div className="col-span-full border border-line bg-white p-12 text-center">
                  <SearchX className="w-10 h-10 mx-auto text-line" aria-hidden="true" />
                  <h3 className="font-display text-2xl mt-4">No pieces match those filters.</h3>
                  <button type="button" onClick={clearFilters} className="btn btn-primary mt-5">
                    <span>Clear Filters</span>
                  </button>
                </div>
              ) : (
                results.map((product) => <ProductCard key={product.id} product={product} />)
              )}
            </div>
          </div>
        </div>
      </section>

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="overlay-bg open fixed inset-0 bg-ink/50 z-[70] lg:hidden"
          role="presentation"
        />
      )}
    </>
  );
}
