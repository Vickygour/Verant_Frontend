'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, Package, RotateCw } from 'lucide-react';
import PageAnimations from '@/components/ui/PageAnimations';
import SmartImage from '@/components/ui/SmartImage';
import { useAuth } from '@/context/AuthContext';
import orderService from '@/lib/api/orders.service';
import { formatPrice } from '@/lib/format';

const LOGIN_URL = '/login?redirect=/account/orders';

const STEPS = ['pending', 'confirmed', 'shipped', 'delivered'];

const STATUS_STYLES = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  confirmed: 'bg-sky-50 text-sky-700 border-sky-200',
  shipped: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  delivered: 'bg-sagelight text-emerald border-sage',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
};

const FILTERS = [
  { key: 'all', label: 'All', match: () => true },
  { key: 'active', label: 'Active', match: (o) => !['delivered', 'cancelled'].includes(o.status) },
  { key: 'delivered', label: 'Delivered', match: (o) => o.status === 'delivered' },
  { key: 'cancelled', label: 'Cancelled', match: (o) => o.status === 'cancelled' },
];

const PAYMENT_LABELS = { upi: 'UPI', card: 'Card', cod: 'Cash on Delivery' };

const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    : '—';

const capitalize = (s = '') => s.charAt(0).toUpperCase() + s.slice(1);

/** Signed-in customer's order history, backed by GET /api/orders/my. */
export default function OrdersClient() {
  const router = useRouter();
  const { ready, isAuthenticated } = useAuth();

  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [openId, setOpenId] = useState(null);

  const load = useCallback(async () => {
    setStatus('loading');
    setError('');
    try {
      setOrders(await orderService.mine());
      setStatus('ready');
    } catch (err) {
      if (err.status === 401) {
        router.replace(LOGIN_URL);
        return;
      }
      setError(err.message);
      setStatus('error');
    }
  }, [router]);

  useEffect(() => {
    if (!ready) return;
    if (!isAuthenticated) {
      router.replace(LOGIN_URL);
      return;
    }
    load();
  }, [ready, isAuthenticated, load, router]);

  const active = FILTERS.find((f) => f.key === filter) || FILTERS[0];
  const visible = useMemo(() => orders.filter(active.match), [orders, active]);

  return (
    <>
      <PageAnimations deps={[status]} />

      <section className="pt-[150px] pb-20 px-5 md:px-12 max-w-[1100px] mx-auto">
        <div className="eyebrow text-emerald" data-reveal>
          Order History{status === 'ready' ? ` — ${orders.length}` : ''}
        </div>
        <h1 className="font-display text-5xl md:text-7xl mt-3 mb-10" data-reveal>
          My <em className="text-emerald">orders.</em>
        </h1>

        {status === 'loading' && (
          <div className="space-y-4" aria-busy="true" aria-label="Loading orders">
            {[0, 1, 2].map((i) => (
              <div key={i} className="skeleton h-36 border border-line" />
            ))}
          </div>
        )}

        {status === 'error' && (
          <div className="border border-line bg-white p-12 text-center">
            <h2 className="font-display text-3xl">Couldn’t load your orders.</h2>
            <p className="text-muted text-sm mt-2">{error}</p>
            <button type="button" onClick={load} className="btn btn-primary mt-6">
              <RotateCw className="w-4 h-4" aria-hidden="true" />
              <span>Try Again</span>
            </button>
          </div>
        )}

        {status === 'ready' && orders.length === 0 && (
          <div className="border border-line bg-white p-12 text-center">
            <Package className="w-12 h-12 mx-auto text-line" aria-hidden="true" />
            <h2 className="font-display text-3xl mt-4">No orders yet.</h2>
            <p className="text-muted text-sm mt-2">When you place an order, it will appear here.</p>
            <Link href="/men" className="btn btn-primary mt-6">
              <span>Start Shopping</span>
            </Link>
          </div>
        )}

        {status === 'ready' && orders.length > 0 && (
          <>
            <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Filter orders">
              {FILTERS.map((f) => {
                const count = orders.filter(f.match).length;
                const selected = f.key === filter;
                return (
                  <button
                    key={f.key}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setFilter(f.key)}
                    className={`px-4 py-2 text-[11px] uppercase tracking-widest border transition-colors ${
                      selected
                        ? 'bg-emerald text-white border-emerald'
                        : 'bg-white text-ink border-line hover:border-emerald'
                    }`}
                  >
                    {f.label} ({count})
                  </button>
                );
              })}
            </div>

            {visible.length === 0 ? (
              <p className="border border-line bg-white p-10 text-center text-muted text-sm">
                No {active.label.toLowerCase()} orders.
              </p>
            ) : (
              <ul className="space-y-4">
                {visible.map((order) => (
                  <OrderCard
                    key={order._id || order.orderId}
                    order={order}
                    open={openId === order.orderId}
                    onToggle={() => setOpenId((id) => (id === order.orderId ? null : order.orderId))}
                  />
                ))}
              </ul>
            )}
          </>
        )}
      </section>
    </>
  );
}

