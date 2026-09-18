import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SmartImage from '@/components/ui/SmartImage';
import { unsplash } from '@/data/products';

const STATS = [
  { value: '24', label: 'Artisanal Styles', dec: 0 },
  { value: '4.9', label: 'Client Rating', dec: 1, suffix: '★' },
  { value: '40', label: 'Craft Hours', dec: 0, suffix: '+' },
];

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden grid-lines pt-[150px] pb-16 px-5 md:px-10 lg:px-12">
      <div className="blob w-[500px] h-[500px] bg-sagelight/70 -top-20 -left-20" />
      <div className="blob w-[400px] h-[400px] bg-emerald/10 top-1/3 right-0" />
      <div
        className="absolute bottom-0 left-0 font-italiana text-[20vw] leading-none outline-text opacity-60 select-none pointer-events-none whitespace-nowrap"
        aria-hidden="true"
      >
        VÉRANT
      </div>

      <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-12 gap-10 items-center relative z-10">
        <div className="lg:col-span-7">
          <div className="hero-el inline-flex items-center gap-3 border border-emerald/25 bg-white px-4 py-2 text-[10px] tracking-[0.3em] font-extrabold uppercase text-emerald">
            <span className="w-2 h-2 bg-emerald pulse-dot" /> Verdant 07 — New Drop Live
          </div>

          <h1 className="hero-el font-display h-display text-[15vw] sm:text-7xl lg:text-[6.5rem] mt-6">
            DRESS
            <br />
            <em className="text-emerald font-light">Beyond</em> SEASON
            <span className="text-emerald">.</span>
          </h1>

          <p className="hero-el mt-6 text-muted max-w-md leading-relaxed">
            Sharp tailoring, heavy cottons and hand-finished sneakers. An international maison with
            an Indian heartbeat — made to be worn for decades, not seasons.
          </p>

          <div className="hero-el flex flex-wrap gap-4 mt-8">
            <Link href="/new" className="btn btn-primary">
              <span>Shop New Features</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link href="/lookbook" className="btn btn-outline">
              <span>View Lookbook</span>
            </Link>
          </div>

          <div className="hero-el grid grid-cols-3 gap-6 mt-10 max-w-md border-t border-line pt-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-3xl">
                  <span data-count={stat.value} data-dec={stat.dec}>
                    0
                  </span>
                  {stat.suffix || ''}
                </div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-muted font-bold mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="hero-img relative border border-emerald/20 p-3 bg-white shadow-2xl" data-clip>
            <div className="relative w-full aspect-[3/4]">
              <SmartImage
                src={unsplash('1606107557195-0e29a4b5b4aa', 1000)}
                alt="Vérant campaign portrait"
                priority
                sizes="(max-width: 1024px) 90vw, 40vw"  
                className="object-cover"
              />
            </div>

            <div className="absolute -top-6 -right-4 md:-right-8 w-28 h-28 md:w-32 md:h-32">
              <div className="spin-slow w-full h-full">
                <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
                  <defs>
                    <path
                      id="circ"
                      d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
                    />
                  </defs>
                  <text
                    className="fill-emerald"
                    style={{ fontSize: '10px', letterSpacing: '2px', fontWeight: 800 }}
                  >
                    <textPath href="#circ">HAND FINISHED · VERDANT 07 · </textPath>
                  </text>
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-emerald text-white flex items-center justify-center font-italiana text-xl">
                  V
                </div>
              </div>
            </div>
          </div>

          

          <div className="hero-el animate-float-b absolute -right-2 md:right-6 -bottom-6 bg-emerald-deep text-white px-5 py-4 shadow-xl">
            <div className="text-[10px] tracking-[0.3em] uppercase text-sage font-bold">Craft</div>
            <div className="font-display text-lg mt-1">40 hrs · One Shoes</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted">
        <span className="text-[10px] tracking-[0.35em] uppercase font-bold">Scroll</span>
        <div className="w-[1px] h-10 bg-emerald/40 overflow-hidden">
          <div className="w-full h-1/2 bg-emerald animate-bounce" />
        </div>
      </div>
    </section>
  );
}
