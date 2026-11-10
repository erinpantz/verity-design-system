import { Icon } from '../../Media/Icon';
import styles from './NavIcon.module.css';

export interface NavIconProps {
  /** Which page’s icon */
  page: 'portfolio' | 'playground' | 'profile';
}

// One of the site's nav icons, in its own color. Shared by NavItem and
// NavCard, so each icon's poses live in one place: NavIcon.module.css. The
// link around it opts in to the poses with the trigger classes in
// navIconTriggers.ts. Not exported from the library.
export function NavIcon({ page }: NavIconProps) {
  return (
    <span className={`${styles.navIcon} ${styles[page]}`}>
      <Icon name={`nav/${page}`} />
    </span>
  );
}
