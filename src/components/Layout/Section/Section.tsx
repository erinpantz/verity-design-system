import { useId, type ReactNode } from 'react';
import { Heading } from '../../Text/Heading';
import styles from './Section.module.css';

export interface SectionProps {
  /** The heading text. It also names the section for screen readers. */
  heading: string;
  /**
   * The heading’s level in the page’s outline. 2 by default, for a section
   * under the page’s level 1 title.
   */
  headingLevel?: 1 | 2 | 3;
  /** A short introduction below the heading. Leave it out for no intro. */
  intro?: string;
  /**
   * The blocks that belong to the section, from top to bottom. Each sits in
   * the content column; a MediaBlock, Gallery, Grid, or stack with width="wide"
   * spans the full width.
   */
  children?: ReactNode;
}

// A <section> named by its heading. Like Container, it centers its content in
// one column with room for wide blocks; the header sits in the column too, so
// the heading lines up with the blocks below it.
export function Section({ heading, headingLevel = 2, intro, children }: SectionProps) {
  // A unique id for the heading on this page, so the section can point to it
  const headingId = useId();
  return (
    <section aria-labelledby={headingId} className={styles.section}>
      <div className={styles.header}>
        <Heading level={headingLevel} id={headingId}>
          {heading}
        </Heading>
        {intro && <p className={styles.intro}>{intro}</p>}
      </div>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
