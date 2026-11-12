import { Icon } from '../../Media/Icon';
import { NavIcon, navIconTrigger } from '../NavIcon';
import styles from './NavItem.module.css';

export interface NavItemProps {
  /** Which page it goes to, shown by its icon */
  icon: 'portfolio' | 'playground' | 'profile' | 'resume';
  /** The page’s name, like “Portfolio.” It’s the link’s text, always shown. */
  label: string;
  /** Where the link goes. For Resume, the PDF’s URL: it opens in the browser. */
  href: string;
  /** Whether this is the page someone is on. Screen readers hear “current page.” */
  current?: boolean;
}

// A link to one of the site's pages: its icon, then its name. On hover and on
// the current page, a nav icon takes its accent colors and moves to a pose;
// the poses are shared with NavCard, in NavIcon. Resume's icon doesn't move.
export function NavItem({ icon, label, href, current = false }: NavItemProps) {
  return (
    <a
      className={`${styles.navItem} ${navIconTrigger}`}
      href={href}
      aria-current={current ? 'page' : undefined}
    >
      {icon === 'resume' ? <Icon name="resume" /> : <NavIcon page={icon} />}
      <span className={styles.label}>{label}</span>
    </a>
  );
}
