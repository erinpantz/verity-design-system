import { useCallback, useSyncExternalStore } from 'react';
import type { NavIconPose } from './NavIcon';

// The site's sections, as PageLoader and a pending NavItem know them
export type Section = 'home' | 'portfolio' | 'profile' | 'playground';
type IconSection = Exclude<Section, 'home'>;

/**
 * The poses a section's nav icon swaps between while its page loads, in
 * order, starting from the first. Each is a pose NavIcon already has.
 */
export const LOADING_POSES: Record<IconSection, NavIconPose[]> = {
  portfolio: ['hover', 'current'],
  profile: ['default', 'hover'],
  playground: ['default', 'hover'],
};

/** With reduce motion on: one still pose, the most telling one */
export const STILL_POSE: Record<IconSection, NavIconPose> = {
  portfolio: 'current',
  profile: 'hover',
  playground: 'hover',
};

/** WCAG 2.2.2: motion that starts on its own stops after 5 seconds */
export const MOTION_LIMIT_MS = 5000;

// A time token's value in milliseconds, from the page's root, where the
// tokens are. The browser has already resolved any var() inside it.
export function tokenMs(name: string): number {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const number = parseFloat(value);
  if (Number.isNaN(number)) return 0;
  return value.endsWith('ms') ? number : number * 1000;
}

// How long one step takes: a move, then a hold. Home's badge turns; the nav
// icons move on the nav's own playful timing.
function stepMs(section: Section): number {
  const move =
    section === 'home'
      ? tokenMs('--verity-page-loader-duration-turn')
      : tokenMs('--verity-motion-duration-playful');
  return move + tokenMs('--verity-page-loader-duration-hold');
}

// One clock per section, shared by everything showing that section's poses
// (the loader's icon and the pending nav item), so they swap together. It
// counts steps: 0 is the first pose, at rest; it moves to step 1 at once, then
// one step per move and hold, and stops after MOTION_LIMIT_MS.
interface Clock {
  ticks: number;
  start: number;
  timers: number[];
  listeners: Set<() => void>;
}

const clocks = new Map<Section, Clock>();

function clockFor(section: Section): Clock {
  let clock = clocks.get(section);
  if (!clock) {
    clock = { ticks: 0, start: 0, timers: [], listeners: new Set() };
    clocks.set(section, clock);
  }
  return clock;
}

function notify(clock: Clock) {
  clock.listeners.forEach((listener) => listener());
}

function stop(clock: Clock) {
  clock.timers.forEach((timer) => {
    clearTimeout(timer);
    cancelAnimationFrame(timer);
  });
  clock.timers = [];
}

function run(section: Section) {
  const clock = clockFor(section);
  stop(clock);
  clock.ticks = 0;
  clock.start = performance.now();
  notify(clock);
  const step = stepMs(section);
  const next = () => {
    clock.ticks += 1;
    notify(clock);
    const elapsed = performance.now() - clock.start;
    if (step > 0 && elapsed + step < MOTION_LIMIT_MS) clock.timers.push(window.setTimeout(next, step));
  };
  // The first move waits two frames, so the first pose is drawn before it,
  // and the move is seen
  clock.timers.push(requestAnimationFrame(() => clock.timers.push(requestAnimationFrame(next))));
}

/**
 * Starts a section's clock over, so everything showing its poses moves
 * together from now. PageLoader calls it when it appears, so a pending nav
 * item that started earlier falls into step with it.
 */
export function restartPoseClock(section: Section) {
  if (clockFor(section).listeners.size > 0) run(section);
}

/**
 * How many steps a section's clock has taken since it started: 0 at first,
 * then 1 at once, and up by one each move and hold. While `running`, this
 * component keeps the clock going; the first to start it starts it over.
 * When not running, it keeps the last count, so nothing jumps back.
 */
export function usePoseTicks(section: Section, running: boolean): number {
  // The same function while section and running stay the same, so React
  // doesn't unsubscribe and resubscribe (which would restart the clock) on
  // every render
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!running) return () => {};
      const clock = clockFor(section);
      clock.listeners.add(onChange);
      if (clock.listeners.size === 1) run(section);
      return () => {
        clock.listeners.delete(onChange);
        if (clock.listeners.size === 0) stop(clock);
      };
    },
    [section, running],
  );
  return useSyncExternalStore(
    subscribe,
    () => clockFor(section).ticks,
    () => 0,
  );
}
