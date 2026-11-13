// The math behind one turn of the Reel: where the disc is at each moment,
// and where each card sits on it. Plain functions with no page access, so
// Reel.tsx only handles time and pausing. Every number comes from the reel
// tokens, read by Reel.tsx.

/** How long each phase lasts, in milliseconds (reel/duration/*) */
export interface TurnTiming {
  dip: number;
  rise: number;
  fall: number;
  settle: number;
}

/** How far the disc dips and settles, in degrees (reel/angle/*) */
export interface TurnAngles {
  dip: number;
  settle: number;
}

/** A cubic bezier curve, as in CSS: [x1, y1, x2, y2] */
export type Bezier = [number, number, number, number];

// Easing in and out, for the dip, the fall, and the settle: half a cosine,
// slow at both ends
const easeInOut = (t: number) => (1 - Math.cos(Math.PI * t)) / 2;

// One coordinate of a cubic bezier with ends at 0 and 1, at parameter s
const bezierAt = (a: number, b: number, s: number) =>
  3 * (1 - s) * (1 - s) * s * a + 3 * (1 - s) * s * s * b + s * s * s;

// Its slope, for Newton's method
const bezierSlope = (a: number, b: number, s: number) =>
  3 * (1 - s) * (1 - s) * a + 6 * (1 - s) * s * (b - a) + 3 * s * s * (1 - b);

/** The curve's progress (y) at a point in time (x, 0 to 1), as CSS computes it */
export function bezierProgress([x1, y1, x2, y2]: Bezier, x: number): number {
  // Find the parameter s where the curve's time is x: Newton's method, with
  // halving as a fallback where the slope is too flat
  let s = x;
  for (let i = 0; i < 8; i++) {
    const error = bezierAt(x1, x2, s) - x;
    if (Math.abs(error) < 1e-6) return bezierAt(y1, y2, s);
    const slope = bezierSlope(x1, x2, s);
    if (Math.abs(slope) < 1e-6) break;
    s -= error / slope;
  }
  let low = 0;
  let high = 1;
  s = x;
  for (let i = 0; i < 30; i++) {
    if (bezierAt(x1, x2, s) < x) low = s;
    else high = s;
    s = (low + high) / 2;
  }
  return bezierAt(y1, y2, s);
}

/**
 * The curve's highest point: when it happens (0 to 1) and how far it gets (1
 * means the target; above 1 is the overshoot). For 0.34, 1.78, 0.64, 1, it's
 * at about 52.5% of the time, 17% past the target. A curve with no overshoot
 * peaks at its end: time 1, progress 1.
 */
export function bezierPeak([x1, y1, x2, y2]: Bezier): { time: number; progress: number } {
  // Sample the curve, then narrow in on the highest sample
  const steps = 200;
  let best = steps;
  for (let i = 0; i <= steps; i++) {
    if (bezierAt(y1, y2, i / steps) > bezierAt(y1, y2, best / steps)) best = i;
  }
  let low = Math.max(0, (best - 1) / steps);
  let high = Math.min(1, (best + 1) / steps);
  for (let i = 0; i < 40; i++) {
    const a = low + (high - low) / 3;
    const b = high - (high - low) / 3;
    if (bezierAt(y1, y2, a) < bezierAt(y1, y2, b)) low = a;
    else high = b;
  }
  const s = (low + high) / 2;
  return { time: bezierAt(x1, x2, s), progress: bezierAt(y1, y2, s) };
}

/** The whole turn's length, in milliseconds */
export const turnLength = (timing: TurnTiming) =>
  timing.dip + timing.rise + timing.fall + timing.settle;

/**
 * Where the disc is, a given time into a turn, in degrees from the next
 * image's resting spot: negative before it (still coming), positive past it.
 * The turn starts at −step, with the current image at rest, and ends at 0,
 * with the next image at rest. Four phases, one after another, with no
 * pause between them:
 * 1. Dip: back by the dip angle, easing in and out.
 * 2. Rise: up to the curve's peak, past the spot. Only the curve up to its
 *    peak, stretched to fill the rise's duration.
 * 3. Fall: from the peak back through the spot to the settle angle below it,
 *    easing in and out.
 * 4. Settle: up to rest, easing in and out.
 */
