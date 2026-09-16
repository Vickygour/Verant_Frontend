import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/** Shared section heading: eyebrow, display title, optional blurb and CTA. */
export default function SectionHead({ eyebrow, title, sub, action }) {
  return (
    <div
      className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14"
      data-reveal
    >
      <div>
        <div className="eyebrow text-emerald flex items-center gap-3">
          <span className="w-10 h-[2px] bg-emerald inline-block" />
          {eyebrow}
        </div>
        <h2 className="font-display text-4xl md:text-6xl mt-4 h-display">{title}</h2>
        {sub ? <p className="text-muted mt-4 max-w-xl leading-relaxed">{sub}</p> : null}
      </div>
      {action ? (
        <Link href={action.href} className="btn btn-outline shrink-0">
          <span>{action.label}</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}
