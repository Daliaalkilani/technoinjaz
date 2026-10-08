'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * useState that survives leaving and coming back to the page within the same tab
 * (sessionStorage). Starts from `initial` on the server and first client render, so
 * hydration matches, then adopts the stored value right after mount.
 */
export function useSessionState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const loaded = useRef(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw) as T);
    } catch {}
    loaded.current = true;
  }, [key]);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);

  return [value, setValue] as const;
}
