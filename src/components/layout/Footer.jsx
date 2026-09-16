'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { FOOTER_MAISON } from '@/data/navigation';
import { SITE } from '@/data/site';
import { useUI } from '@/context/UIContext';

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com', Icon: Instagram },
  { label: 'X', href: 'https://x.com', Icon: Twitter },
  { label: 'Facebook', href: 'https://facebook.com', Icon: Facebook },
  { label: 'YouTube', href: 'https://youtube.com', Icon: Youtube },
];

export default function Footer() {
  const { openContact, openSizeGuide, toast } = useUI();

  const handleNewsletter = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    e.target.reset();
    toast('Welcome to the Maison', `10% code sent to ${email}`);
  };

  return (
    <footer className="bg-emerald-deep text-white relative overflow-hidden">
      <div className="grid-lines absolute inset-0 opacity-20" aria-hidden="true" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-8">
        <div className="grid lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-white text-emerald-deep flex items-center justify-center font-italiana text-2xl">
                V
              </div>
              <div>
                <div className="font-italiana text-3xl tracking-[0.15em]">{SITE.name}</div>
                <div className="text-[10px] tracking-[0.4em] text-sage font-bold">
                  MAISON DE COUTURE
                </div>
              </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              A fictional international luxury house crafting sharp tailoring, heavy cottons and
              hand-finished sneakers. Designed in Milano, made for the new Indian standard.
            </p>

            <div className="flex gap-2 mt-6">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-emerald-deep transition"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="eyebrow text-sage mb-5">Maison</div>
            <ul className="space-y-3 text-sm font-semibold">
              {FOOTER_MAISON.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-sage transition link-line">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="eyebrow text-sage mb-5">Client Care</div>
            <ul className="space-y-3 text-sm font-semibold text-white/80">
              <li>
                <button type="button" onClick={openContact} className="hover:text-sage transition">
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openSizeGuide}
                  className="hover:text-sage transition"
                >
                  Size Guide
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    toast('Shipping', 'Standard 3–5 days · Express 24–48 hrs across India.')
                  }
                  className="hover:text-sage transition"
                >
                  Shipping
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => toast('Returns', '30-day complimentary returns. Unworn, with tags.')}
                  className="hover:text-sage transition"
                >
                  Returns
                </button>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-sage transition">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <div className="eyebrow text-sage mb-5">The Verdant Letter</div>
            <p className="text-white/60 text-sm mb-4">
              Private drops, atelier stories and 10% off your first order.
            </p>

            <form
              onSubmit={handleNewsletter}
              className="flex border border-white/20 focus-within:border-sage transition"
            >
              <label htmlFor="footer-newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="footer-newsletter"
                name="email"
                type="email"
                required
                placeholder="Email address"
                className="flex-1 bg-transparent px-4 py-4 text-sm outline-none placeholder:text-white/40"
              />
              <button
                type="submit"
                className="bg-white text-emerald-deep px-6 text-[11px] tracking-[0.25em] font-extrabold uppercase hover:bg-sage transition"
              >
                Join
              </button>
            </form>

            <div className="mt-5 text-xs text-white/50 leading-relaxed">
              {SITE.email}
              <br />
              {SITE.address} · {SITE.phone}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-7 text-[11px] tracking-[0.2em] uppercase text-white/40 font-bold">
          <div>© {new Date().getFullYear()} Maison Vérant · All Rights Reserved</div>
          <div className="flex gap-5">
            <span>UPI</span>
            <span>Visa</span>
            <span>Mastercard</span>
            <span>COD</span>
          </div>
          <div>Crafted Beyond Season</div>
        </div>
      </div>

      <div
        className="font-italiana text-[18vw] leading-none text-center text-white/[0.04] select-none pointer-events-none -mb-[4vw]"
        aria-hidden="true"
      >
        {SITE.name}
      </div>
    </footer>
  );
}
