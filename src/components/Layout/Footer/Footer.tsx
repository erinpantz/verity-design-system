import type { ReactNode } from 'react';
import { Container } from '../Container';
import { Grid } from '../Grid';
import styles from './Footer.module.css';

export interface FooterProps {
  /**
   * The cards: ActionCards, each with headingLevel={2}, for the things you
   * most want a visitor to do, like getting in touch. They share a Grid:
   * three across on wide screens, one per row on phones.
   */
  cards: ReactNode;
  /** Whose site it is, for the copyright line: “© {this year} {name}” */
  copyrightName: string;
}

// This year, from today's date, so the copyright never goes stale. It's read
// once, when the page loads.
const YEAR = new Date().getFullYear();

// The site's footer: cards in a Grid, then the copyright line. The cards
// carry the surface; the footer has no fill of its own. Its content comes
// from the site. It adds no space outside itself; whatever holds it (Shell)
// sets the space above it.
export function Footer({ cards, copyrightName }: FooterProps) {
  return (
    <footer>
      <Container>
        <div className={styles.stack} data-width="wide">
          <Grid itemWidth="lg" fillRows width="wide">
            {cards}
          </Grid>
          <p className={styles.copyright}>
            © {YEAR} {copyrightName}
          </p>
        </div>
      </Container>
    </footer>
  );
}
