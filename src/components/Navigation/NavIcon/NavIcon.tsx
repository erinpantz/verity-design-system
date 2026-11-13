import { Icon } from '../../Media/Icon';
import styles from './NavIcon.module.css';

/** A nav icon's poses: default (at rest), hover, and current (the current page) */
export type NavIconPose = 'default' | 'hover' | 'current';

export interface NavIconProps {
  /** Which page’s icon */
  page: 'portfolio' | 'playground' | 'profile';
  /**
   * Puts the icon in a pose directly, with its accent colors on, whatever the
   * link around it is doing. Leave it out to let the link drive the poses.
   */
  pose?: NavIconPose;
  /** Fill its container, square, instead of the icon size (PageLoader’s large icon) */
  fill?: boolean;
}

// One of the site's nav icons, in its own color. Shared by NavItem, NavCard,
// and PageLoader, so each icon's poses live in one place:
// NavIcon.module.css. The link around it opts in to the poses with the
// trigger classes in navIconTriggers.ts, or a pose is set directly. Not
// exported from the library.
export function NavIcon({ page, pose, fill = false }: NavIconProps) {
  return (
    <span className={`${styles.navIcon} ${styles[page]} ${fill ? styles.fill : ''}`} data-pose={pose}>
      <Icon name={`nav/${page}`} />
    </span>
  );
}
