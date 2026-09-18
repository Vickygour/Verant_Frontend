'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Banknote, CreditCard, Info, Lock, ShoppingBag, Smartphone } from 'lucide-react';
import SmartImage from '@/components/ui/SmartImage';
import PageAnimations from '@/components/ui/PageAnimations';
import SuccessModal from '@/components/overlays/SuccessModal';
import { useStore } from '@/context/StoreContext';
import { useUI } from '@/context/UIContext';
import { useCatalog } from '@/context/CatalogContext';
import { useAuth } from '@/context/AuthContext';
import orderService from '@/lib/api/orders.service';
import userService from '@/lib/api/users.service';
import { formatPrice } from '@/lib/format';
import {
  FREE_SHIPPING_THRESHOLD,
  GST_RATE,
  INDIAN_STATES,
  shippingCost,
} from '@/lib/constants';

const PAYMENT_METHODS = [
  { id: 'upi', Icon: Smartphone, label: 'UPI' },
  { id: 'card', Icon: CreditCard, label: 'Card' },
  { id: 'cod', Icon: Banknote, label: 'COD' },
];

const EMPTY_ADDRESS = {
  name: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  pin: '',
  state: INDIAN_STATES[0],
};

/**
 * Checkout backed by POST /api/orders.
 * Only ids, quantities and choices are sent — the server re-prices every line
 * from MongoDB, checks stock, decrements it and mails the confirmation.
 */
