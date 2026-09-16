'use client';

import Link from 'next/link';
import SmartImage from '@/components/ui/SmartImage';
import Stars from '@/components/ui/Stars';
import ProductBadge from '@/components/ui/ProductBadge';
import WishButton from '@/components/ui/WishButton';
import { useStore } from '@/context/StoreContext';
import { useUI } from '@/context/UIContext';
import { formatPrice } from '@/lib/format';

/** Wide editorial rows for the remaining bestsellers. */
export default function BestSellerList({ products }) {
  const { addToBag } = useStore();
  const { openQuickView } = useUI();

  return (
    <section className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-12 py-16">
      <div className="eyebrow text-emerald mb-8" data-reveal>
        Complete the Icons — Bestseller Wardrobe
      </div>

      <div className="space-y-5">
        {products.map((product) => (
          <article
            key={product.id}
            className="grid md:grid-cols-12 bg-white border border-line overflow-hidden hover:border-emerald transition-colors"
            data-reveal
          >
            <Link
              href={`/product/${product.id}`}
              className="md:col-span-4 relative overflow-hidden group h-72 md:h-auto md:min-h-[260px]"
            >
              <SmartImage
                src={product.images[0]}
                alt={product.name}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <ProductBadge badge={product.badge} stock={product.stock} />
            </Link>

            <div className="md:col-span-8 p-6 md:p-8 flex flex-col justify-center">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[10px] tracking-[0.25em] uppercase font-extrabold text-emerald">
                    {product.cat}
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl mt-2">
                    <Link href={`/product/${product.id}`} className="hover:text-emerald transition">
                      {product.name}
                    </Link>
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Stars rating={product.rating} />
                    <span className="text-xs text-muted">
                      {product.rating} · {product.reviews} reviews
                    </span>
                  </div>
                </div>
                <WishButton productId={product.id} />
              </div>

              <p className="text-sm text-muted mt-3 line-clamp-2">{product.desc}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {product.sizes.slice(0, 5).map((s) => (
                  <span key={s} className="text-[11px] border border-line px-2.5 py-1 font-bold">
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-5 pt-5 border-t border-line">
                <div className="flex items-center gap-2">
                  <span className="font-display text-2xl font-semibold">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-sm text-muted line-through">
                    {formatPrice(product.mrp)}
                  </span>
                </div>

                <div className="flex gap-3 ml-auto">
                  <button
                    type="button"
                    onClick={() => openQuickView(product.id)}
                    className="btn btn-outline btn-sm"
                  >
                    <span>Quick View</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => addToBag(product.id)}
                    className="btn btn-primary btn-sm"
                  >
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
