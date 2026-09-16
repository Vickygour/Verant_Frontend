import Link from 'next/link';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="pt-[160px] pb-32 px-6 max-w-2xl mx-auto text-center">
      <div className="eyebrow text-emerald">Error 404</div>
      <h1 className="font-display text-5xl md:text-7xl h-display mt-4">
        This page left
        <br />
        <em className="text-emerald">the atelier.</em>
      </h1>
      <p className="text-muted mt-5">
        The address you followed doesn't exist here. The collection, however, is still very much in
        stock.
      </p>
      <div className="flex flex-wrap gap-4 justify-center mt-8">
        <Link href="/men" className="btn btn-primary">
          <span>Shop Men</span>
        </Link>
        <Link href="/" className="btn btn-outline">
          <span>Back Home</span>
        </Link>
      </div>
    </section>
  );
}
