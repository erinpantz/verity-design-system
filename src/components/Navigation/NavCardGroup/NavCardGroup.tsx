import {
  Children,
  cloneElement,
  isValidElement,
  useState,
  type AnimationEvent,
  type FocusEvent,
  type PointerEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import type { NavCardProps } from '../NavCard';
import styles from './NavCardGroup.module.css';

export interface NavCardGroupProps {
  /** Two or more NavCards, in order. Don’t set their tilt: the group does. */
  children: ReactNode;
}

const matches = (query: string) => window.matchMedia(query).matches;

// A row of NavCards, each overlapping the one before it, tilted left, right,
// left. It decides which card is on top: the last one, until a card is
// hovered or focused; that card then stays on top, like a card put back on a
// deck. A card that's underneath shuffles to the top: it slides out sideways
// until it clears its neighbor, comes to the front, and slides back. The
// slide is CSS (NavCardGroup.module.css); this code remembers the top card
// and starts the slide.
export function NavCardGroup({ children }: NavCardGroupProps) {
  const cards = Children.toArray(children).filter(isValidElement) as ReactElement<NavCardProps>[];
  const last = cards.length - 1;
  // The card on top, once one has been hovered or focused (null: the last)
  const [top, setTop] = useState<number | null>(null);
  // The card sliding out and back, and which way
  const [shuffle, setShuffle] = useState<{ index: number; direction: 'left' | 'right' } | null>(null);

  // How high each card is: the top card highest, then the rest in order
  const rank = (i: number) => (i === (top ?? last) ? Infinity : i);

  const bringToTop = (i: number) => {
    if (rank(i) === Infinity) return;
    // With reduce motion on, it simply comes to the front
    if (!matches('(prefers-reduced-motion: reduce)')) {
      // Away from the neighbor that's above it: the first card to the left,
      // the last to the right, a middle card away from the higher neighbor
      const leftAbove = i > 0 ? rank(i - 1) : -1;
      const rightAbove = i < last ? rank(i + 1) : -1;
      const direction = i === 0 ? 'left' : i === last ? 'right' : rightAbove > leftAbove ? 'left' : 'right';
      setShuffle({ index: i, direction });
    }
    setTop(i);
  };

  // A real pointer only (a tap doesn't shuffle), and keyboard focus everywhere
  const onPointerEnter = (i: number) => (event: PointerEvent) => {
    if (event.pointerType !== 'touch' && matches('(hover: hover)')) bringToTop(i);
  };
  const onFocus = (i: number) => (event: FocusEvent) => {
    if ((event.target as Element).matches(':focus-visible')) bringToTop(i);
  };
  // The shuffle is two animations, out then back: it's over when the second ends
  const onAnimationEnd = (event: AnimationEvent) => {
    if (event.target === event.currentTarget && event.animationName.includes('back')) setShuffle(null);
  };

  return (
    <div className={styles.navCardGroup}>
      {cards.map((card, i) => (
        <span
          key={card.key ?? i}
          className={styles.slot}
          data-top={i === top || undefined}
          data-shuffle={shuffle?.index === i ? shuffle.direction : undefined}
          onPointerEnter={onPointerEnter(i)}
          onFocus={onFocus(i)}
          onAnimationEnd={onAnimationEnd}
        >
          {cloneElement(card, { tilt: i % 2 === 0 ? 'left' : 'right' })}
        </span>
      ))}
    </div>
  );
}
