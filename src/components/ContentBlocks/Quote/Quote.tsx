import styles from './Quote.module.css';

export interface QuoteProps {
  /**
   * What they said, without quotation marks: Quote adds the curly marks “ ”.
   * Mark a quote inside it with single curly marks: ‘…’
   */
  quote: string;
  /** Who said it */
  name: string;
  /** Their role or company, shown after the name. Leave it out to show only the name. */
  title?: string;
}

// A quote set apart from the text around it, with who said it. The rule on the
// left matches Prose blockquotes.
export function Quote({ quote, name, title }: QuoteProps) {
  return (
    <figure className={styles.quote}>
      <blockquote className={styles.text}>
        <p>“{quote}”</p>
      </blockquote>
      <figcaption className={styles.attribution}>
        {/* The dash is how it looks; screen readers skip it and read the name */}
        <span aria-hidden="true">—</span>
        <span>
          {name}
          {title && `, ${title}`}
        </span>
      </figcaption>
    </figure>
  );
}