export default function CheckoutClient() {
  const router = useRouter();
  const { cart, subtotal, clearCart } = useStore();
  const { toast, openSuccess } = useUI();
  const { getProduct } = useCatalog();
  const { isAuthenticated } = useAuth();

  const placingRef = useRef(false);

  const [form, setForm] = useState(EMPTY_ADDRESS);
  const [shipMethod, setShipMethod] = useState('standard');
  const [payMethod, setPayMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [order, setOrder] = useState(null);

  const shipping = shippingCost(subtotal, shipMethod);
  const total = subtotal + shipping;

  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const placeOrder = async () => {
    if (placingRef.current) return;

    const required = [
      ['name', 'Full name'],
      ['phone', 'Phone'],
      ['email', 'Email'],
      ['address', 'Address'],
      ['city', 'City'],
      ['pin', 'Pincode'],
    ];

    for (const [key, label] of required) {
      if (!form[key].trim()) {
        toast('Missing Details', `Please complete "${label}".`);
        return;
      }
    }

    if (!/^[0-9]{10}$/.test(form.phone)) {
      toast('Check Phone', 'Enter a valid 10-digit phone number.');
      return;
    }

    if (!/^[0-9]{6}$/.test(form.pin)) {
      toast('Check Pincode', 'Enter a valid 6-digit pincode.');
      return;
    }

    if (payMethod === 'upi' && !upiId.includes('@')) {
      toast('UPI Required', 'Enter a valid UPI ID (name@bank).');
      return;
    }

    // The orders endpoint is protected — send guests to sign in and come back.
    if (!isAuthenticated) {
      toast('Sign In Required', 'Please sign in to complete your order.');
      router.push('/login?redirect=/checkout');
      return;
    }

    placingRef.current = true;

    try {
      const placed = await orderService.create({
        items: cart.map((item) => ({
          productId: item.id,
          qty: item.qty,
          size: item.size,
          color: item.color,
        })),
        shippingAddress: {
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          address: form.address.trim(),
          city: form.city.trim(),
          pin: form.pin.trim(),
          state: form.state,
        },
        shipMethod,
        paymentMethod: payMethod,
        upiId,
      });

      // Best-effort: keep the address in the customer's address book.
      userService
        .addAddress({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          address: form.address.trim(),
          city: form.city.trim(),
          pin: form.pin.trim(),
          state: form.state,
        })
        .catch(() => {});

      setOrder({
        id: placed?.orderId,
        total: formatPrice(placed?.total ?? total),
        email: form.email,
      });
      clearCart();
      openSuccess();
    } catch (err) {
      toast('Order Failed', err.message);
    } finally {
      placingRef.current = false;
    }
  };

  return (
    <>
      <PageAnimations deps={[cart.length, payMethod, shipMethod]} />
      <SuccessModal order={order} />

      <section className="pt-[140px] pb-20 px-5 md:px-10 lg:px-12 max-w-[1300px] mx-auto">
        <div
          className="flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase font-extrabold text-muted mb-8"
          data-reveal
        >
          <span className="text-emerald">01 Bag</span>
          <span>—</span>
          <span className="text-ink">02 Details &amp; Payment</span>
          <span>—</span>
          <span>03 Confirm</span>
        </div>

        <h1 className="font-display text-4xl md:text-6xl mb-10" data-reveal>
          Check<em className="text-emerald">out.</em>
        </h1>

        {cart.length === 0 ? (
          <div className="border border-line bg-white p-12 text-center" data-reveal>
            <ShoppingBag className="w-12 h-12 mx-auto text-line" aria-hidden="true" />
            <h2 className="font-display text-3xl mt-4">Your bag is empty.</h2>
            <Link href="/men" className="btn btn-primary mt-6">
              <span>Shop Men</span>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white border border-line p-6 md:p-8" data-reveal>
                <div className="eyebrow text-emerald mb-5">01 — Contact &amp; Shipping Address</div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    required
                    value={form.name}
                    onChange={setField('name')}
                    placeholder="Full name *"
                    aria-label="Full name"
                    className="input-lux"
                  />
                  <input
                    required
                    value={form.phone}
                    onChange={setField('phone')}
                    placeholder="Phone (10-digit) *"
                    inputMode="numeric"
                    maxLength={10}
                    aria-label="Phone number"
                    className="input-lux"
                  />
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={setField('email')}
                    placeholder="Email *"
                    aria-label="Email"
                    className="input-lux sm:col-span-2"
                  />
                  <input
                    required
                    value={form.address}
                    onChange={setField('address')}
                    placeholder="Address (House, Street, Area) *"
                    aria-label="Address"
                    className="input-lux sm:col-span-2"
                  />
                  <input
                    required
                    value={form.city}
                    onChange={setField('city')}
                    placeholder="City *"
                    aria-label="City"
                    className="input-lux"
                  />
                  <input
                    required
                    value={form.pin}
                    onChange={setField('pin')}
                    placeholder="Pincode *"
                    inputMode="numeric"
                    maxLength={6}
                    aria-label="Pincode"
                    className="input-lux"
                  />
                  <select
                    value={form.state}
                    onChange={setField('state')}
                    aria-label="State"
                    className="input-lux sm:col-span-2"
                  >
                    {INDIAN_STATES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-white border border-line p-6 md:p-8" data-reveal>
                <div className="eyebrow text-emerald mb-5">02 — Shipping Method</div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <label
                    className={`border p-5 cursor-pointer flex gap-4 items-start hover:border-emerald transition ${
                      shipMethod === 'standard' ? 'border-emerald ring-2 ring-emerald/15' : 'border-line'
                    }`}
                  >
                    <input
                      type="radio"
                      name="ship"
                      className="radio-lux mt-1"
                      checked={shipMethod === 'standard'}
                      onChange={() => setShipMethod('standard')}
                    />
                    <div>
                      <div className="font-extrabold text-sm">Standard · 3–5 Days</div>
                      <div
                        className={`text-sm mt-1 ${
                          subtotal >= FREE_SHIPPING_THRESHOLD ? 'text-emerald font-bold' : 'text-muted'
                        }`}
                      >
                        {subtotal >= FREE_SHIPPING_THRESHOLD ? 'FREE (over ₹8,000)' : '₹199'}
                      </div>
                      <div className="text-xs text-muted mt-1">Insured · Tracked</div>
                    </div>
                  </label>

                  <label
                    className={`border p-5 cursor-pointer flex gap-4 items-start hover:border-emerald transition ${
                      shipMethod === 'express' ? 'border-emerald ring-2 ring-emerald/15' : 'border-line'
                    }`}
                  >
                    <input
                      type="radio"
                      name="ship"
                      className="radio-lux mt-1"
                      checked={shipMethod === 'express'}
                      onChange={() => setShipMethod('express')}
                    />
                    <div>
                      <div className="font-extrabold text-sm">Express · 24–48 Hrs</div>
                      <div className="text-sm mt-1 font-bold">₹499</div>
                      <div className="text-xs text-muted mt-1">Priority atelier dispatch</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="bg-white border border-line p-6 md:p-8" data-reveal>
                <div className="eyebrow text-emerald mb-5">
                  03 — Payment (Demo — No Real Charge)
                </div>

                <div className="grid sm:grid-cols-3 gap-3 mb-5">
                  {PAYMENT_METHODS.map(({ id, Icon, label }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setPayMethod(id)}
                      aria-pressed={payMethod === id}
                      className={`border p-4 flex flex-col items-center gap-2 font-extrabold text-[11px] tracking-[0.2em] uppercase hover:border-emerald transition ${
                        payMethod === id ? 'border-emerald bg-sagelight/30' : 'border-line'
                      }`}
                    >
                      <Icon className="w-6 h-6 text-emerald" aria-hidden="true" />
                      {label}
                    </button>
                  ))}
                </div>

                {payMethod === 'upi' && (
                  <input
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="UPI ID — e.g. name@okhdfc"
                    aria-label="UPI ID"
                    className="input-lux"
                  />
                )}

                {payMethod === 'card' && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      placeholder="Card number — 4111 2222 3333 4444"
                      maxLength={19}
                      aria-label="Card number"
                      className="input-lux sm:col-span-2"
                    />
                    <input placeholder="MM / YY" maxLength={5} aria-label="Expiry" className="input-lux" />
                    <input
                      placeholder="CVV"
                      maxLength={3}
                      type="password"
                      aria-label="CVV"
                      className="input-lux"
                    />
                    <input
                      placeholder="Name on card"
                      aria-label="Name on card"
                      className="input-lux sm:col-span-2"
                    />
                  </div>
                )}

                {payMethod === 'cod' && (
                  <div className="bg-offwhite border border-line p-4 text-sm flex gap-3">
                    <Info className="w-5 h-5 text-emerald shrink-0" aria-hidden="true" />
                    Pay in cash/UPI on delivery. Please keep exact change ready. COD fee: FREE.
                  </div>
                )}

                <div className="text-[11px] text-muted mt-4 flex items-center gap-2">
                  <Lock className="w-3 h-3" aria-hidden="true" /> 256-bit encrypted demo checkout. No
                  real payment is processed.
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-emerald-deep text-white p-6 md:p-8 lg:sticky lg:top-32" data-reveal>
                <div className="eyebrow text-sage">Order Summary</div>

                <div className="space-y-4 mt-6 max-h-[320px] overflow-y-auto pr-1">
                  {cart.map((item) => {
                    const product = getProduct(item.id);
                    if (!product) return null;
                    return (
                      <div
                        key={`${item.id}-${item.size}-${item.color}`}
                        className="flex gap-4 items-center"
                      >
                        <div className="relative shrink-0 w-16 h-20">
                          <SmartImage
                            src={product.images[0]}
                            alt={product.name}
                            sizes="64px"
                            className="object-cover"
                          />
                          <span className="absolute -top-2 -right-2 w-6 h-6 bg-sage text-emerald-deep text-xs font-extrabold flex items-center justify-center z-10">
                            {item.qty}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-bold">{product.name}</div>
                          <div className="text-xs text-white/50">
                            {item.size} · {item.color}
                          </div>
                        </div>
                        <div className="text-sm font-bold">
                          {formatPrice(product.price * item.qty)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-white/15 mt-6 pt-5 space-y-2 text-sm">
                  <div className="flex justify-between text-white/70">
                    <span>Subtotal</span>
                    <span className="text-white font-bold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Shipping ({shipMethod})</span>
                    <span className="text-white font-bold">
                      {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>GST (incl.)</span>
                    <span className="text-white font-bold">
                      {formatPrice(Math.round(total * GST_RATE))}
                    </span>
                  </div>
                  <div className="flex justify-between font-display text-2xl pt-3 border-t border-white/15">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <button type="button" onClick={placeOrder} className="btn btn-white w-full mt-6 !py-4">
                  <span>Place Order — {formatPrice(total)}</span>
                  <Lock className="w-4 h-4" aria-hidden="true" />
                </button>

                <Link
                  href="/men"
                  className="block w-full text-center mt-4 text-[11px] tracking-[0.25em] uppercase font-bold text-white/60 hover:text-white"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
