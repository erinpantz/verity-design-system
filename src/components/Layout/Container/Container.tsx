import type { ReactNode } from 'react';
import styles from './Container.module.css';

export interface ContainerProps {
  /** The content, which gets the Container’s side margins and maximum width */
  children?: ReactNode;
  /**
   * How wide the content can get: constrained for reading, wide for media,
   * or full-bleed for edge-to-edge bands
   */
  width?: 'constrained' | 'wide' | 'full-bleed';
  /**
   * The HTML element: header for the one Container that introduces the page,
   * section for one that introduces a topic, and div when there’s no heading
   */
  as?: 'div' | 'header' | 'section';
}

// The root sets the side margins as padding and stays full width. The inner
// element holds the content, so it can be centered without a margin on the root.
export function Container({ children, width = 'constrained', as: Element = 'div' }: ContainerProps) {
  return (
    <Element className={`${styles.container} ${styles[width]}`}>
      <div className={styles.content}>{children}</div>
    </Element>
  );
}
