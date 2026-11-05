import type { ReactNode } from 'react';
import styles from './MediaBlock.module.css';

export interface MediaBlockProps {
  /** The media: an Image (and, later, an Animation) */
  children: ReactNode;
  /** A short line below the media that says what it shows or why it matters. Leave it out for no caption. */
  caption?: string;
  /**
   * How wide it can get in a Section or Container: column (the default), or
   * wide to break out to the full width. Inside another component, it fills
   * the space it's given.
   */
  width?: 'column' | 'wide';
}

// A <figure>: the media, then its caption. Screen readers connect the two.
export function MediaBlock({ children, caption, width = 'column' }: MediaBlockProps) {
  return (
    <figure className={styles.mediaBlock} data-width={width}>
      {children}
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
