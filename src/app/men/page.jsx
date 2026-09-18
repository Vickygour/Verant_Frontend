import MenCollection from '@/components/men/MenCollection';
import { fetchCategories } from '@/lib/api/server';

export const metadata = {
  title: 'Men — FW26 Collection',
  description:
    'The full Vérant men\'s collection: sneakers, tailoring, heavy cottons, outerwear and accessories. Filter by craft, size, colour and material.',
};

export const revalidate = 60;

export default async function MenPage({ searchParams }) {
  const params = await searchParams;
  const categories = await fetchCategories();

  const requested = params?.cat;
  const initialCategory = categories.includes(requested) ? requested : null;

  return <MenCollection initialCategory={initialCategory} />;
}