function OrderCard({ order, open, onToggle }) {
  const items = order.items || [];
  const itemCount = items.reduce((n, i) => n + (i.qty || 0), 0);
  const addr = order.shippingAddress || {};
  const detailsId = `order-${order.orderId}`;

  return (
    <li className="border border-line bg-white">
      {/* Summary */}
      <div className="flex flex-wrap items-start justify-between gap-4 p-5 md:p-6 border-b border-line">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3 text-sm">
          <Meta label="Order">{order.orderId}</Meta>
          <Meta label="Placed">{formatDate(order.createdAt)}</Meta>
          <Meta label="Total">{formatPrice(order.total)}</Meta>
        </div>
        <span
          className={`px-3 py-1 text-[11px] uppercase tracking-widest border ${
            STATUS_STYLES[order.status] || STATUS_STYLES.pending
          }`}
        >
          {capitalize(order.status)}
        </span>
      </div>

      {/* Items */}
      <ul className="divide-y divide-line">
        {items.map((item, idx) => (
          <li key={`${item.productId}-${item.size}-${item.color}-${idx}`} className="flex gap-4 p-5 md:px-6">
            <Link
              href={`/product/${item.productId}`}
              className="relative w-16 h-20 shrink-0 bg-offwhite overflow-hidden"
            >
              {item.image ? (
                <SmartImage src={item.image} alt={item.name} sizes="64px" className="object-cover" />
              ) : (
                <Package className="w-6 h-6 text-line absolute inset-0 m-auto" aria-hidden="true" />
              )}
            </Link>
            <div className="flex-1 min-w-0">
              <Link href={`/product/${item.productId}`} className="font-medium hover:text-emerald truncate block">
                {item.name}
              </Link>
              <p className="text-xs text-muted mt-1">
                Size {item.size} · {item.color} · Qty {item.qty}
              </p>
            </div>
            <div className="text-sm font-medium whitespace-nowrap">{formatPrice(item.price * item.qty)}</div>
          </li>
        ))}
      </ul>

      {/* Toggle */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={detailsId}
        className="w-full flex items-center justify-between px-5 md:px-6 py-3 border-t border-line text-[11px] uppercase tracking-widest text-muted hover:text-emerald transition-colors"
      >
        <span>
          {itemCount} {itemCount === 1 ? 'item' : 'items'} · {open ? 'Hide details' : 'View details'}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {/* Details */}
      {open && (
        <div id={detailsId} className="border-t border-line p-5 md:p-6 bg-ivory space-y-6">
          <StatusTracker status={order.status} />

          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="eyebrow text-muted mb-2">Shipping To</h3>
              <p className="font-medium">{addr.name}</p>
              <p className="text-muted">{addr.address}</p>
              <p className="text-muted">
                {addr.city}, {addr.state} {addr.pin}
              </p>
              <p className="text-muted">{addr.phone}</p>
            </div>
            <div>
              <h3 className="eyebrow text-muted mb-2">Payment</h3>
              <p>{PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod}</p>
              <p className="text-muted">{capitalize(order.paymentStatus)}</p>
              <p className="text-muted mt-2">{capitalize(order.shipMethod)} delivery</p>
            </div>
            <div>
              <h3 className="eyebrow text-muted mb-2">Summary</h3>
              <Row label="Subtotal" value={formatPrice(order.subtotal)} />
              <Row label="Shipping" value={order.shipping ? formatPrice(order.shipping) : 'Free'} />
              <div className="border-t border-line mt-2 pt-2">
                <Row label="Total" value={formatPrice(order.total)} strong />
              </div>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

function StatusTracker({ status }) {
  if (status === 'cancelled') {
    return <p className="text-sm text-red-700">This order was cancelled.</p>;
  }

  const current = Math.max(0, STEPS.indexOf(status));

  return (
    <ol className="grid grid-cols-4 gap-2" aria-label="Order progress">
      {STEPS.map((step, i) => {
        const done = i <= current;
        return (
          <li key={step} aria-current={i === current ? 'step' : undefined}>
            <div className={`h-1 ${done ? 'bg-emerald' : 'bg-line'}`} />
            <p className={`mt-2 text-[11px] uppercase tracking-widest ${done ? 'text-emerald' : 'text-muted'}`}>
              {capitalize(step)}
            </p>
          </li>
        );
      })}
    </ol>
  );
}

function Meta({ label, children }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-muted">{label}</p>
      <p className="font-medium mt-0.5">{children}</p>
    </div>
  );
}

function Row({ label, value, strong = false }) {
  return (
    <div className={`flex justify-between ${strong ? 'font-semibold' : 'text-muted'}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
