'use client';

import Link from 'next/link';
import SmartImage from '@/components/ui/SmartImage';
import WishButton from '@/components/ui/WishButton';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/lib/format';

/** Podium for the top three sellers. */
export default function BestSellerHero({ products, total }) {
  const { addToBag } = useStore();

  return (
    <section className="pt-[150px] bg-emerald-deep text-white px-5 md:px-10 lg:px-12 pb-16 relative overflow-hidden">
      <div className="blob w-[500px] h-[500px] bg-emerald-light/40 top-0 right-0" />

      <div className="max-w-[1400px] mx-auto relative">
        <div className="eyebrow text-sage" data-reveal>
          Most Wanted — {total} Icons · 4.8★ Average
        </div>

        <h1 className="font-display text-5xl md:text-8xl h-display mt-4" data-reveal>
          BEST
          <br />
          <em className="text-sage">SELLERS.</em>
        </h1>

        <p className="text-white/60 max-w-lg mt-5" data-reveal>
          Rated by 4,000+ verified clients. Restocked monthly — when they're gone, they're gone.
        </p>

        <div className="grid md:grid-cols-3 gap-5 mt-12" data-stagger>
          {products.map((product, i) => (
            <div
              key={product.id}
              className="bg-white text-ink border border-white/10 relative overflow-hidden group"
            >
              <div className="absolute top-4 left-4 z-10 bg-white text-emerald-deep font-italiana text-4xl w-14 h-14 flex items-center justify-center">
                0{i + 1}
              </div>
              <div className="absolute top-4 right-4 z-10">
                <WishButton productId={product.id} />
              </div>

              <Link href={`/product/${product.id}`} className="block relative aspect-[4/5]">
                <SmartImage
                  src={product.images[0]}
                  alt={product.name}
                  sizes="(max-width: 768px) 90vw, 30vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </Link>

              <div className="p-5">
                <div className="text-[10px] tracking-[0.25em] uppercase font-extrabold text-emerald">
                  {product.cat} · ★ {product.rating} ({product.reviews})
                </div>
                <div className="font-display text-2xl mt-1">
                  <Link href={`/product/${product.id}`} className="hover:text-emerald transition">
                    {product.name}
                  </Link>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-extrabold text-lg">{formatPrice(product.price)}</span>
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
          ))}
        </div>
      </div>
    </section>
  );
}
