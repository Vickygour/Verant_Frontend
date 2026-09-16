import PageAnimations from '@/components/ui/PageAnimations';
import LookbookRail from '@/components/sections/LookbookRail';
import LookbookGrid from '@/components/sections/LookbookGrid';

export const metadata = {
  title: 'Lookbook — Verdant 07',
  description:
    'Six looks shot on film between the Western Ghats and South Mumbai. Tap any tag to shop the look.',
};

export default function LookbookPage() {
  return (
    <>
      <PageAnimations />

      <section className="pt-[150px] pb-8 px-5 md:px-12 max-w-[1400px] mx-auto">
        <div className="eyebrow text-emerald" data-reveal>
          Campaign — Verdant 07 · Shot on Film
        </div>
        <h1 className="font-display text-5xl md:text-8xl h-display mt-4" data-reveal>
          LOOK
          <br />
          <em className="text-emerald">BOOK.</em>
        </h1>
        <p className="text-muted max-w-lg mt-4" data-reveal>
          Scroll to travel through six looks — from Sahyadri mist to midnight Milano. Tap any tag to
          shop the look. Desktop: pinned cinematic scroll. Mobile: swipe.
        </p>
      </section>

      <LookbookRail />
      <LookbookGrid />
    </>
  );
}
