import Link from 'next/link';
import { RefreshCcw, ShieldCheck, Truck } from 'lucide-react';
import PageAnimations from '@/components/ui/PageAnimations';
import SmartImage from '@/components/ui/SmartImage';
import ProductCard from '@/components/product/ProductCard';
import { unsplash } from '@/data/products';
import { fetchProducts } from '@/lib/api/server';

export const metadata = {
  title: 'New Features — Verdant 07',
  description:
    'Latest releases from the Vérant atelier: knit runners, liquid silk, heavy fleece and numbered limited runs.',
};

const PROMISES = [
  { Icon: Truck, title: 'Free Shipping ₹8,000+', note: 'Pan-India · COD available' },
  { Icon: RefreshCcw, title: '30-Day Returns', note: 'Unworn, with tags' },
  { Icon: ShieldCheck, title: '2-Year Craft Warranty', note: 'Stitching & hardware' },
];

export const revalidate = 60;

export default async function NewPage() {
  const products = await fetchProducts();
  const list = products.filter((p) => p.isNew);

  return (
    <>
      <PageAnimations />

      <section className="pt-[130px] md:pt-[150px] pb-16 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="grid lg:grid-cols-12 gap-6 items-end mb-10" data-reveal>
          <div className="lg:col-span-8">
            <div className="eyebrow text-emerald font-bold tracking-[0.25em] text-xs">
              Season — Verdant 07 · {list.length} Styles
            </div>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl h-display mt-2 leading-tight">
              NEW <em className="text-emerald font-light">FEATURES.</em>
            </h1>
            <p className="text-muted text-sm mt-3 max-w-lg leading-relaxed">
              Latest releases from the atelier. Knit runners, liquid silk, heavy fleece and numbered
              limited runs.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end gap-3">
            <Link href="/men" className="btn btn-outline text-xs py-3 px-6">
              <span>Shop All Men</span>
            </Link>
          </div>
        </div>

        {/* Featured Drop Banner */}
        <div className="relative overflow-hidden border border-line mb-10 h-[260px] md:h-[340px]" data-clip>
          <SmartImage
            src={unsplash('1445205170230-053b83016050', 1600)}
            alt="Verdant 07 drop"
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-deep/85 via-emerald-deep/50 to-transparent flex items-center">
            <div className="p-6 md:p-10 text-white max-w-sm md:max-w-md">
              <div className="eyebrow text-sage text-[10px] tracking-[0.3em]">Drop of the Season</div>
              <div className="font-display text-2xl md:text-4xl mt-2 leading-snug">
                Alpi Knit Runner in Forest Cage
              </div>
              <Link href="/product/2" className="btn btn-white mt-5 text-xs py-2.5 px-5">
                <span>Shop — ₹16,500</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Compact Product Grid (Mobile: 2, Tablet: 3, Desktop: 4) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {list.map((product) => (
            <div key={product.id} className="w-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Promises Footer */}
        <div
          className="mt-14 border border-emerald/25 bg-white p-6 md:p-10 grid md:grid-cols-3 gap-6 text-center shadow-sm"
          data-reveal
        >
          {PROMISES.map(({ Icon, title, note }) => (
            <div key={title} className="flex flex-col items-center">
              <Icon className="w-6 h-6 text-emerald" aria-hidden="true" />
              <div className="font-display text-lg mt-2.5">{title}</div>
              <div className="text-xs text-muted mt-0.5">{note}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}