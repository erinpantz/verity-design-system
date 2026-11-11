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
  /**
   * Where the header sits: column (the default) in the centered content
   * column, or wide to start at the wide edge, lined up with wide blocks.
   * Use wide only when the section’s content is wide, like a wide Grid of
   * cards or a Gallery. Either way, the heading and intro are never wider
   * than the content column, and the blocks keep their own widths.
   */
  width?: 'column' | 'wide';
}

// A <section> named by its heading. Like Container, it centers its content in
// one column with room for wide blocks; the header sits in the column too, so
// the heading lines up with the blocks below it. With width="wide", the header
// starts at the wide edge instead, to line up with wide blocks.
export function Section({ heading, headingLevel = 2, intro, width = 'column', children }: SectionProps) {
  // A unique id for the heading on this page, so the section can point to it
  const headingId = useId();
  return (
    <section aria-labelledby={headingId} className={styles.section} data-width={width}>
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
