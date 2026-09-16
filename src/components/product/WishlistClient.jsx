'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import PageAnimations from '@/components/ui/PageAnimations';
import { getProduct } from '@/data/products';
import { useStore } from '@/context/StoreContext';

export default function WishlistClient() {
  const { wishlist, moveToCart } = useStore();
  const saved = wishlist.map(getProduct).filter(Boolean);

  return (
    <>
      <PageAnimations deps={[saved.length]} />

      <section className="pt-[150px] pb-20 px-5 md:px-12 max-w-[1400px] mx-auto">
        <div className="eyebrow text-emerald" data-reveal>
          Saved Pieces — {saved.length}
        </div>
        <h1 className="font-display text-5xl md:text-7xl mt-3 mb-10" data-reveal>
          Wish<em className="text-emerald">list.</em>
        </h1>

        {saved.length === 0 ? (
          <div className="border border-line bg-white p-12 text-center" data-reveal>
            <Heart className="w-12 h-12 mx-auto text-line" aria-hidden="true" />
            <h2 className="font-display text-3xl mt-4">Nothing saved yet.</h2>
            <p className="text-muted text-sm mt-2">
              Tap the heart on any piece to keep it here.
            </p>
            <Link href="/men" className="btn btn-primary mt-6">
              <span>Discover Men</span>
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" data-stagger>
            {saved.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
                <button
                  type="button"
                  onClick={() => moveToCart(product.id)}
                  className="w-full mt-2 btn btn-outline btn-sm"
                >
                  <span>Move to Bag</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
