'use client';

import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { useUI } from '@/context/UIContext';

/**
 * Order confirmation. Details are passed through UI state by the checkout page
 * via the `orderDetails` prop so this stays presentational.
 */
export default function SuccessModal({ order }) {
  const router = useRouter();
  const { overlays, closeSuccess } = useUI();
  const open = overlays.success;

  const leave = (href) => {
    closeSuccess();
    router.push(href);
  };

  return (
    <>
      <div
        className={`overlay-bg fixed inset-0 bg-emerald-deep/90 backdrop-blur-md z-[95] ${open ? 'open' : ''}`}
        role="presentation"
      />
      <div
        className={`fixed inset-0 z-[96] ${open ? 'flex' : 'hidden'} items-center justify-center p-5 pointer-events-none`}
        role="dialog"
        aria-modal="true"
        aria-label="Order confirmed"
      >
        <div className="pointer-events-auto bg-ivory max-w-md w-full p-10 text-center border-t-4 border-emerald">
          <div className="w-16 h-16 bg-emerald text-white rounded-full flex items-center justify-center mx-auto mb-5">
            <Check className="w-8 h-8" aria-hidden="true" />
          </div>
          <div className="eyebrow text-emerald mb-2">Order Confirmed</div>
          <h3 className="font-display text-3xl mb-2">Merci. It's yours.</h3>

          {order ? (
            <p className="text-sm text-muted mb-6">
              Order <b>{order.id}</b> · {order.total} · Confirmation sent to <b>{order.email}</b>
            </p>
          ) : (
            <p className="text-sm text-muted mb-6">Your confirmation is on its way.</p>
          )}

          <div className="flex gap-3">
            <button type="button" onClick={() => leave('/men')} className="btn btn-outline flex-1">
              <span>Continue</span>
            </button>
            <button type="button" onClick={() => leave('/')} className="btn btn-primary flex-1">
              <span>Home</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
