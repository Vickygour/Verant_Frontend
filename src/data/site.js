/** Brand-level copy and contact details. */
export const SITE = {
  name: 'VÉRANT',
  tagline: 'Maison de Couture',
  established: 'MMXIX',
  description:
    'Sharp tailoring, heavy cottons and hand-finished sneakers. An international maison with an Indian heartbeat — made to be worn for decades, not seasons.',
  email: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'concierge@verant-maison.in',
  phone: process.env.NEXT_PUBLIC_SUPPORT_PHONE || '+91 98290 00007',
  address: '14 Kala Ghoda, Fort, Mumbai 400001',
  hours: 'Mon–Sat 10–8 IST',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
};

export const SIZE_GUIDE_ROWS = [
  ['XS / 30', 34, 30, 7],
  ['S / 32', 36, 32, 8],
  ['M / 34', 38, 34, 9],
  ['L / 36', 40, 36, 10],
  ['XL / 38', 42, 38, 11],
];
