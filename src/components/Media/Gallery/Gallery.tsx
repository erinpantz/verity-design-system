import type { ReactNode } from 'react';
import styles from './Gallery.module.css';

export interface GalleryProps {
  /**
   * How the items are arranged. 2+1: two side by side, then one across the
   * full width. More layouts will be added.
   */
  layout?: '2+1';
  /** The items, each a MediaBlock, in reading order */
  children: ReactNode;
}

// Class names for each layout, since "+" can't be part of one. To add a
// layout, add it to the layout type, here, and in Gallery.module.css.
const LAYOUT = { '2+1': 'layout-2-1' } as const;

export function Gallery({ layout = '2+1', children }: GalleryProps) {
  return <div className={`${styles.gallery} ${styles[LAYOUT[layout]]}`}>{children}</div>;
}
