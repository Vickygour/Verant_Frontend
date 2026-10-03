import ProfileClient from '@/components/account/ProfileClient';

export const metadata = {
  title: 'My Profile',
  description: 'Manage your Vérant account details and saved addresses.',
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return <ProfileClient />;
}
