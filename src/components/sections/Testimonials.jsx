import { Quote } from 'lucide-react';
import Stars from '@/components/ui/Stars';
import { TESTIMONIALS } from '@/data/products';

export default function Testimonials() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
      <div className="text-sage mb-4" data-reveal>
        <Quote className="w-10 h-10 mx-auto" aria-hidden="true" />
      </div>

      <p className="font-display text-3xl md:text-5xl leading-tight" data-reveal>
        “Elegance is not standing out. <em className="text-emerald">It is being remembered</em> for
        how quietly you did.”
      </p>

      <div className="eyebrow text-muted mt-6" data-reveal>
        — Aurélien Vérant, Founder
      </div>

      <div className="grid md:grid-cols-3 gap-5 mt-14 text-left" data-stagger>
        {TESTIMONIALS.map((t) => (
          <figure key={t.name} className="bg-white border border-line p-6 hover:border-emerald transition-colors">
            <div className="flex gap-1 mb-4">
              <Stars rating={5} />
            </div>
            <blockquote className="text-sm leading-relaxed text-ink/80">“{t.quote}”</blockquote>
            <figcaption className="mt-5 pt-4 border-t border-line">
              <div className="font-bold text-sm">{t.name}</div>
              <div className="text-[11px] tracking-[0.2em] uppercase text-muted font-bold">
                {t.city} · Verified
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
