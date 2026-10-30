'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SmartImage from '@/components/ui/SmartImage';
import Stars from '@/components/ui/Stars';
import ProductBadge from '@/components/ui/ProductBadge';
import WishButton from '@/components/ui/WishButton';
import { useStore } from '@/context/StoreContext';
import { useUI } from '@/context/UIContext';
import { discountPercent, formatPrice } from '@/lib/format';

/** Catalogue tile: image swap on hover, quick view and one-tap add to bag. */
export default function ProductCard({ product, className = '' }) {
  const router = useRouter();
  const { addToBag } = useStore();
  const { openQuickView } = useUI();

  const off = discountPercent(product.price, product.mrp);
  const soldOut = product.stock === 0;
  const href = `/product/${product.id}`;

  // ✅ SAFE IMAGE HANDLING
  const images = Array.isArray(product?.images) ? product.images.filter(Boolean) : [];
  const hasImage = images.length > 0;
  const primaryImage = images[0];
  const hoverImage = images[1] || primaryImage;

  return (
    <article className={`product-card ${className}`} data-reveal>
      <div
        className="img-wrap aspect-[3/4] cursor-pointer"
        onClick={() => router.push(href)}
        role="presentation"
      >
        <ProductBadge badge={product.badge} stock={product.stock} />

        <div className="absolute top-3 right-3 z-10">
          <WishButton productId={product.id} />
        </div>

        {hasImage ? (
          <>
            <SmartImage
              src={primaryImage}
              alt={product.name}
              className="main w-full h-full object-cover"
              sizes="(max-width: 640px) 90vw, (max-width: 1280px) 45vw, 30vw"
            />
            <SmartImage
              src={hoverImage}
              alt={`${product.name} alternate view`}
              className="alt w-full h-full object-cover"
              sizes="(max-width: 640px) 90vw, (max-width: 1280px) 45vw, 30vw"
            />
          </>
        ) : (
          // ✅ NO IMAGE PLACEHOLDER
          <div className="w-full h-full flex items-center justify-center bg-[#F2F0E9] text-center px-4">
            <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-bold">
              No image available
            </span>
          </div>
        )}

        <div className="quick-add z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product.id);
            }}
            className="flex-1 bg-white/95 backdrop-blur text-[10px] tracking-[0.2em] font-extrabold uppercase py-3 hover:bg-white"
          >
            Quick View
          </button>
          <button
            type="button"
            disabled={soldOut}
            onClick={(e) => {
              e.stopPropagation();
              addToBag(product.id);
            }}
            className={`flex-1 text-white text-[10px] tracking-[0.2em] font-extrabold uppercase py-3 ${soldOut ? 'bg-ink/40 cursor-not-allowed' : 'bg-emerald hover:bg-emerald-deep'
              }`}
          >
            {soldOut ? 'Sold Out' : 'Add to Bag'}
          </button>
        </div>
      </div>

      <div className="p-4 md:p-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-emerald">
            {product.cat}
          </span>
          <Stars rating={product.rating} />
        </div>

        <h3 className="font-display text-lg md:text-xl leading-tight">
          <Link href={href} className="hover:text-emerald transition-colors">
            {product.name}
          </Link>
        </h3>

        <div className="text-xs text-muted mt-1">{product.material}</div>

        <div className="flex items-center gap-2 mt-3">
          <span className="font-extrabold text-[15px]">{formatPrice(product.price)}</span>
          <span className="text-xs text-muted line-through">{formatPrice(product.mrp)}</span>
          <span className="text-[10px] font-extrabold text-emerald bg-sagelight px-2 py-[2px]">
            -{off}%
          </span>
        </div>
      </div>
    </article>
  );
}