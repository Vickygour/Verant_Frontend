import OrdersClient from '@/components/account/OrdersClient';

export const metadata = {
  title: 'My Orders',
  description: 'Track every Vérant order you have placed.',
  robots: { index: false, follow: false },
};

export default function OrdersPage() {
  return <OrdersClient />;
}
