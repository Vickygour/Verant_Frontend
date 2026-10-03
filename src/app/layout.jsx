import '@/app/globals.css';
import Providers from '@/app/providers';
import SiteChrome from '@/components/layout/SiteChrome';
import { SITE } from '@/data/site';
import { GoogleOAuthProvider } from '@react-oauth/google';

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'VÉRANT — Maison de Couture | Luxury Fashion',
    template: '%s | VÉRANT',
  },
  description: SITE.description,
  keywords: [
    'luxury fashion',
    'menswear India',
    'designer sneakers',
    'tailoring',
    'VÉRANT',
    'Maison de Couture',
  ],
  openGraph: {
    title: 'VÉRANT — Maison de Couture',
    description: SITE.description,
    type: 'website',
    locale: 'en_IN',
    siteName: 'VÉRANT',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VÉRANT — Maison de Couture',
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B3D2E',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,300;1,9..144,400;1,9..144,500;1,9..144,600&family=Italiana&family=Manrope:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          <Providers>
            <SiteChrome>{children}</SiteChrome>
          </Providers>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}