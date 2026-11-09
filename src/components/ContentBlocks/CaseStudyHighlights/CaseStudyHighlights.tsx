import type { ReactNode } from 'react';
import { Heading } from '../../Text/Heading';
import styles from './CaseStudyHighlights.module.css';

export interface CaseStudyHighlightsProps {
  /** The heading, centered above the images */
  heading?: string;
  /**
   * The heading’s level in the page’s outline. 3 by default, for highlights
   * inside the Overview Section, whose own heading is level 2.
   */
  headingLevel?: 1 | 2 | 3;
  /** The images: MediaBlocks, from top to bottom. Each fills the box. */
  children?: ReactNode;
}

// A boxed set of images that shows a project at a glance, usually in a case
// study's Overview Section. It's always wide (data-width="wide"), so a Section
// or Container lets it span up to content/wide-width, like a wide MediaBlock.
// A plain box with a heading: the heading makes it easy to find, and the
// Section around it is already a landmark, so it doesn't add another one.
export function CaseStudyHighlights({
  heading = 'Project highlights',
  headingLevel = 3,
  children,
}: CaseStudyHighlightsProps) {
  return (
    <div className={styles.caseStudyHighlights} data-width="wide">
      <div className={styles.heading}>
        <Heading level={headingLevel}>{heading}</Heading>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
