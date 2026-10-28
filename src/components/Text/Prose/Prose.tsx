import type { ReactNode } from 'react';
import styles from './Prose.module.css';

export interface ProseProps {
  /**
   * The text, as plain HTML: headings (h1–h3), paragraphs, blockquotes, lists,
   * inline code, and links, such as the HTML that Markdown produces
   */
  children?: ReactNode;
}

export function Prose({ children }: ProseProps) {
  return <div className={styles.prose}>{children}</div>;
}
