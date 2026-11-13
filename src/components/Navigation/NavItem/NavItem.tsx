import { useReducedMotion } from '../../Media/Playback/useReducedMotion';
import { Icon } from '../../Media/Icon';
import { NavIcon, navIconTrigger } from '../NavIcon';
import { LOADING_POSES, STILL_POSE, usePoseTicks } from '../NavIcon/poseClock';
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
  /**
   * Whether a page change to this page is going on. Its icon swaps between
   * the same poses as PageLoader’s, in step with it. Resume’s icon doesn’t.
   */
  pending?: boolean;
}

// A link to one of the site's pages: its icon, then its name. On hover and on
// the current page, a nav icon takes its accent colors and moves to a pose;
// the poses are shared with NavCard, in NavIcon. Resume's icon doesn't move.
// While a page change to it is going on (pending), its icon swaps between
// PageLoader's poses, on the clock it shares with PageLoader.
export function NavItem({ icon, label, href, current = false, pending = false }: NavItemProps) {
  const reducedMotion = useReducedMotion();
  const section = icon === 'resume' ? 'portfolio' : icon;
  const ticks = usePoseTicks(section, pending && icon !== 'resume' && !reducedMotion);
  const poses = LOADING_POSES[section];
  const pose = !pending ? undefined : reducedMotion ? STILL_POSE[section] : poses[ticks % poses.length];
  return (
    <a
      className={`${styles.navItem} ${navIconTrigger}`}
      href={href}
      aria-current={current ? 'page' : undefined}
    >
      {icon === 'resume' ? <Icon name="resume" /> : <NavIcon page={icon} pose={pose} />}
      <span className={styles.label}>{label}</span>
    </a>
  );
}
