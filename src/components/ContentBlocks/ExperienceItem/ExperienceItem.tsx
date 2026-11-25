import { Heading } from '../../Text/Heading';
import { ParagraphGroup } from '../../Text/Paragraphs/ParagraphGroup';
import type { Paragraphs } from '../../Text/Paragraphs/paragraphs';
import styles from './ExperienceItem.module.css';

export interface ExperienceItemProps {
  /** The company or organization */
  company: string;
  /** The role’s title, for example “Head of Design” */
  title: string;
  /** When, with an en dash between the start and the end, for example “Jan 2024 – Sep 2026” */
  dates: string;
  /**
   * A sentence or two about the role: one paragraph, or several as a list,
   * one per paragraph. A paragraph is text, or inline content: text with a
   * Link, <em>, or <strong> in it, such as a link to proof of the work.
   * Inline only: ExperienceItem renders each paragraph's <p> itself, so a
   * paragraph can't hold blocks (paragraphs, lists, or headings). A Link in
   * it takes the description's text style, with no color passed.
   */
  description: Paragraphs;
  /** The company heading’s level in the page’s outline: 3 under a Section’s heading, 2 without one */
  headingLevel?: 2 | 3;
}

// One role in a list of experience: the company, a Heading, and its
// credentials (the title, the dates, and a description of one or more
// paragraphs, which can link to proof of the work). Its own width
// decides its layout, in CSS (ExperienceItem.module.css): a row at or above
// experience-item/stack-width, stacked below it. The root is a <div>, so a
// page puts each one in an <li> of a list (a VerticalStack as="ul"
// gap="none"), as it does with ProjectCards.
export function ExperienceItem({ company, title, dates, description, headingLevel = 3 }: ExperienceItemProps) {
  return (
    <div className={styles.experienceItem}>
      <div className={styles.layout}>
        <div className={styles.company}>
          <Heading level={headingLevel}>{company}</Heading>
        </div>
        <div className={styles.credentials}>
          <div className={styles.role}>
            <p className={styles.title}>{title}</p>
            <p className={styles.dates}>{dates}</p>
          </div>
          <ParagraphGroup content={description} textStyle="body-lg" className={styles.description} />
        </div>
      </div>
    </div>
  );
}
