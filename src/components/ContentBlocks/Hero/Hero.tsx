import { Button } from '../../Actions/Button';
import styles from './Hero.module.css';

/** An action in the Hero: a button that goes to another page */
export interface HeroAction {
  /** The button’s label: a verb that says what happens, like “View my work” */
  label: string;
  /** Where it goes */
  href: string;
}

export interface HeroProps {
  /**
   * The band’s background: default for the site’s background, knockout for a
   * light band, or brand for a brand-colored band. The text and buttons
   * follow it.
   */
  background?: 'default' | 'knockout' | 'brand';
  /** The headline. It’s the page’s <h1>, so a page has one Hero at most. */
  heading: string;
  /** A sentence or two below the headline */
  intro: string;
  /** The main action */
  primaryAction: HeroAction;
  /** A second, less important action. Leave it out for one button. */
  secondaryAction?: HeroAction;
  /**
   * How wide the band gets in a Section or Container: column (the default),
   * or wide to break out to the full width, like a wide MediaBlock. The text
   * stays at the column’s width either way.
   */
  width?: 'column' | 'wide';
}

// Button colors for each background. Button has no brand secondary, so on
// brand the secondary button is default.
const BUTTON_COLORS = {
  default: { primary: 'default', secondary: 'default' },
  knockout: { primary: 'default', secondary: 'knockout' },
  brand: { primary: 'brand', secondary: 'default' },
} as const;

// The band at the top of a page: a headline and an intro, as one group, then
// one or two actions. It's the page's <header>, and its headline is the
// page's <h1>. With width="wide" the band breaks out of the column, and the
// text group stays at the column's width so it keeps a readable measure.
export function Hero({
  background = 'default',
  heading,
  intro,
  primaryAction,
  secondaryAction,
  width = 'column',
}: HeroProps) {
  const colors = BUTTON_COLORS[background];
  return (
    <header className={`${styles.hero} ${styles[background]}`} data-width={width}>
      <div className={styles.text}>
        <h1 className={styles.heading}>{heading}</h1>
        <p className={styles.intro}>{intro}</p>
      </div>
      <div className={styles.actions}>
        <Button size="xl" color={colors.primary} href={primaryAction.href}>
          {primaryAction.label}
        </Button>
        {secondaryAction && (
          <Button variant="secondary" size="xl" color={colors.secondary} href={secondaryAction.href}>
            {secondaryAction.label}
          </Button>
        )}
      </div>
    </header>
  );
}
