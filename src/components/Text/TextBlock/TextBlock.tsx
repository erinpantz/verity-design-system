import type { ReactNode } from 'react';
import { Heading } from '../Heading';
import styles from './TextBlock.module.css';

export interface TextBlockProps {
  /** The heading text */
  heading: string;
  /**
   * The heading’s level in the page’s outline. 3 by default, for a TextBlock
   * inside a Section, whose own heading is level 2.
   */
  headingLevel?: 1 | 2 | 3;
  /**
   * The body text. Plain text becomes one paragraph; for more than one,
   * write each paragraph as a <p>.
   */
  children?: ReactNode;
}

export function TextBlock({ heading, headingLevel = 3, children }: TextBlockProps) {
  return (
    <div className={styles.textBlock}>
      <Heading level={headingLevel}>{heading}</Heading>
      <div className={styles.body}>{typeof children === 'string' ? <p>{children}</p> : children}</div>
    </div>
  );
}
