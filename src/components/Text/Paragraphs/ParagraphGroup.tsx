import styles from './ParagraphGroup.module.css';
import type { Paragraphs } from './paragraphs';

export interface ParagraphGroupProps {
  /** One paragraph, or several as a list */
  content: Paragraphs;
  /**
   * The text style. It sets the paragraphs' font and the space between
   * them, so the two always match.
   */
  textStyle: 'body-lg' | 'body-xl';
  /** The component's own class for each <p>, for its color */
  className?: string;
}

// How Hero's intro and ExperienceItem's description render their Paragraphs:
// one <p> for one paragraph, or a group of <p>s, the text style's paragraph
// space apart. Shared so the two can't drift apart. Not exported from the
// library.
export function ParagraphGroup({ content, textStyle, className }: ParagraphGroupProps) {
  const paragraphClass = [styles.paragraph, styles[textStyle], className].filter(Boolean).join(' ');
  // One paragraph renders as it always has; a list, one paragraph each
  const paragraphs = Array.isArray(content) ? content : [content];
  if (paragraphs.length === 1) return <p className={paragraphClass}>{paragraphs[0]}</p>;
  return (
    <div className={`${styles.group} ${styles[textStyle]}`}>
      {paragraphs.map((paragraph, i) => (
        <p key={i} className={paragraphClass}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}
