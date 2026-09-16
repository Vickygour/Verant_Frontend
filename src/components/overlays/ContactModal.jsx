'use client';

import { Mail, MapPin, Phone, X } from 'lucide-react';
import { SITE } from '@/data/site';
import { useUI } from '@/context/UIContext';

export default function ContactModal() {
  const { overlays, closeContact, toast } = useUI();
  const open = overlays.contact;

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    closeContact();
    toast('Message Sent', 'Our concierge replies within 24 hours.');
  };

  return (
    <>
      <div
        onClick={closeContact}
        className={`overlay-bg fixed inset-0 bg-ink/50 z-[92] ${open ? 'open' : ''}`}
        role="presentation"
      />
      <div
        className={`fixed inset-0 z-[93] ${open ? 'flex' : 'hidden'} items-center justify-center p-4 pointer-events-none`}
        role="dialog"
        aria-modal="true"
        aria-label="Contact the maison"
      >
        <div className="pointer-events-auto bg-ivory max-w-lg w-full p-8 border border-line">
          <div className="flex justify-between items-center mb-2">
            <div className="eyebrow text-emerald">Atelier Concierge</div>
            <button
              type="button"
              onClick={closeContact}
              className="w-10 h-10 border border-line flex items-center justify-center hover:bg-ink hover:text-white"
              aria-label="Close contact form"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <h3 className="font-display text-3xl mb-6">Contact the Maison</h3>

          <div className="space-y-3 text-sm mb-6">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-emerald" aria-hidden="true" /> {SITE.email}
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-emerald" aria-hidden="true" /> {SITE.phone} ·{' '}
              {SITE.hours}
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-emerald" aria-hidden="true" /> {SITE.address}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input required placeholder="Your name" className="input-lux" aria-label="Your name" />
            <input
              required
              type="email"
              placeholder="Email"
              className="input-lux"
              aria-label="Email"
            />
            <textarea
              required
              placeholder="Message"
              rows={3}
              className="input-lux"
              aria-label="Message"
            />
            <button type="submit" className="btn btn-primary w-full">
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
