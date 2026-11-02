import { useId } from 'react';
import { Tooltip } from '../../Actions/Tooltip';
import { Icon } from '../../Media/Icon';
import styles from './NavItem.module.css';

export interface NavItemProps {
  /** Which page it goes to, shown by its icon */
  icon: 'portfolio' | 'playground' | 'profile' | 'resume';
  /** The page’s name, like “Portfolio.” It’s the link’s name, even when it’s hidden. */
  label: string;
  /** Where the link goes. For Resume, the PDF’s URL: it opens in the browser. */
  href: string;
  /** Whether this is the page someone is on. Screen readers hear “current page.” */
  current?: boolean;
  /**
   * Whether the label shows next to the icon. Without it, the label is hidden
   * text that screen readers still read, and it shows in a tooltip on hover
   * and focus.
   */
  showLabel?: boolean;
}

// The Icon for each page. The three nav icons animate between poses.
const ICON = {
  portfolio: 'nav/portfolio',
  playground: 'nav/playground',
  profile: 'nav/profile',
  resume: 'resume',
} as const;

// A link to one of the site's pages, with its icon. On hover and on the
// current page, a nav icon takes its accent colors and moves to a pose.
export function NavItem({ icon, label, href, current = false, showLabel = true }: NavItemProps) {
  const tooltipId = useId();
  const classes = [styles.navItem, styles[icon], showLabel ? '' : styles.iconOnly];

  const link = (
    <a
      className={classes.join(' ').trim()}
      href={href}
      aria-current={current ? 'page' : undefined}
    >
      <Icon name={ICON[icon]} />
      <span className={showLabel ? styles.label : styles.hiddenLabel}>{label}</span>
    </a>
  );

  if (showLabel) return link;
  // The link already has its name from the hidden label, so the tooltip is
  // only for people who can see it
  return (
    <Tooltip text={label} id={tooltipId} placement="end">
      {link}
    </Tooltip>
  );
}
