import Link from 'next/link';
import SmartImage from '@/components/ui/SmartImage';
import { LOOKS } from '@/data/products';

/** Static fallback grid of every look, below the cinematic rail. */
export default function LookbookGrid() {
  return (
    <section className="max-w-[1400px] mx-auto px-5 md:px-12 py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {LOOKS.map((look) => (
        <article key={look.n} className="border border-line bg-white overflow-hidden group" data-reveal>
          <div className="relative overflow-hidden aspect-[3/4]">
            <SmartImage
              src={look.img}
              alt={look.n}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </div>
          <div className="p-5">
            <div className="font-display text-xl">{look.n}</div>
            <div className="text-xs text-muted mt-1">{look.d}</div>
            <Link
              href={`/product/${look.ids[0]}`}
              className="mt-4 inline-block text-[11px] tracking-[0.25em] uppercase font-extrabold text-emerald link-line"
            >
              Shop This Look
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
}
