'use client';

import Link from 'next/link';
import SmartImage from '@/components/ui/SmartImage';
import { useCatalog } from '@/context/CatalogContext';
import { formatPrice } from '@/lib/format';

/**
 * Horizontal campaign rail.
 * On desktop `useRevealAnimations` pins this wrapper and scrubs the track sideways;
 * on touch it degrades to a native swipe list.
 */
export default function LookbookRail() {
  const { looks, getProduct } = useCatalog();

  return (
    <section
      data-horizontal-wrap
      className="relative bg-emerald-deep text-white overflow-hidden py-10 lg:py-0 lg:h-screen lg:flex lg:items-center"
    >
      <div
        data-horizontal-track
        className="flex gap-5 overflow-x-auto lg:overflow-visible h-scroll no-scrollbar px-5 md:px-12 lg:w-max"
      >
        {looks.map((look, i) => (
          <article key={look.n} className="look-panel w-[82vw] sm:w-[420px] lg:w-[520px] shrink-0">
            <div className="relative overflow-hidden border border-white/15 aspect-[3/4]">
              <SmartImage
                src={look.img}
                alt={look.n}
                sizes="(max-width: 640px) 82vw, 520px"
                className="object-cover"
              />

              <div className="absolute top-4 left-4 bg-white text-emerald-deep px-4 py-2 font-italiana text-xl z-10">
                0{i + 1}
              </div>

              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-emerald-deep to-transparent p-6 pt-16 z-10">
                <div className="font-display text-2xl">{look.n}</div>
                <div className="text-sage text-sm">{look.d}</div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {look.ids.map((id) => {
                    const product = getProduct(id);
                    if (!product) return null;
                    return (
                      <Link
                        key={id}
                        href={`/product/${id}`}
                        className="bg-white/15 backdrop-blur border border-white/25 text-white text-[11px] font-bold px-3 py-2 hover:bg-white hover:text-emerald-deep transition"
                      >
                        {product.name.split('·')[0].trim()} · {formatPrice(product.price)}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </article>
        ))}

        <div className="look-panel w-[82vw] sm:w-[420px] shrink-0 bg-emerald text-white p-10 flex flex-col justify-center border border-white/15">
          <div className="eyebrow text-sage">End of Story</div>
          <div className="font-display text-4xl mt-4">
            Own the
            <br />
            whole wardrobe.
          </div>
          <Link href="/men" className="btn btn-white mt-8 self-start">
            <span>Shop Men</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
