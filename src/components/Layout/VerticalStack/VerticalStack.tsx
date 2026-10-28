import type { ReactNode } from 'react';
import styles from './VerticalStack.module.css';

export interface VerticalStackProps {
  /** The items to stack, from top to bottom */
  children?: ReactNode;
  /** The space between items, from the spacing tokens */
  gap?: 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
  /**
   * How items line up across the column: stretch to fill its width, or keep
   * their own width and line up at the start, center, or end
   */
  align?: 'stretch' | 'start' | 'center' | 'end';
  /**
   * The HTML element: ul for a list of similar things, ol for steps in order,
   * or div when it isn’t a list. With ul or ol, write each item as an <li>.
   */
  as?: 'div' | 'ul' | 'ol';
}

export function VerticalStack({ children, gap = 'md', align = 'stretch', as: Element = 'div' }: VerticalStackProps) {
  return (
    <Element
      className={`${styles.stack} ${styles[`gap-${gap}`]} ${styles[`align-${align}`]}`}
      // Safari stops announcing a list once its bullets are removed, unless it has role="list"
      role={Element === 'div' ? undefined : 'list'}
    >
      {children}
    </Element>
  );
}
