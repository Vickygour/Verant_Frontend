'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, LogOut, MapPin, Package, Plus, Trash2 } from 'lucide-react';
import PageAnimations from '@/components/ui/PageAnimations';
import { useAuth } from '@/context/AuthContext';
import { useUI } from '@/context/UIContext';
import userService from '@/lib/api/users.service';
import { INDIAN_STATES } from '@/lib/constants';

const LOGIN_URL = '/login?redirect=/account';

const EMPTY_ADDRESS = {
  name: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  pin: '',
  state: INDIAN_STATES[0],
};

const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : '';

/** Signed-in customer's profile: personal details + address book. */
export default function ProfileClient() {
  const router = useRouter();
  const { user, ready, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (ready && !isAuthenticated) router.replace(LOGIN_URL);
  }, [ready, isAuthenticated, router]);

  if (!ready || !user) {
    return (
      <section className="pt-[150px] pb-20 px-5 md:px-12 max-w-[1100px] mx-auto" aria-busy="true">
        <div className="skeleton h-16 w-64 mb-10" />
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          <div className="skeleton h-64 border border-line" />
          <div className="skeleton h-96 border border-line" />
        </div>
      </section>
    );
  }

  const initial = user.name?.trim()?.charAt(0)?.toUpperCase() || 'U';

  return (
    <>
      <PageAnimations deps={[ready]} />

      <section className="pt-[150px] pb-20 px-5 md:px-12 max-w-[1100px] mx-auto">
        <div className="eyebrow text-emerald" data-reveal>
          Account
        </div>
        <h1 className="font-display text-5xl md:text-7xl mt-3 mb-10" data-reveal>
          My <em className="text-emerald">profile.</em>
        </h1>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6 items-start">
          {/* Sidebar */}
          <aside className="border border-line bg-white p-6">
            <div className="w-16 h-16 rounded-full bg-emerald text-white flex items-center justify-center font-display text-3xl">
              {initial}
            </div>
            <p className="font-medium text-lg mt-4 truncate">{user.name}</p>
            <p className="text-sm text-muted truncate">{user.email}</p>
            {user.createdAt && (
              <p className="text-xs text-muted mt-1">Member since {formatDate(user.createdAt)}</p>
            )}

            <nav className="mt-6 border-t border-line pt-4 space-y-1 text-sm" aria-label="Account">
              <Link href="/account/orders" className="flex items-center gap-3 py-2 hover:text-emerald transition-colors">
                <Package className="w-4 h-4" aria-hidden="true" /> My Orders
              </Link>
              <Link href="/wishlist" className="flex items-center gap-3 py-2 hover:text-emerald transition-colors">
                <Heart className="w-4 h-4" aria-hidden="true" /> Wishlist
              </Link>
              <button
                type="button"
                onClick={logout}
                className="w-full flex items-center gap-3 py-2 text-red-600 hover:text-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4" aria-hidden="true" /> Logout
              </button>
            </nav>
          </aside>

          <div className="space-y-6">
            <DetailsForm user={user} />
            <AddressBook addresses={user.addresses || []} />
          </div>
        </div>
      </section>
    </>
  );
}

function DetailsForm({ user }) {
  const { refreshUser } = useAuth();
  const { toast } = useUI();
  const [form, setForm] = useState({ name: user.name || '', phone: user.phone || '' });
  const [saving, setSaving] = useState(false);

  const dirty = form.name.trim() !== (user.name || '') || form.phone.trim() !== (user.phone || '');

  const onSubmit = async (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const phone = form.phone.trim();

    if (!name) return toast('Name Required', 'Please enter your full name.');
    if (phone && !/^\d{10}$/.test(phone)) return toast('Check Phone', 'Enter a valid 10-digit phone number.');

    setSaving(true);
    try {
      await userService.updateMe({ name, phone: phone || undefined });
      await refreshUser();
      toast('Profile Updated', 'Your details have been saved.');
    } catch (err) {
      toast('Update Failed', err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="border border-line bg-white p-6 md:p-8">
      <div className="eyebrow text-emerald mb-5">01 — Personal Details</div>

      <div className="grid sm:grid-cols-2 gap-4">
        <input
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Full name *"
          aria-label="Full name"
          maxLength={80}
          className="input-lux"
        />
        <input
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, '') }))}
          placeholder="Phone (10-digit)"
          aria-label="Phone number"
          inputMode="numeric"
          maxLength={10}
          className="input-lux"
        />
        <input
          value={user.email || ''}
          readOnly
          aria-label="Email (cannot be changed)"
          className="input-lux sm:col-span-2 bg-offwhite text-muted cursor-not-allowed"
        />
      </div>

      <button
        type="submit"
        disabled={!dirty || saving}
        className={`btn btn-primary mt-6 ${!dirty || saving ? 'btn-disabled' : ''}`}
      >
        <span>{saving ? 'Saving…' : 'Save Changes'}</span>
      </button>
    </form>
  );
}

