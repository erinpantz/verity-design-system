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

// One of the site's nav icons, in its own color. Inside Verity, NavItem,
// NavCard, and PageLoader share it, so each icon's poses live in one place:
// NavIcon.module.css. The link around it opts in to the poses with the
// trigger classes in navIconTriggers.ts, or a pose is set directly.
//
// Outside Verity, it shows a nav icon on its own, in a fixed pose: for
// example, the Profile icon in its hover pose as a picture on a card. Inside a
// link, use NavItem or NavCard instead: they give it the hover and current
// poses. It's decorative, hidden from screen readers, because the text next
// to it says what it is.
export function NavIcon({ page, pose, fill = false }: NavIconProps) {
  return (
    <span className={`${styles.navIcon} ${styles[page]} ${fill ? styles.fill : ''}`} data-pose={pose}>
      <Icon name={`nav/${page}`} />
    </span>
  );
}
