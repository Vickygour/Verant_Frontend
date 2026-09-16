import Link from 'next/link';
import { RefreshCcw, ShieldCheck, Truck } from 'lucide-react';
import PageAnimations from '@/components/ui/PageAnimations';
import SmartImage from '@/components/ui/SmartImage';
import ProductCard from '@/components/product/ProductCard';
import { PRODUCTS, unsplash } from '@/data/products';

export const metadata = {
  title: 'New Features — Verdant 07',
  description:
    'Latest releases from the Vérant atelier: knit runners, liquid silk, heavy fleece and numbered limited runs.',
};

const SPAN = [
  'md:col-span-7',
  'md:col-span-5 md:mt-12',
  'md:col-span-5',
  'md:col-span-7 md:-mt-6',
];

const PROMISES = [
  { Icon: Truck, title: 'Free Shipping ₹8,000+', note: 'Pan-India · COD available' },
  { Icon: RefreshCcw, title: '30-Day Returns', note: 'Unworn, with tags' },
  { Icon: ShieldCheck, title: '2-Year Craft Warranty', note: 'Stitching & hardware' },
];

export default function NewPage() {
  const list = PRODUCTS.filter((p) => p.isNew);

  return (
    <>
      <PageAnimations />

      <section className="pt-[150px] pb-10 px-5 md:px-10 lg:px-12 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-12" data-reveal>
          <div className="lg:col-span-8">
            <div className="eyebrow text-emerald">Season — Verdant 07 · {list.length} Styles</div>
            <h1 className="font-display text-5xl md:text-8xl h-display mt-4">
              NEW
              <br />
              <em className="text-emerald">FEATURES.</em>
            </h1>
            <p className="text-muted mt-5 max-w-lg">
              Latest releases from the atelier. Knit runners, liquid silk, heavy fleece and numbered
              limited runs.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end gap-3">
            <Link href="/men" className="btn btn-outline">
              <span>Shop All Men</span>
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden border border-line mb-12 h-[320px] md:h-[420px]" data-clip>
          <SmartImage
            src={unsplash('1445205170230-053b83016050', 1600)}
            alt="Verdant 07 drop"
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-deep/80 to-transparent flex items-center">
            <div className="p-8 md:p-12 text-white max-w-md">
              <div className="eyebrow text-sage">Drop of the Season</div>
              <div className="font-display text-3xl md:text-5xl mt-3">
                Alpi Knit Runner in Forest Cage
              </div>
              <Link href="/product/2" className="btn btn-white mt-6">
                <span>Shop — ₹16,500</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-5">
          {list.map((product, i) => (
            <div key={product.id} className={SPAN[i % 4]}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div
          className="mt-16 border border-emerald/25 bg-white p-8 md:p-12 grid md:grid-cols-3 gap-8 text-center"
          data-reveal
        >
          {PROMISES.map(({ Icon, title, note }) => (
            <div key={title}>
              <Icon className="w-7 h-7 mx-auto text-emerald" aria-hidden="true" />
              <div className="font-display text-xl mt-3">{title}</div>
              <div className="text-xs text-muted mt-1">{note}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
