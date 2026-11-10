import { Icon } from '../../Media/Icon';
import styles from './BackLink.module.css';

export interface BackLinkProps {
  /** Where it goes: the page someone came from, like the portfolio */
  href: string;
  /** The page it goes back to, like “Portfolio.” It’s the link’s name for screen readers too. */
  label: string;
}

// A link back to the page above this one, with a back arrow, on a scrim so it
// stays readable over whatever scrolls under it. In Shell's focused mode it
// floats in the top-left corner, in place of the nav. The link stays still
// as its hit area; only the surface inside it lifts on hover and focus, so
// it can't slide out from under the pointer.
export function BackLink({ href, label }: BackLinkProps) {
  return (
    <a className={styles.backLink} href={href}>
      <span className={styles.surface}>
        <Icon name="back" size="sm" />
        {label}
      </span>
    </a>
  );
}
