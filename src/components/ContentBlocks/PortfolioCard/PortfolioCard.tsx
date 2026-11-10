import { useId } from 'react';
import { Button } from '../../Actions/Button';
import { Image } from '../../Media/Image';
import styles from './PortfolioCard.module.css';

export interface PortfolioCardProps {
  /** What the card links to: a case study, or a brand’s gallery */
  type?: 'case-study' | 'brand-gallery';
  /** Where the card goes */
  href: string;
  /** The case study’s heading, or the brand’s name for a gallery. It’s the link’s name for screen readers. */
  heading: string;
  /** The heading’s level in the page’s outline: 2 in a page’s grid of cards, 3 under a Section’s heading */
  headingLevel?: 2 | 3;
  /** Case studies only: the project’s name, like the case study page’s title */
  project?: string;
  /** The years of the work, like “2024–2025” */
  year: string;
  /** Case studies only: the URL of one thumbnail, shown at 3:2 */
  thumbnail?: string;
  /** Brand galleries only: the URLs of exactly three thumbnails, shown at 1:1 */
  thumbnails?: [string, string, string];
}

// The label at the end of the text, set by the type
const LABEL = {
  'case-study': 'Case study',
  'brand-gallery': 'Brand gallery',
} as const;

// A link to one piece of work: the whole card is one <a>. Its name is the
// heading, and the project, year, and type label describe it, so a screen reader
// hears “Designing AI that care teams trust, link,” then the details, not
// the pictures, which are decorative. The text and the pictures sit side by
// side, and the pictures wrap below when the card is narrow.
export function PortfolioCard({
  type = 'case-study',
  href,
  heading,
  headingLevel = 2,
  project,
  year,
  thumbnail,
  thumbnails,
}: PortfolioCardProps) {
  const headingId = useId();
  const detailsId = useId();
  const Heading = `h${headingLevel}` as const;
  return (
    <a
      className={`${styles.portfolioCard} ${styles[type]}`}
      href={href}
      aria-labelledby={headingId}
      aria-describedby={detailsId}
    >
      <div className={styles.text}>
        <Heading className={styles.heading} id={headingId}>
          {heading}
        </Heading>
        <div className={styles.details} id={detailsId}>
          <div className={styles.projectInfo}>
            {type === 'case-study' && project && <p>{project}</p>}
            <p>{year}</p>
          </div>
          {/* Looks like a secondary Button and follows the card's state,
              but it's a span: the card is already the link */}
          <Button as="span" variant="secondary" size="md" endIcon="forward">
            {LABEL[type]}
          </Button>
        </div>
      </div>
      {type === 'case-study' ? (
        thumbnail && (
          <div className={styles.images}>
            <Image src={thumbnail} alt="" aspectRatio="3:2" />
          </div>
        )
      ) : (
        <div className={`${styles.images} ${styles.thumbnails}`}>
          {thumbnails?.map((src) => (
            <div className={styles.thumbnail} key={src}>
              <Image src={src} alt="" aspectRatio="1:1" />
            </div>
          ))}
        </div>
      )}
    </a>
  );
}
