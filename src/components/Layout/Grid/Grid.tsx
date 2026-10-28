import type { ReactNode } from 'react';
import styles from './Grid.module.css';

export interface GridProps {
  /** The items, such as cards, in the order they should appear */
  children?: ReactNode;
  /** The narrowest an item can get before the row wraps, from the grid item min width tokens */
  itemWidth?: 'sm' | 'md';
  /**
   * The HTML element: ul for a list of similar things, like project cards,
   * ol for items in order, dl for label and value pairs (MetaItems), or div
   * when it isn’t a list. With ul or ol, write each item as an <li>.
   */
  as?: 'div' | 'ul' | 'ol' | 'dl';
}

export function Grid({ children, itemWidth = 'md', as: Element = 'div' }: GridProps) {
  return (
    <Element
      className={`${styles.grid} ${styles[itemWidth]}`}
      // Safari stops announcing a list once its bullets are removed, unless it has role="list".
      // A dl keeps its own role.
      role={Element === 'ul' || Element === 'ol' ? 'list' : undefined}
    >
      {children}
    </Element>
  );
}
