'use client';

import Link from 'next/link';
import { Heart, X } from 'lucide-react';
import SmartImage from '@/components/ui/SmartImage';
import { getProduct } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { useUI } from '@/context/UIContext';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { formatPrice } from '@/lib/format';

export default function WishlistDrawer() {
  const { overlays, closeWishlist } = useUI();
  const { wishlist, moveToCart, toggleWishlist } = useStore();

  const open = overlays.wishlist;
  useLockBodyScroll(open);

  const saved = wishlist.map(getProduct).filter(Boolean);

  return (
    <>
      <div
        onClick={closeWishlist}
        className={`overlay-bg fixed inset-0 bg-ink/40 backdrop-blur-sm z-[80] ${open ? 'open' : ''}`}
        role="presentation"
      />

      <aside
        className={`drawer fixed top-0 right-0 h-full w-full max-w-[460px] bg-ivory z-[81] flex flex-col border-l border-line ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Wishlist"
        aria-hidden={!open}
      >
        <div className="flex justify-between items-center px-6 py-5 border-b border-line bg-white">
          <div>
            <div className="eyebrow text-emerald">Wishlist</div>
            <div className="font-display text-2xl mt-1">{saved.length} Saved</div>
          </div>
          <button
            type="button"
            onClick={closeWishlist}
            className="w-10 h-10 border border-line flex items-center justify-center hover:bg-ink hover:text-white transition"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {saved.length === 0 ? (
            <div className="text-center py-14">
              <Heart className="w-12 h-12 mx-auto text-line" aria-hidden="true" />
              <h4 className="font-display text-2xl mt-4">No saved pieces.</h4>
              <Link href="/men" onClick={closeWishlist} className="btn btn-primary mt-6">
                <span>Explore</span>
              </Link>
            </div>
          ) : (
            saved.map((product) => (
              <div key={product.id} className="flex gap-4 bg-white border border-line p-3">
                <Link
                  href={`/product/${product.id}`}
                  onClick={closeWishlist}
                  className="relative w-20 h-24 shrink-0"
                >
                  <SmartImage
                    src={product.images[0]}
                    alt={product.name}
                    sizes="80px"
                    className="object-cover"
                  />
                </Link>

                <div className="flex-1">
                  <h4 className="font-display text-[15px]">{product.name}</h4>
                  <div className="text-xs text-muted mt-1">{product.cat}</div>
                  <div className="font-extrabold text-sm mt-2">{formatPrice(product.price)}</div>

                  <div className="flex gap-2 mt-3">
                    <button
                      type="button"
                      onClick={() => moveToCart(product.id)}
                      className="flex-1 bg-emerald text-white text-[10px] tracking-[0.15em] font-extrabold uppercase py-2 hover:bg-emerald-deep"
                    >
                      Move to Bag
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      className="w-9 border border-line flex items-center justify-center hover:bg-ink hover:text-white"
                      aria-label={`Remove ${product.name} from wishlist`}
                    >
                      <X className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-line bg-white px-6 py-5">
          <Link href="/wishlist" onClick={closeWishlist} className="btn btn-outline w-full">
            <span>View Full Wishlist</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
