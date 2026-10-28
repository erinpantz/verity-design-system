import { useEffect, useState, type ReactNode } from 'react';
import styles from './Tooltip.module.css';

export interface TooltipProps {
  /** The tooltip’s text: a few words, like “Coming soon” or a control’s name */
  text: string;
  /**
   * The id of the tooltip, so its trigger can point to it: aria-describedby
   * for a hint, or aria-labelledby when the tooltip is the trigger’s name
   */
  id: string;
  /** Where the tooltip sits: above the trigger, or beside it at the end */
  placement?: 'top' | 'end';
  /** The trigger: the element people hover over or focus */
  children: ReactNode;
}

// A short hint shown while its trigger is hovered or has keyboard focus, and
// while the pointer is over the hint itself. Escape hides it until the next
// hover or focus (WCAG 1.4.13). Showing and hiding is CSS; Escape needs JS.
export function Tooltip({ text, id, placement = 'top', children }: TooltipProps) {
  const [dismissed, setDismissed] = useState(false);

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
      data-dismissed={dismissed || undefined}
      onPointerEnter={() => setDismissed(false)}
      onFocus={() => setDismissed(false)}
    >
      {children}
      <span className={styles.tooltip} role="tooltip" id={id}>
        {text}
      </span>
    </span>
  );
}
