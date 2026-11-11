import type { ReactNode } from 'react';
import styles from './Grid.module.css';

export interface GridProps {
  /** The items, such as cards, in the order they should appear */
  children?: ReactNode;
  /** The narrowest an item can get before the row wraps, from the grid item min width tokens */
  itemWidth?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * The space between items and between rows: md for cards, lg for items
   * made of text with no box around them, like quotes
   */
  gap?: 'md' | 'lg';
  /**
   * How wide it can get in a Section or Container: column (the default), or
   * wide to break out to the full width. Inside another component, it fills
   * the space it's given.
   */
  width?: 'column' | 'wide';
  /**
   * The HTML element: ul for a list of similar things, like project cards,
   * ol for items in order, dl for label and value pairs (MetaItems), or div
   * when it isn’t a list. With ul or ol, write each item as an <li>.
   */
  as?: 'div' | 'ul' | 'ol' | 'dl';
  /**
   * Whether items grow to fill their row. Off: items line up in columns, and
   * the last row can have empty space. On: items still wrap at their min
   * width, but share each row, so an item alone on the last row takes the
   * full width.
   */
  fillRows?: boolean;
}

export function Grid({
  children,
  itemWidth = 'md',
  gap = 'md',
  width = 'column',
  as: Element = 'div',
  fillRows = false,
}: GridProps) {
  return (
    <Element
      className={`${styles.grid} ${fillRows ? styles.fillRows : ''} ${styles[itemWidth]} ${styles[`gap-${gap}`]}`}
      data-width={width}
      // Safari stops announcing a list once its bullets are removed, unless it has role="list".
      // A dl keeps its own role.
      role={Element === 'ul' || Element === 'ol' ? 'list' : undefined}
    >
      {children}
    </Element>
  );
}
