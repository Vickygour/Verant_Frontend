/** Primary navigation — single source of truth for header, mobile menu and footer. */
export const NAV_LINKS = [
  { index: '01', label: 'New Features', href: '/new' },
  { index: '02', label: 'Men', href: '/men' },
  { index: '03', label: 'Best Seller', href: '/bestseller' },
  { index: '04', label: 'About', href: '/about' },
];

export const FOOTER_MAISON = [...NAV_LINKS, { index: '05', label: 'Lookbook', href: '/lookbook' }];

export const SOCIAL_LINKS = [
  { label: 'Instagram', icon: 'instagram', href: 'https://instagram.com' },
  { label: 'X', icon: 'twitter', href: 'https://x.com' },
  { label: 'Facebook', icon: 'facebook', href: 'https://facebook.com' },
  { label: 'YouTube', icon: 'youtube', href: 'https://youtube.com' },
];
