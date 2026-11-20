import type { MouseEventHandler } from 'react';
import { Icon } from '../../Media/Icon';
import styles from './BackLink.module.css';
import { LinkAnchor } from '../../Actions/LinkProvider/LinkProvider';

export interface BackLinkProps {
  /**
   * The page above this one, like the portfolio, for visitors who arrived
   * from outside the site, and before JavaScript loads. It’s also what opens
   * in a new tab.
   */
  href: string;
  /** What it says, usually “Back.” It’s the link’s name for screen readers too. */
  label: string;
  /**
   * What happens on a click, before the link is followed. A site can go back
   * in its history instead, when the previous page is on the site: call
   * event.preventDefault() and go back. Leave it out to always follow href.
   */
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

// A link back, with a back arrow, on a scrim so it stays readable over
// whatever scrolls under it. It's a real link to the page above this one
// (href), and a site can make a click go back in its history instead
// (onClick): Verity has no router, so the site decides. In Shell's focused
// mode it floats in the top-left corner, in place of the nav. The link stays
// still as its hit area; only the surface inside it lifts on hover and
// focus, so it can't slide out from under the pointer.
export function BackLink({ href, label, onClick }: BackLinkProps) {
  return (
    <LinkAnchor className={styles.backLink} href={href} onClick={onClick}>
      <span className={styles.surface}>
        <Icon name="back" size="sm" />
        {label}
      </span>
    </LinkAnchor>
  );
}
