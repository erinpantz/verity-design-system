import { useId, type ReactNode } from 'react';
import { Tooltip } from '../Tooltip';
import styles from './Link.module.css';

export interface LinkProps {
  /** The link text. Say where the link goes, not “click here.” */
  children: ReactNode;
  /** Where the link goes. Ignored when the link is disabled. */
  href?: string;
  /**
   * The background the link sits on: default for the site’s background, brand
   * for a brand-colored band, or knockout for a light band
   */
  color?: 'default' | 'brand' | 'knockout';
  /**
   * Whether the link goes nowhere yet, like a page that’s coming soon. A
   * disabled link isn’t underlined, but keyboard users can still reach it.
   */
  disabled?: boolean;
  /** A short hint shown on hover and focus, usually “Coming soon” on a disabled link */
  tooltip?: string;
}

export function Link({ children, href, color = 'default', disabled = false, tooltip }: LinkProps) {
  const tooltipId = useId();
  const describedBy = tooltip ? tooltipId : undefined;
  // data-link tells Prose this is a Link, so Prose leaves its styles alone
  const common = {
    className: `${styles.link} ${styles[color]}`,
    'data-link': '',
    'aria-describedby': describedBy,
  };

  const link = disabled ? (
    // No href, so it goes nowhere and Enter does nothing. role="link" and
    // tabIndex keep it in the tab order, so keyboard users can reach it and
    // hear that it's disabled, and its tooltip shows on focus.
    <a {...common} role="link" aria-disabled="true" tabIndex={0}>
      {children}
    </a>
  ) : (
    <a {...common} href={href}>
      {children}
    </a>
  );

  if (!tooltip) return link;
  return (
    <Tooltip text={tooltip} id={tooltipId}>
      {link}
    </Tooltip>
  );
}
