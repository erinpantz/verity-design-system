import { useEffect, useId, useRef, useState } from 'react';
import { IconButton } from '../../Actions/IconButton';
import { LinkAnchor } from '../../Actions/LinkProvider/LinkProvider';
import { Skeleton } from '../../FeedbackAndStatus/Skeleton';
import styles from './ProjectCard.module.css';

export interface ProjectCardProps {
  /** Where the card goes: a case study, or a brand’s gallery */
  href: string;
  /** The project’s title. It’s the link’s name for screen readers. */
  heading: string;
  /** The heading’s level in the page’s outline: 2 in a page’s grid of cards, 3 under a Section’s heading */
  headingLevel?: 2 | 3;
  /** The URL of the project’s thumbnail. It’s decorative: the title names the link. */
  thumbnail: string;
}

type Status = 'loading' | 'loaded' | 'error';

// A link to one project: the whole card is one <a>, named by its title, so a
// screen reader hears “Helping people take their cancer meds on time, link.”
// Inside: the title, an arrow that says it's clickable (the look of an
// IconButton, not a button: the card is already the link), and a thumbnail
// flush to the card's edges. The card's own width decides its layout: a row,
// with the thumbnail on the right, at or above project-card/stack-width, and
// stacked, with the thumbnail on top, below it (ProjectCard.module.css).
export function ProjectCard({ href, heading, headingLevel = 2, thumbnail }: ProjectCardProps) {
  const headingId = useId();
  const Heading = `h${headingLevel}` as const;
  const [result, setResult] = useState<{ src: string; status: Status } | null>(null);
  const status: Status = result?.src === thumbnail ? result.status : 'loading';
  const imgRef = useRef<HTMLImageElement>(null);

  // A file can finish loading before React is listening, so check once
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) setResult({ src: thumbnail, status: img.naturalWidth > 0 ? 'loaded' : 'error' });
  }, [thumbnail]);

  return (
    <LinkAnchor className={styles.projectCard} href={href} aria-labelledby={headingId}>
      <div className={styles.layout}>
        {/* The title first in the reading order; the thumbnail is placed on
            top (stacked) or on the right (row) by the CSS */}
        <div className={styles.title}>
          <Heading className={styles.heading} id={headingId}>
            {heading}
          </Heading>
          {/* Looks like an IconButton and follows the card's state, but
              it's a span, hidden from screen readers: the card is the link */}
          <IconButton as="span" icon="forward" label="" size="md" />
        </div>
        <div className={styles.thumbnail}>
          {status !== 'loaded' && <Skeleton showShine={status === 'loading'} />}
          <img
            ref={imgRef}
            className={styles.image}
            src={thumbnail}
            alt=""
            loading="lazy"
            decoding="async"
            onLoad={() => setResult({ src: thumbnail, status: 'loaded' })}
            onError={() => setResult({ src: thumbnail, status: 'error' })}
          />
        </div>
      </div>
    </LinkAnchor>
  );
}
