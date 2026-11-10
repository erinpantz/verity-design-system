import { NavIcon, navIconTrigger, navIconTriggerFocus } from '../NavIcon';
import styles from './NavCard.module.css';

export interface NavCardProps {
  /** Which page it goes to, shown by its nav icon */
  page: 'portfolio' | 'profile';
  /** The page’s name, like “Portfolio.” It’s the link’s name. */
  label: string;
  /** Where it goes */
  href: string;
  /**
   * A slight turn, for a playful pair: left or right by nav-card/tilt
   * degrees. On hover and focus the card straightens.
   */
  tilt?: 'none' | 'left' | 'right';
}

// A large link to one of the site's pages: its nav icon above its name, on a
// square card with PortfolioCard's surface. The whole card is the link, named
// by its label; the icon is decorative. On hover and focus the card lifts,
// grows, and straightens, and the icon takes its hover pose (from the shared
// NavIcon).
export function NavCard({ page, label, href, tilt = 'none' }: NavCardProps) {
  return (
    <a
      className={`${styles.navCard} ${styles[`tilt-${tilt}`]} ${navIconTrigger} ${navIconTriggerFocus}`}
      href={href}
    >
      <NavIcon page={page} />
      <span className={styles.label}>{label}</span>
    </a>
  );
}
