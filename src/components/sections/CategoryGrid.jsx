import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import SmartImage from '@/components/ui/SmartImage';
import SectionHead from '@/components/ui/SectionHead';
import { CATEGORY_TILES } from '@/data/products';

/** Category entry points — each link pre-filters the Men collection. */
export default function CategoryGrid() {
  const primary = CATEGORY_TILES.slice(0, 4);
  const secondary = CATEGORY_TILES.slice(4);

  return (
    <section className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-12 py-20 md:py-28">
      <SectionHead
        eyebrow="03 — The Wardrobe"
        title={
          <>
            Shop by
            <br />
            <em className="text-emerald">Craft.</em>
          </>
        }
        sub="Seven disciplines. One standard. Select a craft to enter the Men collection filtered."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" data-stagger>
        {primary.map(([name, image], i) => (
          <Link
            key={name}
            href={`/men?cat=${encodeURIComponent(name)}`}
            className="relative overflow-hidden group aspect-[3/4] border border-line"
          >
            <SmartImage
              src={image}
              alt={name}
              sizes="(max-width: 1024px) 45vw, 23vw"
              className="object-cover transition-transform duration-[1.2s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/90 via-emerald-deep/20 to-transparent" />
            <div className="absolute bottom-0 p-5 text-white w-full">
              <div className="text-[10px] tracking-[0.3em] font-bold text-sage">0{i + 1}</div>
              <div className="font-display text-2xl mt-1">{name}</div>
              <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase font-bold mt-2 opacity-0 group-hover:opacity-100 transition">
                Enter <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4" data-stagger>
        {secondary.map(([name, image]) => (
          <Link
            key={name}
            href={`/men?cat=${encodeURIComponent(name)}`}
            className="relative overflow-hidden group aspect-[16/10] border border-line"
          >
            <SmartImage
              src={image}
              alt={name}
              sizes="(max-width: 1024px) 45vw, 31vw"
              className="object-cover transition-transform duration-[1.2s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/90 via-transparent to-transparent" />
            <div className="absolute bottom-0 p-5 text-white">
              <div className="font-display text-2xl">{name}</div>
            </div>
            <div className="absolute top-4 right-4 w-10 h-10 bg-white text-emerald flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
