import { useId, type ReactNode } from 'react';
import { Heading } from '../../Text/Heading';
import { Container } from '../Container';
import { VerticalStack } from '../VerticalStack';
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
   * How wide the section can get, with the same side margins and maximum
   * widths as Container: constrained for reading, wide for media, or
   * full-bleed for edge-to-edge bands
   */
  width?: 'constrained' | 'wide' | 'full-bleed';
  /** The blocks that belong to the section, from top to bottom */
  children?: ReactNode;
}

// A <section> named by its heading. Container sets the width, and stacks set
// the space: header to content, and between the blocks in children.
export function Section({ heading, headingLevel = 2, intro, width = 'constrained', children }: SectionProps) {
  // A unique id for the heading on this page, so the section can point to it
  const headingId = useId();
  return (
    <section aria-labelledby={headingId}>
      <Container width={width}>
        <VerticalStack gap="md">
          <VerticalStack gap="sm">
            <Heading level={headingLevel} id={headingId}>
              {heading}
            </Heading>
            {intro && <p className={styles.intro}>{intro}</p>}
          </VerticalStack>
          <VerticalStack gap="lg">{children}</VerticalStack>
        </VerticalStack>
      </Container>
    </section>
  );
}
