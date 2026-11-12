import { useEffect, useRef, useState, type FocusEvent, type PointerEvent, type Ref } from 'react';
import { IconButton } from '../../Actions/IconButton';
import { Skeleton } from '../../FeedbackAndStatus/Skeleton';
import { useReducedMotion } from '../Playback/useReducedMotion';
import { bezierPeak, placeCards, turnAngle, turnLength, type Bezier } from './turn';
import styles from './Reel.module.css';

/** One image in a Reel */
export interface ReelImage {
  /** The image file’s URL. Square images fit best; others are cropped to fill. */
  src: string;
}

export interface ReelProps {
  /**
   * The images, in order: five on Home, and at least two. They’re
   * decorative: the group’s label says what they are.
   */
  images: [ReelImage, ReelImage, ...ReelImage[]];
  /** The group’s name for screen readers: what the images are examples of */
  label?: string;
}

// A View-Master-style reel of square images that turns on its own: one shows
// at a time, holds, then the disc turns and the next rises from below. A
// button pauses it (WCAG 2.2.2), and it also holds while the pointer is over
// it, while it has keyboard focus, while it's off screen, and while the tab
// is hidden. With reduce motion on, the images crossfade in place instead.
export function Reel(props: ReelProps) {
  // New images start over
  return <ReelPlayer key={props.images.map((image) => image.src).join(' ')} {...props} />;
}

