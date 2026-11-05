import type { ReactNode } from 'react';
import styles from './Container.module.css';

export interface ContainerProps {
  /**
   * The content. Each block is held to the content column, centered; a
   * MediaBlock, Gallery, Grid, or stack with width="wide" spans the full width.
   */
  children?: ReactNode;
  /**
   * The HTML element: header for the one Container that introduces the page,
   * section for one that introduces a topic, and div when there’s no heading
   */
  as?: 'div' | 'header' | 'section';
}

// Centers the page's content: every block sits in one column, so all blocks
// share left and right edges, and wide blocks break out to the full width.
// The page's side margins come from Shell (main/padding-inline).
export function Container({ children, as: Element = 'div' }: ContainerProps) {
  return <Element className={styles.container}>{children}</Element>;
}
