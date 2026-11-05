import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './Tooltip.module.css';

export interface TooltipProps {
  /** The tooltip’s text: a few words, like “Coming soon” or a control’s name */
  text: string;
  /**
   * The id of the tooltip, so its trigger can point to it: aria-describedby
   * for a hint, or aria-labelledby when the tooltip is the trigger’s name
   */
  id: string;
  /**
   * Where the tooltip sits: above the trigger, lined up with its start
   * (top) or its end (top-end), or beside it at the end. An end tooltip that
   * wouldn't fit on the screen opens below instead.
   */
  placement?: 'top' | 'top-end' | 'end';
  /** The trigger: the element people hover over or focus */
  children: ReactNode;
  /**
   * Whether the tooltip only repeats text screen readers already get, like a
   * hidden label. Screen readers then skip it, so they don’t hear it twice.
   */
  visualOnly?: boolean;
}

// A short hint shown while its trigger is hovered or has keyboard focus, and
// while the pointer is over the hint itself. Escape hides it until the next
// hover or focus (WCAG 1.4.13). Showing and hiding is CSS; Escape needs JS.
export function Tooltip({ text, id, placement = 'top', children, visualOnly = false }: TooltipProps) {
  const [dismissed, setDismissed] = useState(false);
  const anchorRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  // When it shows: a tooltip at the end that would go past the screen's edge
  // (an IconButton at the right of the top bar) opens below its trigger
  // instead. It's measured where it normally sits each time. A hidden tooltip
  // measures 0 wide; if it isn't showing yet, it's measured again on the next
  // frame.
  const fit = (retry: boolean) => {
    const anchor = anchorRef.current;
    const tooltip = tooltipRef.current;
    if (!anchor || !tooltip) return;
    delete anchor.dataset.below;
    const { width, right } = tooltip.getBoundingClientRect();
    if (width === 0 && retry) requestAnimationFrame(() => fit(false));
    else if (right > document.documentElement.clientWidth) anchor.dataset.below = '';
  };

  const show = () => {
    setDismissed(false);
    if (placement === 'end') fit(true);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDismissed(true);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <span
      className={`${styles.anchor} ${styles[placement]}`}
      ref={anchorRef}
      data-dismissed={dismissed || undefined}
      onPointerEnter={show}
      onFocus={show}
    >
      {children}
      <span
        className={styles.tooltip}
        role={visualOnly ? undefined : 'tooltip'}
        aria-hidden={visualOnly || undefined}
        id={id}
        ref={tooltipRef}
      >
        {text}
      </span>
    </span>
  );
}
