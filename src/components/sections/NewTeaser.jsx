import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';

export default function NewTeaser({ products }) {
  return (
    <section className="bg-offwhite border-y border-line">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-12 py-20 md:py-28 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32" data-reveal>
            <div className="eyebrow text-emerald flex items-center gap-3">
              <span className="w-10 h-[2px] bg-emerald inline-block" />
              02 — Just Landed
            </div>

            <h2 className="font-display text-4xl md:text-6xl mt-4 h-display">
              New
              <br />
              Features<span className="text-emerald">.</span>
            </h2>

            <p className="text-muted mt-5 leading-relaxed">
              Verdant 07: knit runners, liquid silk and the heaviest hoodie we've ever cut. First
              access for maison members.
            </p>

            <Link href="/new" className="btn btn-primary mt-8">
              <span>Explore All New</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>

            <div className="mt-8 flex items-center gap-4 bg-white border border-line p-4">
              <div className="w-12 h-12 bg-emerald text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="text-sm">
                <b>Limited runs.</b>{' '}
                <span className="text-muted">Sarto Pista High — 500 numbered pairs only.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5" data-stagger>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
