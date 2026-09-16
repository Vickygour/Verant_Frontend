import CheckoutClient from '@/components/checkout/CheckoutClient';

export const metadata = {
  title: 'Checkout',
  description: 'Complete your Vérant order — contact details, shipping method and payment.',
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
