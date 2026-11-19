import type { ReactNode } from 'react';
import type { IconName } from '../../../icons/icons.generated';
import { Button } from '../../Actions/Button';
import { IconButton } from '../../Actions/IconButton';
import { Heading } from '../../Text/Heading';
import { Container } from '../Container';
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
    /** Whether the button opens its page in a new tab, as for a booking page on another site */
    opensInNewTab?: boolean;
    /**
     * A second, smaller way to get in touch, like a LinkedIn profile: an
     * IconButton right after the button. Its label is its name for screen
     * readers and the text of its tooltip.
     */
    secondaryAction?: {
      icon: IconName;
      label: string;
      href: string;
      /** Whether it opens its page in a new tab, as for a profile on another site */
      opensInNewTab?: boolean;
    };
  };
  /**
   * Anything else, on the right, beside the call to action: a line about the
   * site, say, with a link in it. Text in it takes the footer’s text style.
   */
  aside?: ReactNode;
  /** Whose site it is, for the copyright line: “© {this year} {name}” */
  copyrightName: string;
}

// This year, from today's date, so the copyright never goes stale. It's read
// once, when the page loads.
const YEAR = new Date().getFullYear();

// The site's footer: a deep brand-colored block with a call to action, an
// optional aside beside it, and the copyright line. Its content comes from the site. It adds no space outside
// itself; whatever holds it (Shell) sets the space above it.
export function Footer({ callToAction, aside, copyrightName }: FooterProps) {
  const secondary = callToAction.secondaryAction;
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.stack} data-width="wide">
          <div className={styles.top}>
            <div className={styles.callToAction}>
              <Heading level={3}>{callToAction.heading}</Heading>
              <p className={styles.text}>{callToAction.text}</p>
              <div className={styles.actions}>
                <Button href={callToAction.href} opensInNewTab={callToAction.opensInNewTab}>
                  {callToAction.buttonLabel}
                </Button>
                {secondary && (
                  <IconButton
                    icon={secondary.icon}
                    label={secondary.label}
                    href={secondary.href}
                    opensInNewTab={secondary.opensInNewTab}
                  />
                )}
              </div>
            </div>
            {aside && <div className={styles.aside}>{aside}</div>}
          </div>
          <p className={styles.copyright}>
            © {YEAR} {copyrightName}
          </p>
        </div>
      </Container>
    </footer>
  );
}
