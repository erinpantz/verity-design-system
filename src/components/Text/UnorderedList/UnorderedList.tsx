import type { ReactNode } from 'react';
import styles from './UnorderedList.module.css';

export interface UnorderedListProps {
  /** The list’s items, each an UnorderedListItem */
  children?: ReactNode;
}

export function UnorderedList({ children }: UnorderedListProps) {
  return (
    // Safari stops announcing a list once its bullets are removed, unless it has role="list"
    <ul className={styles.list} role="list">
      {children}
    </ul>
  );
}

export interface UnorderedListItemProps {
  /** The item’s text */
  children?: ReactNode;
  /**
   * A short lead-in on its own line above the text. It’s styled to stand out,
   * but it isn’t a heading, so it doesn’t appear in the page’s outline.
   */
  title?: string;
  /** The text style of the item’s text. The title always uses body-lg-strong. */
  textSize?: 'body-default' | 'body-lg';
}

export function UnorderedListItem({ children, title, textSize = 'body-default' }: UnorderedListItemProps) {
  // The marker lines up with the first line, which is the title when there is one
  const firstLine = title ? 'first-line-title' : `first-line-${textSize}`;
  return (
    <li className={`${styles.item} ${styles[firstLine]}`}>
      <Marker />
      <div className={styles.copy}>
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles[textSize]}>{children}</div>
      </div>
    </li>
  );
}

// The brand-colored leaf before each item, in a box as tall as the first line
// so it's centered on that line. Decorative, so screen readers skip it.
function Marker() {
  return (
    <span className={styles.markerBox} aria-hidden="true">
      <span className={styles.marker} />
    </span>
  );
}
