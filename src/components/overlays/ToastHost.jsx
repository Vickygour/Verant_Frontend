'use client';

import { Check } from 'lucide-react';
import { useUI } from '@/context/UIContext';

/** Bottom-right notification stack. */
export default function ToastHost() {
  const { toasts } = useUI();

  return (
    <div
      className="fixed bottom-5 right-5 z-[120] space-y-3 w-[320px] max-w-[90vw]"
      role="status"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <div key={t.id} className="toast p-4 flex gap-3 items-start shadow-2xl">
          <div className="w-8 h-8 bg-emerald-light flex items-center justify-center shrink-0">
            <Check className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <div className="text-[11px] tracking-[0.2em] uppercase font-extrabold text-sage">
              {t.title}
            </div>
            <div className="text-sm mt-1 text-white/90">{t.message}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
