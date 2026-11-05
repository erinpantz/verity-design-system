import type { ReactNode } from 'react';
import { Button } from '../../Actions/Button';
import { Heading } from '../../Text/Heading';
import { Container } from '../Container';
import { Divider } from '../Divider';
import styles from './Footer.module.css';

export interface FooterProps {
  /**
   * The invitation at the start of the footer: a heading, a sentence, and a
   * button that goes somewhere, like “Book a call” to a booking page
   */
  callToAction: {
    heading: string;
    text: string;
    buttonLabel: string;
    href: string;
  };
  /** The link groups: a LinkGroup for each, like Pages, Fun stuff, and Connect */
  linkGroups: ReactNode;
  /** Whose site it is, for the copyright line: “© {this year} {name}” */
  copyrightName: string;
}

// This year, from today's date, so the copyright never goes stale. It's read
// once, when the page loads.
const YEAR = new Date().getFullYear();

// The site's footer: a divider, a call to action, the link groups, and the
// copyright line. Its content comes from the site. It adds no space outside
// itself; whatever holds it (Shell) sets the space above it.
export function Footer({ callToAction, linkGroups, copyrightName }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.stack}>
          <Divider />
          <div className={styles.top}>
            <div className={styles.callToAction}>
              <Heading level={3}>{callToAction.heading}</Heading>
              <p className={styles.text}>{callToAction.text}</p>
              <Button href={callToAction.href}>{callToAction.buttonLabel}</Button>
            </div>
            <div className={styles.linkGroups}>{linkGroups}</div>
          </div>
          <p className={styles.copyright}>
            © {YEAR} {copyrightName}
          </p>
        </div>
      </Container>
    </footer>
  );
}
