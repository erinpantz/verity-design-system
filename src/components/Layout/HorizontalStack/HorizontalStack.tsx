import type { ReactNode } from 'react';
import styles from './HorizontalStack.module.css';

export interface HorizontalStackProps {
  /** The items to line up, from left to right */
  children?: ReactNode;
  /** The space between items, and between lines when they wrap, from the spacing tokens */
  gap?: 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
  /**
   * How items line up vertically in the row: at the top, the middle, or the
   * bottom. Center by default, so controls and text-sized items line up.
   */
  align?: 'start' | 'center' | 'end';
  /** Whether items that don’t fit move onto a new line */
  wrap?: boolean;
  /**
   * The HTML element: ul for a list of similar things, ol for steps in order,
   * or div when it isn’t a list. With ul or ol, write each item as an <li>.
   */
  as?: 'div' | 'ul' | 'ol';
}

export function HorizontalStack({
  children,
  gap = 'md',
  align = 'center',
  wrap = false,
  as: Element = 'div',
}: HorizontalStackProps) {
  const classes = [styles.stack, styles[`gap-${gap}`], styles[`align-${align}`], wrap && styles.wrap];
  return (
    <Element
      className={classes.filter(Boolean).join(' ')}
      // Safari stops announcing a list once its bullets are removed, unless it has role="list"
      role={Element === 'div' ? undefined : 'list'}
    >
      {children}
    </Element>
  );
}
