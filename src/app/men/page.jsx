import MenCollection from '@/components/men/MenCollection';
import { CATEGORIES } from '@/data/products';

export const metadata = {
  title: 'Men — FW26 Collection',
  description:
    'The full Vérant men\'s collection: sneakers, tailoring, heavy cottons, outerwear and accessories. Filter by craft, size, colour and material.',
};

export default function MenPage({ searchParams }) {
  const requested = searchParams?.cat;
  const initialCategory = CATEGORIES.includes(requested) ? requested : null;

  return <MenCollection initialCategory={initialCategory} />;
}
