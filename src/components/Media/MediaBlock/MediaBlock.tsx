import type { ReactNode } from 'react';
import styles from './MediaBlock.module.css';

export interface MediaBlockProps {
  /** The media: an Image (and, later, an Animation) */
  children: ReactNode;
  /** A short line below the media that says what it shows or why it matters. Leave it out for no caption. */
  caption?: string;
}

// A <figure>: the media, then its caption. Screen readers connect the two.
export function MediaBlock({ children, caption }: MediaBlockProps) {
  return (
    <figure className={styles.mediaBlock}>
      {children}
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
