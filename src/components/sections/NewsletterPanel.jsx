'use client';

import SmartImage from '@/components/ui/SmartImage';
import { unsplash } from '@/data/products';
import { useUI } from '@/context/UIContext';

export default function NewsletterPanel() {
  const { toast } = useUI();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    e.target.reset();
    toast('Welcome to the Maison', `10% code sent to ${email}`);
  };

  return (
    <section className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-12 pb-20 md:pb-28">
      <div className="grid lg:grid-cols-2 border border-emerald/20 bg-white overflow-hidden" data-reveal>
        <div className="relative min-h-[320px]">
          <SmartImage
            src={unsplash('1469334031218-e382a71b716b', 900)}
            alt="Members-first campaign"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-emerald-deep/40" />
          <div className="absolute bottom-6 left-6 text-white">
            <div className="eyebrow text-sage">Members First</div>
            <div className="font-display text-3xl mt-2">
              Private drops.
              <br />
              No noise.
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="eyebrow text-emerald">The Verdant Letter</div>
          <h3 className="font-display text-3xl md:text-4xl mt-3">Get 10% off your first order.</h3>
          <p className="text-muted text-sm mt-3">
            Join 40,000+ members. Atelier stories, early access, private sales. One email a week.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
            <label htmlFor="home-newsletter" className="sr-only">
              Email address
            </label>
            <input
              id="home-newsletter"
              name="email"
              type="email"
              required
              placeholder="Email address"
              className="input-lux flex-1"
            />
            <button type="submit" className="btn btn-primary">
              <span>Subscribe</span>
            </button>
          </form>

          <div className="text-[11px] text-muted mt-3">
            By joining you agree to our terms. Unsubscribe anytime.
          </div>
        </div>
      </div>
    </section>
  );
}
