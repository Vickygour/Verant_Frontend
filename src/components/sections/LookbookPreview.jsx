'use client';

import SmartImage from '@/components/ui/SmartImage';
import SectionHead from '@/components/ui/SectionHead';
import { useCatalog } from '@/context/CatalogContext';

export default function LookbookPreview() {
  const { looks } = useCatalog();

  return (
    <section className="bg-offwhite border-y border-line py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-12">
        <SectionHead
          eyebrow="06 — Campaign"
          title={
            <>
              Verdant 07
              <br />
              <em className="text-emerald">Lookbook.</em>
            </>
          }
          sub="Shot on film between the Western Ghats and South Mumbai. Six looks, one discipline."
          action={{ label: 'Enter Lookbook', href: '/lookbook' }}
        />

        <div className="grid md:grid-cols-12 gap-5">
          <div
            className="md:col-span-5 relative overflow-hidden border border-line aspect-[3/4]"
            data-clip
          >
            <SmartImage
              src={looks[0]?.img}
              alt={looks[0]?.n}
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute bottom-0 bg-white/95 backdrop-blur p-5 w-full z-10">
              <div className="eyebrow text-emerald">Look 01</div>
              <div className="font-display text-2xl">Verdant Tailoring</div>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 gap-5">
            {looks.slice(1, 5).map((look) => (
              <div
                key={look.n}
                className="relative overflow-hidden border border-line aspect-[3/4]"
                data-reveal
              >
                <SmartImage
                  src={look.img}
                  alt={look.n}
                  sizes="(max-width: 768px) 45vw, 28vw"
                  className="object-cover hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute top-3 left-3 bg-white/95 px-3 py-1 text-[10px] tracking-[0.2em] font-extrabold z-10">
                  {look.n.split('—')[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
