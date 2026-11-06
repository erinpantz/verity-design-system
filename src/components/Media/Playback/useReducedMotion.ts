import { createContext, useContext, useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  const list = window.matchMedia(QUERY);
  list.addEventListener('change', onChange);
  return () => list.removeEventListener('change', onChange);
}

const current = () => window.matchMedia(QUERY).matches;

/**
 * For stories only: turns “reduce motion” on or off for the animations and videos inside
 * it, whatever the computer is set to, so the docs can show both. It's not
 * exported from the library; the site always follows the visitor's setting.
 */
export const ReducedMotionOverride = createContext<boolean | undefined>(undefined);

/**
 * Whether the visitor has asked for less motion (“reduce motion” in their
 * system settings), updated if they change it while the page is open. On a
 * server there's no setting to read, so it's false: nothing plays there anyway.
 */
export function useReducedMotion(): boolean {
  const system = useSyncExternalStore(subscribe, current, () => false);
  return useContext(ReducedMotionOverride) ?? system;
}