function ReelPlayer({ images, label = 'Examples of my design work' }: ReelProps) {
  const reelRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const count = images.length;
  const turns = count >= 2;

  // Playing, or paused with the button. The visitor's choice sticks.
  const [playing, setPlaying] = useState(true);
  // The other reasons to hold
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const [tabHidden, setTabHidden] = useState(false);
  const held = !playing || hovered || focused || !onScreen || tabHidden;

  // Reduce motion, read when each turn starts
  const reducedMotion = useReducedMotion();
  const reducedRef = useRef(reducedMotion);

  // The images after the first load once the page has, so the first image,
  // likely the page's largest, isn't kept waiting
  const [loadRest, setLoadRest] = useState(false);
  useEffect(() => {
    const onLoad = () => setLoadRest(true);
    // Already loaded, as when the Reel appears after the page has
    if (document.readyState === 'complete') return onLoad();
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  // Off screen, and a hidden tab
  useEffect(() => {
    const reel = reelRef.current;
    if (!reel) return;
    const observer = new IntersectionObserver((entries) => {
      setOnScreen(entries[entries.length - 1].isIntersecting);
    });
    observer.observe(reel);
    const onVisibility = () => setTabHidden(document.hidden);
    onVisibility();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  // The disc. It runs outside React: each frame sets every card's place as
  // custom properties (Reel.module.css turns them into translate, rotate,
  // z-index, and opacity), so the transforms follow the formula in turn.ts.
  // `update` starts or stops the hold when `held` or reduce motion changes.
  const controlRef = useRef<{ update: () => void } | null>(null);
  const heldRef = useRef(held);

  useEffect(() => {
    const reel = reelRef.current;
    if (!reel || !turns) return;

    let current = 0;
    // In a hold: the time already spent in it, and the timer that ends it
    let holdSpent = 0;
    let holdStartedAt = 0;
    let holdTimer: number | undefined;
    // In a turn: its frame request
    let frame: number | undefined;

    // The tokens, read fresh at each turn, so a change (like the slow-motion
    // story's) applies to the next one. Reel.module.css registers each as a
    // time, length, or number, so the browser hands back resolved values.
    function read() {
      const style = getComputedStyle(reel!);
      const time = (name: string) => {
        const value = style.getPropertyValue(name).trim();
        return parseFloat(value) * (value.endsWith('ms') ? 1 : 1000);
      };
      const number = (name: string) => parseFloat(style.getPropertyValue(name));
      // The rise curve: the numbers in cubic-bezier(…). Anything else rises
      // straight to the spot, with no overshoot.
      const bezier = style.getPropertyValue('--verity-reel-easing-rise').match(/-?[\d.]+/g)?.map(Number);
      const curve: Bezier = bezier?.length === 4 ? (bezier as Bezier) : [0, 0, 1, 1];
      return {
        hold: time('--reel-hold'),
        timing: {
          dip: time('--reel-dip'),
          rise: time('--reel-rise'),
          fall: time('--reel-fall'),
          settle: time('--reel-settle'),
        },
        // The angles and the radius are lengths in the tokens (Figma exports
        // them as dimensions), so only the number counts
        angles: { dip: number('--reel-angle-dip'), settle: number('--reel-angle-settle') },
        radius: number('--reel-radius'),
        tilt: number('--reel-tilt'),
        curve,
      };
    }

    function setCard(i: number, x: number, y: number, rotate: number, z: number, opacity: number, hidden: boolean) {
      const card = cardRefs.current[i];
      if (!card) return;
      card.style.setProperty('--x', `${x}%`);
      card.style.setProperty('--y', `${y}%`);
      card.style.setProperty('--rotate', `${rotate}deg`);
      card.style.setProperty('--z', `${z}`);
      card.style.setProperty('--opacity', `${opacity}`);
      card.toggleAttribute('data-hidden', hidden);
    }

    // Moving: every card on the disc, at `angle` from the next image's spot
    function drawDisc(angle: number, radius: number, tilt: number) {
      placeCards(count, (current + 1) % count, angle, radius, tilt).forEach((place, i) =>
        setCard(i, place.x, place.y, place.rotate, place.z, 1, place.hidden),
      );
    }

    // Reduce motion: every card at rest, the next fading in over the current
    function drawFade(progress: number) {
      const next = (current + 1) % count;
      for (let i = 0; i < count; i++) {
        if (i === next) setCard(i, 0, 0, 0, 2, progress, false);
        else setCard(i, 0, 0, 0, 1, 1, i !== current);
      }
    }

    // At rest, between turns
    function drawRest() {
      if (reducedRef.current) drawFade(0);
      else {
        const { radius, tilt } = read();
        drawDisc(-360 / count, radius, tilt);
      }
    }

    function turn() {
      holdTimer = undefined;
      const { timing, angles, radius, tilt, curve } = read();
      const reduced = reducedRef.current;
      const peak = bezierPeak(curve);
      const length = reduced ? timing.rise : turnLength(timing);
      const step = 360 / count;
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        if (elapsed >= length) {
          frame = undefined;
          current = (current + 1) % count;
          drawRest();
          holdSpent = 0;
          update();
          return;
        }
        if (reduced) drawFade(elapsed / length);
        else drawDisc(turnAngle(elapsed, step, timing, angles, curve, peak), radius, tilt);
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }

    // Hold or carry on. A turn that has started finishes first; the hold
    // after it waits until nothing's holding the reel, and picks up where
    // it stopped.
    function update() {
      if (frame !== undefined) return;
      if (heldRef.current) {
        if (holdTimer !== undefined) {
          clearTimeout(holdTimer);
          holdTimer = undefined;
          holdSpent += performance.now() - holdStartedAt;
        }
      } else if (holdTimer === undefined) {
        holdStartedAt = performance.now();
        holdTimer = window.setTimeout(turn, Math.max(0, read().hold - holdSpent));
      }
    }

    // A change to reduce motion redraws the rest, unless a turn is running:
    // it finishes the way it started
    controlRef.current = {
      update: () => {
        if (frame === undefined) drawRest();
        update();
      },
    };

    drawRest();
    reel.dataset.ready = '';
    update();
    return () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      clearTimeout(holdTimer);
      controlRef.current = null;
      delete reel.dataset.ready;
    };
  }, [count, turns]);

  useEffect(() => {
    heldRef.current = held;
    reducedRef.current = reducedMotion;
    controlRef.current?.update();
  }, [held, reducedMotion]);

  // The pointer over the reel holds it. Not a touch: a tap isn't hovering.
  const onPointerEnter = (event: PointerEvent) => {
    if (event.pointerType !== 'touch') setHovered(true);
  };
  const onPointerLeave = () => setHovered(false);

  // Keyboard focus inside holds it. Only :focus-visible, so pressing Play
  // with a mouse (which leaves focus on the button) doesn't hold it.
  const onFocus = (event: FocusEvent) => {
    setFocused(event.target instanceof Element && event.target.matches(':focus-visible'));
  };
  const onBlur = (event: FocusEvent) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
  };

  return (
    <div
      ref={reelRef}
      className={styles.reel}
      data-playing={playing || undefined}
      role="group"
      aria-label={label}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <div className={styles.disc}>
        {images.map((image, i) => (
          <Card
            key={i}
            ref={(card) => {
              cardRefs.current[i] = card;
            }}
            src={i === 0 || loadRest ? image.src : undefined}
            first={i === 0}
          />
        ))}
      </div>
      {turns && (
        <div className={styles.control}>
          <IconButton
            icon={playing ? 'pause' : 'play'}
            label={playing ? 'Pause the reel' : 'Play the reel'}
            size="md"
            background="scrim"
            tooltipPlacement="top-end"
            onClick={() => setPlaying(!playing)}
          />
        </div>
      )}
    </div>
  );
}

type Status = 'loading' | 'loaded' | 'error';

// One card: its picture over a Skeleton until it loads. The picture is
// decorative (alt=""): the group's label says what the images are.
function Card({ ref, src, first }: { ref: Ref<HTMLDivElement>; src: string | undefined; first: boolean }) {
  const [status, setStatus] = useState<Status>('loading');
  const imgRef = useRef<HTMLImageElement>(null);

  // A file can finish loading before React is listening (a page rendered on
  // a server), so check once it's there
  useEffect(() => {
    const img = imgRef.current;
    if (src && img?.complete) setStatus(img.naturalWidth > 0 ? 'loaded' : 'error');
  }, [src]);

  return (
    <div ref={ref} className={styles.card}>
      {status !== 'loaded' && <Skeleton showShine={status === 'loading'} />}
      {src && (
        <img
          ref={imgRef}
          className={styles.image}
          src={src}
          alt=""
          // The first loads right away, ahead of other images; the rest wait
          // for the page (see loadRest)
          fetchPriority={first ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
        />
      )}
    </div>
  );
}
