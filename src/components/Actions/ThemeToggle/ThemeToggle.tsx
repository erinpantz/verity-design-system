import { useId, useRef, useState, type PointerEvent } from 'react';
import { setTheme, useTheme } from '../../../styles/theme';
import { Icon } from '../../Media/Icon';
import { Tooltip } from '../Tooltip';
import styles from './ThemeToggle.module.css';

// The theme a click changes to
const OTHER = { blue: 'red', red: 'blue' } as const;

// The star looks the same every 45°, so it can stop at any of these steps
// without a visible snap
const STEP = 45;

// Motion timing comes from tokens. Custom properties hold the final values
// (for example "6000ms"), which the Web Animations API needs as numbers.
function cssValue(element: Element, name: string) {
  return getComputedStyle(element).getPropertyValue(name).trim();
}

function cssDuration(element: Element, name: string) {
  const value = cssValue(element, name);
  return value.endsWith('ms') ? parseFloat(value) : parseFloat(value) * 1000;
}

// The star's angle right now, including partway through an animation
function currentAngle(star: Element) {
  return parseFloat(getComputedStyle(star).rotate) || 0;
}

function reduceMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Turns the star from its current angle to a step, then leaves it there.
// The angle is kept under 360, so it never grows without end.
function turnTo(star: HTMLElement, from: number, to: number, easing: string) {
  for (const animation of star.getAnimations()) animation.cancel();
  const rest = to % 360;
  star.style.rotate = `${rest}deg`;
  if (to - from > 0.01) {
    star.animate([{ rotate: `${from - (to - rest)}deg` }, { rotate: `${rest}deg` }], {
      duration: cssDuration(star, '--verity-motion-duration-playful'),
      easing,
    });
  }
}

// An icon-only button that switches the whole site between Blue and Red.
// Shell floats it in the screen's bottom-right corner, so its tooltip opens
// above it, lined up with its right edge.
// Its colors and their fades are CSS. The rotation is the Web Animations API,
// because only code can read where the star is when the pointer leaves and
// finish the turn at the next 45° step.
export function ThemeToggle() {
  const theme = useTheme();
  const next = OTHER[theme];
  const tooltipId = useId();
  const [announcement, setAnnouncement] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const starRef = useRef<HTMLSpanElement>(null);
  // What's turning the star: a hovering pointer, keyboard focus, or both.
  // The last pointer pressed tells a tap from a click.
  const hovered = useRef(false);
  const focused = useRef(false);
  const pressedWith = useRef('');

  // Hover and focus: one full turn per theme-toggle/duration/rotation, at a
  // steady speed, until both end
  const spin = () => {
    const star = starRef.current;
    if (!star || reduceMotion() || star.dataset.spinning !== undefined) return;
    const from = currentAngle(star);
    for (const animation of star.getAnimations()) animation.cancel();
    star.style.rotate = `${from}deg`;
    star.dataset.spinning = '';
    // A full turn at a steady speed: linear is part of the motion, not a style
    star.animate([{ rotate: `${from}deg` }, { rotate: `${from + 360}deg` }], {
      duration: cssDuration(star, '--verity-theme-toggle-duration-rotation'),
      iterations: Infinity,
      easing: 'linear',
    });
  };

  // Mouse out and blur: ease forward to the nearest 45° step and stop
  const settle = () => {
    const star = starRef.current;
    if (!star || hovered.current || focused.current || star.dataset.spinning === undefined) return;
    delete star.dataset.spinning;
    const from = currentAngle(star);
    turnTo(star, from, Math.ceil(from / STEP) * STEP, cssValue(star, '--verity-motion-easing-standard'));
  };

  // A tap on a touch screen: one 45° step, with the nav icons' springy timing
  const step = () => {
    const star = starRef.current;
    if (!star || reduceMotion() || star.dataset.spinning !== undefined) return;
    const from = currentAngle(star);
    turnTo(star, from, (Math.round(from / STEP) + 1) * STEP, cssValue(star, '--verity-motion-easing-playful'));
  };

  // Touch screens have no hover, so a finger never starts the spin
  const onPointerEnter = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return;
    hovered.current = true;
    spin();
  };

  const onPointerLeave = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return;
    hovered.current = false;
    settle();
  };

  // Keyboard focus only, like the focus ring: not after a mouse click
  const onFocus = () => {
    if (!buttonRef.current?.matches(':focus-visible')) return;
    focused.current = true;
    spin();
  };

  const onBlur = () => {
    focused.current = false;
    settle();
  };

  const onClick = () => {
    setTheme(next);
    setAnnouncement(`Changed to ${next}`);
    if (pressedWith.current === 'touch') step();
    pressedWith.current = '';
  };

  return (
    <>
      <Tooltip text={`Change to ${next}`} id={tooltipId} placement="top-end">
        <button
          className={styles.themeToggle}
          type="button"
          aria-labelledby={tooltipId}
          ref={buttonRef}
          onClick={onClick}
          onPointerDown={(event) => (pressedWith.current = event.pointerType)}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          <span className={styles.star} ref={starRef}>
            <Icon name="theme" />
          </span>
        </button>
      </Tooltip>
      {/* Read aloud by screen readers when the theme changes; not shown */}
      <span className={styles.announcement} role="status">
        {announcement}
      </span>
    </>
  );
}
