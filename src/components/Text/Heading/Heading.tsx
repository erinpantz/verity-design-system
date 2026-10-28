import type { ReactNode } from 'react';
import styles from './Heading.module.css';

export interface HeadingProps {
  /** The heading text */
  children?: ReactNode;
  /**
   * The heading’s level in the page’s outline: 1 for the page title, 2 for a
   * section, 3 for a part of a section. Renders <h1>, <h2>, or <h3> with the
   * matching text style. Required, because only the page knows where the
   * heading sits.
   */
  level: 1 | 2 | 3;
}

export function Heading({ children, level }: HeadingProps) {
  const Element = `h${level}` as const;
  return <Element className={`${styles.heading} ${styles[`level-${level}`]}`}>{children}</Element>;
}
