'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * State that persists to localStorage.
 * Reads on mount only (never during render) so server and client markup match.
 */
export function useLocalStorageState(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  const hydrated = useRef(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw));
    } catch {
      /* corrupted or unavailable storage — keep the default */
    }
    hydrated.current = true;
  }, [key]);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* quota or private mode — persistence is best effort */
    }
  }, [key, value]);

  return [value, setValue, hydrated];
}