export function turnAngle(
  elapsed: number,
  step: number,
  timing: TurnTiming,
  angles: TurnAngles,
  curve: Bezier,
  peak: { time: number; progress: number },
): number {
  const start = -step;
  const bottom = start - angles.dip;
  const top = bottom * (1 - peak.progress);
  let t = elapsed;
  if (t < timing.dip) return start + (bottom - start) * easeInOut(t / timing.dip);
  t -= timing.dip;
  if (t < timing.rise) return bottom * (1 - bezierProgress(curve, (t / timing.rise) * peak.time));
  t -= timing.rise;
  if (t < timing.fall) return top + (-angles.settle - top) * easeInOut(t / timing.fall);
  t -= timing.fall;
  if (t < timing.settle) return -angles.settle * (1 - easeInOut(t / timing.settle));
  return 0;
}

/**
 * Each card's resting lean, as a share of reel/angle/rest-tilt, by its
 * place in the list, in a cycle of five (card 6 leans like card 1).
 * Negative leans left (counterclockwise). The leans alternate left and
 * right, each by its own amount, like slides mounted slightly askew on a
 * reel. A fixed cycle, not random, so each image always has the same lean,
 * on every visit and every page load.
 */
export const LEAN_CYCLE = [-1, 0.55, -0.8, 0.35, -0.7] as const;

/** A card's resting lean, in degrees: rest-tilt × its factor in the cycle */
export const restingLean = (index: number, restTilt: number) =>
  restTilt * LEAN_CYCLE[index % LEAN_CYCLE.length];

/** Where one card sits on the disc */
export interface CardPlace {
  /** Sideways, as a percentage of the card's width */
  x: number;
  /** Up and down, as a percentage of the card's height (negative is up) */
  y: number;
  /** How much the card turns, in degrees: the disc's tilt plus its lean */
  rotate: number;
  /** Stacking order: the card nearest its resting spot is on top */
  z: number;
  /** More than 120° from its spot, so it isn't drawn */
  hidden: boolean;
  /** How far it is from its resting spot, in degrees (positive is past it) */
  offset: number;
}

/**
 * Every card's place, with the disc at `angle` degrees from the next image's
 * resting spot. Cards sit 360° / count apart. A card at offset d from its
 * resting spot (positive is past it, up and out) moves along a circle whose
 * pivot is `radius` card widths to the right of the resting card's center:
 * translate(R·(1 − cos d), −R·sin d), turned d × tilt plus its resting
 * lean, which it keeps all the way round.
 */
export function placeCards(
  count: number,
  next: number,
  angle: number,
  radius: number,
  tilt: number,
  restTilt: number,
): CardPlace[] {
  const step = 360 / count;
  const offsets = Array.from({ length: count }, (_, i) => {
    // How many steps after the next image this one sits, nearest way round
    let k = (((i - next) % count) + count) % count;
    if (k > count / 2) k -= count;
    let d = angle - k * step;
    // Keep it between −180° and 180°
    d = ((((d + 180) % 360) + 360) % 360) - 180;
    return d;
  });
  // The nearest to its spot is on top
  const order = offsets.map((d, i) => ({ d: Math.abs(d), i })).sort((a, b) => a.d - b.d);
  const z = new Array<number>(count);
  order.forEach(({ i }, rank) => (z[i] = count - rank));
  return offsets.map((d, i) => {
    const radians = (d * Math.PI) / 180;
    return {
      x: radius * (1 - Math.cos(radians)) * 100,
      y: -radius * Math.sin(radians) * 100,
      rotate: d * tilt + restingLean(i, restTilt),
      z: z[i],
      hidden: Math.abs(d) > 120,
      offset: d,
    };
  });
}

/**
 * How far a turn ever carries a card from its spot and back, in degrees:
 * the dip before it (the current card sinks), or the overshoot past it (the
 * next card rises past its spot), whichever is more. 13.9° for five cards
 * with the reel tokens: the overshoot.
 */
export function restingReach(step: number, angles: TurnAngles, peak: { progress: number }): number {
  return Math.max(angles.dip, (step + angles.dip) * (peak.progress - 1), angles.settle);
}

/**
 * How dark a card's scrim is, from 0 to 1 (Reel.module.css multiplies it by
 * reel/scrim-opacity), from its distance to its resting spot: 0 out to
 * `bright` degrees, so the dip, the overshoot, and the settle stay bright,
 * then rising smoothly (a smoothstep) to 1 by `dim` degrees, half the
 * spacing between images, and 1 beyond.
 */
export function scrimLevel(offset: number, bright: number, dim: number): number {
  const t = Math.min(1, Math.max(0, (Math.abs(offset) - bright) / (dim - bright)));
  return t * t * (3 - 2 * t);
}
