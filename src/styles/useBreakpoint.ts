import { useSyncExternalStore } from 'react';
import { BREAKPOINTS } from './breakpoints.generated';

export type Breakpoint = 'small' | 'medium' | 'large' | 'xl';

// One media query per breakpoint, from the generated min-widths
const QUERIES = Object.entries(BREAKPOINTS).map(
  ([name, width]) => [name as Breakpoint, `(min-width: ${width}px)`] as const,
);

function current(): Breakpoint {
  // The widest breakpoint the screen has reached; below Medium, it's Small
  let name: Breakpoint = 'small';
  for (const [breakpoint, query] of QUERIES) if (window.matchMedia(query).matches) name = breakpoint;
  return name;
}

function subscribe(onChange: () => void) {
  const lists = QUERIES.map(([, query]) => window.matchMedia(query));
  for (const list of lists) list.addEventListener('change', onChange);
  return () => {
    for (const list of lists) list.removeEventListener('change', onChange);
  };
}

/**
 * The breakpoint the screen is at, updated as it resizes. Use it for behavior,
 * like what a button does. For how things look, use media queries with the
 * same values (breakpoints.generated.module.css), so the page is right before
 * JavaScript runs. On a server there's no screen, so it's null.
 */
export function useBreakpoint(): Breakpoint | null {
  return useSyncExternalStore(subscribe, current, () => null);
}
