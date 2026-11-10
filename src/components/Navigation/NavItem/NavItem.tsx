import { useId } from 'react';
import { Tooltip } from '../../Actions/Tooltip';
import { Icon } from '../../Media/Icon';
import { NavIcon, navIconTrigger } from '../NavIcon';
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

// A link to one of the site's pages, with its icon. On hover and on the
// current page, a nav icon takes its accent colors and moves to a pose; the
// poses are shared with NavCard, in NavIcon. Resume's icon doesn't move.
//
// The tooltip is always there, but it only shows while the label is hidden.
// MainNav hides labels with CSS at some widths, so it finds the parts by
// their data attributes: data-nav-item, data-nav-item-link, and
// data-nav-item-label.
export function NavItem({ icon, label, href, current = false, showLabel = true }: NavItemProps) {
  const tooltipId = useId();
  return (
    <div className={styles.item} data-nav-item="" data-label-hidden={showLabel ? undefined : ''}>
      {/* The hidden label is the link's name, so screen readers skip the tooltip */}
      <Tooltip text={label} id={tooltipId} placement="end" visualOnly>
        <a
          className={`${styles.navItem} ${navIconTrigger}`}
          href={href}
          aria-current={current ? 'page' : undefined}
          data-nav-item-link=""
        >
          {icon === 'resume' ? <Icon name="resume" /> : <NavIcon page={icon} />}
          <span className={styles.label} data-nav-item-label="">
            {label}
          </span>
        </a>
      </Tooltip>
    </div>
  );
}