function AddressBook({ addresses }) {
  const { refreshUser } = useAuth();
  const { toast } = useUI();
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(EMPTY_ADDRESS);
  const [busy, setBusy] = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  const setField = (key) => (e) => {
    const value = ['phone', 'pin'].includes(key) ? e.target.value.replace(/\D/g, '') : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const onAdd = async (e) => {
    e.preventDefault();
    const required = ['name', 'phone', 'address', 'city', 'pin', 'state'];
    if (required.some((k) => !form[k].trim())) return toast('Missing Details', 'Please fill all required fields.');
    if (!/^\d{10}$/.test(form.phone)) return toast('Check Phone', 'Enter a valid 10-digit phone number.');
    if (!/^\d{6}$/.test(form.pin)) return toast('Check Pincode', 'Enter a valid 6-digit pincode.');

    setBusy(true);
    try {
      await userService.addAddress({ ...form, isDefault: addresses.length === 0 });
      await refreshUser();
      setForm(EMPTY_ADDRESS);
      setAdding(false);
      toast('Address Saved', 'You can use it at checkout.');
    } catch (err) {
      toast('Could Not Save', err.message);
    } finally {
      setBusy(false);
    }
  };

  const onDelete = async (id) => {
    setBusy(true);
    try {
      await userService.deleteAddress(id);
      await refreshUser();
      toast('Address Removed', 'The address was deleted.');
    } catch (err) {
      toast('Could Not Remove', err.message);
    } finally {
      setBusy(false);
      setConfirmId(null);
    }
  };

  return (
    <div className="border border-line bg-white p-6 md:p-8">
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="eyebrow text-emerald">02 — Saved Addresses</div>
        {!adding && (
          <button type="button" onClick={() => setAdding(true)} className="btn btn-outline btn-sm">
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>Add New</span>
          </button>
        )}
      </div>

      {addresses.length === 0 && !adding && (
        <div className="text-center py-8">
          <MapPin className="w-10 h-10 mx-auto text-line" aria-hidden="true" />
          <p className="text-muted text-sm mt-3">No saved addresses yet.</p>
        </div>
      )}

      {addresses.length > 0 && (
        <ul className="grid sm:grid-cols-2 gap-4">
          {addresses.map((a) => (
            <li key={a._id} className="border border-line p-4 text-sm relative">
              {a.isDefault && (
                <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] uppercase tracking-widest bg-sagelight text-emerald">
                  Default
                </span>
              )}
              <p className="font-medium pr-16">{a.name}</p>
              <p className="text-muted mt-1">{a.address}</p>
              <p className="text-muted">
                {a.city}, {a.state} {a.pin}
              </p>
              <p className="text-muted">{a.phone}</p>

              <div className="mt-3 flex items-center gap-3 text-xs">
                {confirmId === a._id ? (
                  <>
                    <span className="text-muted">Remove this address?</span>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => onDelete(a._id)}
                      className="text-red-600 font-medium hover:underline"
                    >
                      Yes, remove
                    </button>
                    <button type="button" onClick={() => setConfirmId(null)} className="text-muted hover:underline">
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmId(a._id)}
                    className="flex items-center gap-1.5 text-muted hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" /> Remove
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {adding && (
        <form onSubmit={onAdd} className={`grid sm:grid-cols-2 gap-4 ${addresses.length ? 'mt-6 pt-6 border-t border-line' : ''}`}>
          <input value={form.name} onChange={setField('name')} placeholder="Full name *" aria-label="Full name" className="input-lux" />
          <input
            value={form.phone}
            onChange={setField('phone')}
            placeholder="Phone (10-digit) *"
            aria-label="Phone number"
            inputMode="numeric"
            maxLength={10}
            className="input-lux"
          />
          <input
            type="email"
            value={form.email}
            onChange={setField('email')}
            placeholder="Email"
            aria-label="Email"
            className="input-lux sm:col-span-2"
          />
          <input
            value={form.address}
            onChange={setField('address')}
            placeholder="House no., street, area *"
            aria-label="Address"
            className="input-lux sm:col-span-2"
          />
          <input value={form.city} onChange={setField('city')} placeholder="City *" aria-label="City" className="input-lux" />
          <input
            value={form.pin}
            onChange={setField('pin')}
            placeholder="Pincode *"
            aria-label="Pincode"
            inputMode="numeric"
            maxLength={6}
            className="input-lux"
          />
          <select value={form.state} onChange={setField('state')} aria-label="State" className="input-lux sm:col-span-2">
            {INDIAN_STATES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <div className="sm:col-span-2 flex gap-3">
            <button type="submit" disabled={busy} className={`btn btn-primary ${busy ? 'btn-disabled' : ''}`}>
              <span>{busy ? 'Saving…' : 'Save Address'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAdding(false);
                setForm(EMPTY_ADDRESS);
              }}
              className="btn btn-outline"
            >
              <span>Cancel</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
