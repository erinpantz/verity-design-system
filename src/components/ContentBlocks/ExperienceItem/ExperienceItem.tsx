import { Heading } from '../../Text/Heading';
import styles from './ExperienceItem.module.css';

export interface ExperienceItemProps {
  /** The company or organization */
  company: string;
  /** The role’s title, for example “Head of Design” */
  title: string;
  /** When, with an en dash between the start and the end, for example “Jan 2024 – Sep 2026” */
  dates: string;
  /**
   * A sentence or two about the role: one paragraph as a string, or several
   * as a list of strings, one per paragraph
   */
  description: string | string[];
  /** The company heading’s level in the page’s outline: 3 under a Section’s heading, 2 without one */
  headingLevel?: 2 | 3;
}

// One role in a list of experience: the company, a Heading, and its
// credentials (the title, the dates, and a description of one or more
// paragraphs). Its own width
// decides its layout, in CSS (ExperienceItem.module.css): a row at or above
// experience-item/stack-width, stacked below it. The root is a <div>, so a
// page puts each one in an <li> of a list (a VerticalStack as="ul"
// gap="none"), as it does with ProjectCards.
export function ExperienceItem({ company, title, dates, description, headingLevel = 3 }: ExperienceItemProps) {
  // One paragraph renders as it always has; a list, one paragraph each
  const paragraphs = typeof description === 'string' ? [description] : description;
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
          {paragraphs.length === 1 ? (
            <p className={styles.description}>{paragraphs[0]}</p>
          ) : (
            // Several paragraphs, body/lg's paragraph space apart
            <div className={styles.descriptionParagraphs}>
              {paragraphs.map((paragraph, i) => (
                <p key={i} className={styles.description}>
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
