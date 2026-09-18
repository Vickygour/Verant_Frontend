'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import SmartImage from '@/components/ui/SmartImage';
import Stars from '@/components/ui/Stars';
import ProductBadge from '@/components/ui/ProductBadge';
import WishButton from '@/components/ui/WishButton';
import { useCatalog } from '@/context/CatalogContext';
import { useStore } from '@/context/StoreContext';
import { useUI } from '@/context/UIContext';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { formatPrice } from '@/lib/format';

export default function QuickViewModal() {
  const { quickViewId, closeQuickView } = useUI();
  const { addToBag } = useStore();
  const { getProduct } = useCatalog();

  const product = quickViewId ? getProduct(quickViewId) : null;
  useLockBodyScroll(Boolean(product));

  if (!product) return null;
  const soldOut = product.stock === 0;

  return (
    <>
      <div
        onClick={closeQuickView}
        className="overlay-bg open fixed inset-0 bg-ink/50 backdrop-blur-sm z-[88]"
        role="presentation"
      />

      <div
        className="fixed inset-0 z-[89] flex items-center justify-center p-4 md:p-8 pointer-events-none"
        role="dialog"
        aria-modal="true"
        aria-label={`Quick view — ${product.name}`}
      >
        <div className="pointer-events-auto bg-ivory w-full max-w-4xl max-h-[92vh] overflow-y-auto grid md:grid-cols-2 border border-line shadow-2xl">
          <div className="relative h-72 md:h-auto md:min-h-[520px]">
            <SmartImage
              src={product.images[0]}
              alt={product.name}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <ProductBadge badge={product.badge} stock={product.stock} />
          </div>

          <div className="p-7 md:p-9">
            <div className="flex justify-between items-start">
              <div className="eyebrow text-emerald">{product.cat}</div>
              <button
                type="button"
                onClick={closeQuickView}
                className="w-9 h-9 border border-line flex items-center justify-center hover:bg-ink hover:text-white"
                aria-label="Close quick view"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <h3 className="font-display text-3xl mt-2">{product.name}</h3>

            <div className="flex items-center gap-2 mt-2">
              <Stars rating={product.rating} />
              <span className="text-xs text-muted">
                {product.rating} ({product.reviews})
              </span>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <span className="font-display text-3xl">{formatPrice(product.price)}</span>
              <span className="text-muted line-through text-sm">{formatPrice(product.mrp)}</span>
            </div>

            <p className="text-sm text-muted mt-3 line-clamp-3">{product.desc}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {product.sizes.slice(0, 5).map((s) => (
                <span key={s} className="text-[11px] border border-line px-2.5 py-1 font-bold bg-white">
                  {s}
                </span>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                disabled={soldOut}
                onClick={() => {
                  closeQuickView();
                  addToBag(product.id);
                }}
                className={`btn flex-1 ${soldOut ? 'btn-disabled' : 'btn-primary'}`}
              >
                <span>{soldOut ? 'Sold Out' : 'Add to Bag'}</span>
              </button>
              <WishButton productId={product.id} />
            </div>

            <Link
              href={`/product/${product.id}`}
              onClick={closeQuickView}
              className="w-full mt-3 btn btn-outline"
            >
              <span>View Full Details</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
