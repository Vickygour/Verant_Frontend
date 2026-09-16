import Link from 'next/link';
import { Check, Gem, Layers, Ruler, Scissors } from 'lucide-react';
import PageAnimations from '@/components/ui/PageAnimations';
import SmartImage from '@/components/ui/SmartImage';
import { CRAFT, unsplash } from '@/data/products';

export const metadata = {
  title: 'About the Maison',
  description:
    'Founded in Milano, hand-finished in Jaipur. Seven years, three ateliers and 100% traced cloth — inside Maison Vérant.',
};

const CHECKLIST = [
  { Icon: Scissors, title: 'Pattern', note: 'Toiled 3x before bulk. 2mm tolerance.' },
  { Icon: Layers, title: 'Cloth', note: 'Lab-tested for pilling, tear, colour.' },
  { Icon: Ruler, title: 'Fit', note: 'Worn-tested 30 days by atelier staff.' },
  { Icon: Gem, title: 'Finish', note: 'Hand-rolled hems, burnished edges.' },
];

const TIMELINE = [
  ['2019', 'Founded in Milano', 'Two tailors, one last.'],
  ['2021', 'Jaipur Atelier', 'Hand-finishing house opens.'],
  ['2023', 'Verdant 01', 'First sold-out sneaker.'],
  ['2025', '40,000 Clients', 'Pan-India maison.'],
  ['2026', 'Verdant 07', 'Our sharpest drop yet.'],
];

const FIGURES = [
  ['07', 'Years'],
  ['03', 'Ateliers'],
  ['40k+', 'Clients'],
  ['100%', 'Traced Cloth'],
];

const DESIGN_POINTS = [
  'Continental block, adapted for India',
  'Muted palette: ivory, forest, sage, stone',
  'Seasonless — 70% of styles never retire',
];

export default function AboutPage() {
  return (
    <>
      <PageAnimations />

      <section className="relative h-[92vh] min-h-[600px] overflow-hidden flex items-end">
        <SmartImage
          src={unsplash('1441986300917-64674bd600d8', 1800)}
          alt="Inside the Vérant maison"
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep via-emerald-deep/40 to-transparent" />

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 pb-16 text-white w-full">
          <div className="eyebrow text-sage" data-reveal>
            Maison Vérant — Est. MMXIX
          </div>

          <h1 className="font-display text-5xl md:text-8xl h-display mt-4" data-reveal>
            WE CUT
            <br />
            <em className="text-sage">STANDARDS,</em>
            <br />
            NOT CORNERS.
          </h1>

          <div className="flex flex-wrap gap-8 mt-8 text-sm" data-reveal>
            {FIGURES.map(([value, label]) => (
              <div key={label}>
                <b className="font-display text-2xl">{value}</b>
                <div className="text-white/60 text-[11px] tracking-[0.25em] uppercase">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="eyebrow text-emerald" data-reveal>
          Brand Philosophy
        </div>
        <p className="font-display text-3xl md:text-5xl leading-tight mt-6" data-reveal>
          Luxury is <em className="text-emerald">discipline.</em> Fewer, sharper pieces — cut to
          outlive trends and to be repaired, <em className="text-emerald">never replaced.</em>
        </p>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 md:px-12 grid lg:grid-cols-2 gap-8 items-center pb-20">
        <div className="overflow-hidden border border-line relative aspect-[4/5]" data-clip>
          <SmartImage
            src={unsplash('1445205170230-053b83016050', 1000)}
            alt="Design studio"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div data-reveal>
          <div className="eyebrow text-emerald">01 — Design</div>
          <h2 className="font-display text-4xl md:text-5xl mt-4">
            Sharp, minimal,
            <br />
            fashion-forward.
          </h2>
          <p className="text-muted mt-5 leading-relaxed">
            Every Vérant pattern starts on paper in Milano and is graded for Indian builds in Jaipur.
            No logos screaming. A 4mm monogram, a forest lining, a perfect shoulder — details for
            those who notice.
          </p>
          <ul className="mt-6 space-y-3 text-sm font-semibold">
            {DESIGN_POINTS.map((point) => (
              <li key={point} className="flex gap-3">
                <Check className="w-5 h-5 text-emerald shrink-0" aria-hidden="true" /> {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-emerald-deep text-white py-20">
        <div className="max-w-[1400px] mx-auto px-5 md:px-12 grid lg:grid-cols-2 gap-8 items-center">
          <div data-reveal>
            <div className="eyebrow text-sage">02 — Craftsmanship &amp; Materials</div>
            <h2 className="font-display text-4xl md:text-5xl mt-4">
              40 hours.
              <br />
              One jacket.
            </h2>
            <p className="text-white/60 mt-5 leading-relaxed">
              Full-grain Tuscan leather, 240 GSM Gujarat organic cotton, Como silk, Kaihara selvedge.
              Cut by master tailors, finished by hand, checked three times before it ships.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {CRAFT.slice(0, 2).map((c) => (
                <div key={c.t} className="border border-white/15 p-4">
                  <div className="font-display text-lg">{c.t}</div>
                  <div className="text-xs text-white/50 mt-1">{c.d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4" data-stagger>
            {CRAFT.map((c) => (
              <div key={c.t} className="relative aspect-square border border-white/10">
                <SmartImage
                  src={c.img}
                  alt={c.t}
                  sizes="(max-width: 1024px) 45vw, 22vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 md:px-12 py-20">
        <div className="eyebrow text-emerald text-center" data-reveal>
          Attention to Detail — The Vérant Checklist
        </div>

        <div className="grid md:grid-cols-4 gap-px bg-line border border-line mt-10" data-stagger>
          {CHECKLIST.map(({ Icon, title, note }) => (
            <div key={title} className="bg-white p-8 text-center hover:bg-offwhite transition">
              <Icon className="w-7 h-7 mx-auto text-emerald" aria-hidden="true" />
              <div className="font-display text-xl mt-4">{title}</div>
              <div className="text-xs text-muted mt-2">{note}</div>
            </div>
          ))}
        </div>

        <ol className="mt-16 grid md:grid-cols-5 gap-6 items-start" data-stagger>
          {TIMELINE.map(([year, title, note], i) => (
            <li
              key={year}
              className={`border-t-2 pt-4 ${i === TIMELINE.length - 1 ? 'border-emerald' : 'border-line'}`}
            >
              <div className={`font-display text-3xl ${i === TIMELINE.length - 1 ? 'text-emerald' : ''}`}>
                {year}
              </div>
              <div className="font-bold text-sm mt-2">{title}</div>
              <div className="text-xs text-muted mt-1">{note}</div>
            </li>
          ))}
        </ol>

        <div className="mt-16 relative overflow-hidden border border-line h-[380px]" data-clip>
          <SmartImage
            src={unsplash('1469334031218-e382a71b716b', 1600)}
            alt="Brand vision"
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-emerald-deep/60 flex items-center justify-center text-center p-8">
            <div>
              <div className="eyebrow text-sage">Brand Vision</div>
              <div className="font-display text-3xl md:text-5xl text-white mt-4 max-w-2xl">
                To be India's first truly international luxury house —{' '}
                <em className="text-sage">worn beyond time.</em>
              </div>
              <Link href="/men" className="btn btn-white mt-8">
                <span>Wear the Standard</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
