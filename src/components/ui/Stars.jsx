import { Star } from 'lucide-react';

/** Five-star rating row. */
export default function Stars({ rating = 5, className = '' }) {
  const filled = Math.round(rating);
  return (
    <span className={`flex gap-[2px] ${className}`} aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i <= filled ? 'fill-emerald text-emerald' : 'text-line'}`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}
