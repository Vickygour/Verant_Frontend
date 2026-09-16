import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SmartImage from '@/components/ui/SmartImage';
import { CRAFT } from '@/data/products';

const FIGURES = [
  ['18', 'Stitches / inch'],
  ['100%', 'Traced fibres'],
  ['500', 'GSM Max fleece'],
  ['40h', 'Per leather jacket'],
];

export default function CraftSection() {
  return (
    <section className="bg-emerald-deep text-white relative overflow-hidden">
      <div className="blob w-[600px] h-[600px] bg-emerald-light/30 -top-40 right-0" />

      <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-12 py-20 md:py-28 grid lg:grid-cols-2 gap-12 items-center relative">
        <div data-reveal>
          <div className="eyebrow text-sage flex items-center gap-3">
            <span className="w-10 h-[2px] bg-sage inline-block" />
            04 — Material &amp; Craftsmanship
          </div>

          <h2 className="font-display text-4xl md:text-6xl mt-4 h-display">
            Cloth is
            <br />
            our <em className="text-sage">language.</em>
          </h2>

          <p className="text-white/60 mt-5 leading-relaxed max-w-md">
            Macro-obsessed. From 240 GSM organic cotton to Tuscan aniline leather — every fibre is
            traced, tested and hand-finished.
          </p>

          <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 mt-8">
            {FIGURES.map(([value, label]) => (
              <div key={label} className="bg-emerald-deep p-6">
                <div className="font-display text-4xl text-sage">{value}</div>
                <div className="text-[11px] tracking-[0.2em] uppercase text-white/60 font-bold mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <Link href="/about" className="btn btn-white mt-8">
            <span>Inside the Atelier</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4" data-stagger>
          {CRAFT.map((item, i) => (
            <div
              key={item.t}
              className={`relative overflow-hidden border border-white/10 ${i % 2 ? 'mt-8' : ''}`}
            >
              <div className="relative w-full aspect-[3/4]">
                <SmartImage
                  src={item.img}
                  alt={item.t}
                  sizes="(max-width: 1024px) 45vw, 22vw"
                  className="object-cover hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-emerald-deep/90 backdrop-blur p-4">
                <div className="font-display text-base leading-tight">{item.t}</div>
                <div className="text-[11px] text-white/60 mt-1 line-clamp-2">{item.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
