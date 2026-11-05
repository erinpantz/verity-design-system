import type { ReactNode } from 'react';
import styles from './Container.module.css';

export interface ContainerProps {
  /** The content. It gets the Container’s maximum width and nothing else. */
  children?: ReactNode;
  /** How wide the content can get: constrained for reading, or wide for media */
  width?: 'constrained' | 'wide';
  /**
   * The HTML element: header for the one Container that introduces the page,
   * section for one that introduces a topic, and div when there’s no heading
   */
  as?: 'div' | 'header' | 'section';
}

// Sets only a maximum width. It has no side margins and isn't centered, so
// every Container starts at the left edge of Main; Shell sets the page's side
// margins (main/padding-inline).
export function Container({ children, width = 'constrained', as: Element = 'div' }: ContainerProps) {
  return <Element className={`${styles.container} ${styles[width]}`}>{children}</Element>;
}
