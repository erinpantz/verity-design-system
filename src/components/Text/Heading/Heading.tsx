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
  /**
   * A unique id for the heading, so other elements can point to it: a Section
   * uses it to name itself, and a link to #id jumps to it. Not in Figma.
   */
  id?: string;
}

export function Heading({ children, level, id }: HeadingProps) {
  const Element = `h${level}` as const;
  return (
    <Element id={id} className={`${styles.heading} ${styles[`level-${level}`]}`}>
      {children}
    </Element>
  );
}
