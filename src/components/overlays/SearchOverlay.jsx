'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import SmartImage from '@/components/ui/SmartImage';
import { searchProducts } from '@/lib/filterProducts';
import { useUI } from '@/context/UIContext';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { formatPrice } from '@/lib/format';

const POPULAR = ['Sneaker', 'Hoodie', 'Silk', 'Leather', 'Cargo'];

export default function SearchOverlay() {
  const router = useRouter();
  const { overlays, closeSearch } = useUI();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  const open = overlays.search;
  useLockBodyScroll(open);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 400);
      return () => clearTimeout(t);
    }
    setQuery('');
    return undefined;
  }, [open]);

  const results = useMemo(() => searchProducts(query), [query]);
  const trimmed = query.trim();

  const goTo = (id) => {
    closeSearch();
    router.push(`/product/${id}`);
  };

  return (
    <div
      className={`search-overlay fixed inset-0 z-[85] bg-ivory/[0.98] backdrop-blur-xl overflow-y-auto ${open ? 'open' : ''}`}
      aria-hidden={!open}
    >
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-16">
        <div className="flex justify-between items-center mb-10">
          <div className="eyebrow text-emerald">Search Maison Vérant</div>
          <button
            type="button"
            onClick={closeSearch}
            className="w-12 h-12 border border-ink/15 flex items-center justify-center hover:bg-ink hover:text-white transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="relative border-b-2 border-ink pb-4 flex items-center gap-4">
          <Search className="w-7 h-7 text-emerald shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Sneakers, silk shirts, hoodies…"
            aria-label="Search products"
            className="w-full bg-transparent font-display text-3xl md:text-5xl outline-none placeholder:text-ink/20"
          />
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          <span className="text-[11px] tracking-[0.25em] uppercase text-muted font-bold mr-2 mt-2">
            Popular:
          </span>
          {POPULAR.map((term) => (
            <button key={term} type="button" onClick={() => setQuery(term)} className="chip">
              {term}s
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="col-span-full text-sm text-muted">
            {trimmed ? (
              <>
                {results.length} result{results.length !== 1 ? 's' : ''} for{' '}
                <b className="text-ink">{trimmed}</b>
              </>
            ) : (
              <span className="eyebrow text-emerald">Trending Now</span>
            )}
          </div>

          {results.length === 0 ? (
            <div className="col-span-full bg-white border border-line p-8 text-center text-muted text-sm">
              No matches. Try “sneaker”, “silk” or “hoodie”.
            </div>
          ) : (
            results.slice(0, 8).map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => goTo(p.id)}
                className="bg-white border border-line overflow-hidden text-left hover:border-emerald transition group"
              >
                <div className="relative aspect-square overflow-hidden">
                  <SmartImage
                    src={p.images[0]}
                    alt={p.name}
                    sizes="(max-width: 768px) 45vw, 22vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-3">
                  <div className="text-[10px] tracking-[0.2em] uppercase font-bold text-emerald">
                    {p.cat}
                  </div>
                  <div className="font-display text-[15px] leading-tight mt-1">{p.name}</div>
                  <div className="font-extrabold text-sm mt-1">{formatPrice(p.price)}</div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
