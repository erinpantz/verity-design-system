import type { MouseEventHandler, ReactNode } from 'react';
import type { IconName } from '../../../icons/icons.generated';
import { Icon } from '../../Media/Icon';
import styles from './Button.module.css';
import { LinkAnchor } from '../LinkProvider/LinkProvider';

// Each variant has its own colors, so color is typed together with variant:
// primary takes default or brand, and secondary takes default or knockout.
type VariantAndColor =
  | {
      /** Primary for the main action, secondary for the others */
      variant?: 'primary';
      /**
       * The background the button sits on. Primary: default for the site’s
       * background, or brand for a brand-colored band.
       */
      color?: 'default' | 'brand';
    }
  | {
      variant: 'secondary';
      /**
       * The background the button sits on. Secondary: default for the site’s
       * background, or knockout for a light band.
       */
      color?: 'default' | 'knockout';
    };

export type ButtonProps = VariantAndColor & {
  /** The label: a verb that says what happens, like “Book a call” */
  children: ReactNode;
  /** Height, side padding, label, and icon size, from the control size tokens */
  size?: 'md' | 'sm' | 'lg' | 'xl';
  /** An icon before the label */
  startIcon?: IconName;
  /** An icon after the label, such as an arrow for “next” */
  endIcon?: IconName;
  /** What the button does in a form. Button by default, so it never submits a form by accident. */
  type?: 'button' | 'submit' | 'reset';
  /** Whether the button can’t be used right now */
  disabled?: boolean;
  /** What happens when someone presses the button */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Where it goes, for a button that goes to another page, like “Book a
   * call.” It then renders a link (<a>) that looks like a button, and
   * type, disabled, and onClick don’t apply.
   */
  href?: string;
  /**
   * Whether the link opens in a new tab, for a page on another site that
   * people come back from, like a booking page. Only with href. Screen
   * readers hear “opens in a new tab” after the label.
   */
  opensInNewTab?: boolean;
  /**
   * span: the button’s look inside another link or button, such as a card’s
   * label, which can’t be a second link. It renders a plain <span> with no
   * focus or click of its own, and shows its hover and active looks when the
   * link or button around it is hovered, focused, or pressed. type,
   * disabled, onClick, href, and opensInNewTab don’t apply.
   */
  as?: 'span';
};

// Icon size for each button size: xl and lg buttons use the lg icon
const ICON_SIZE = { xl: 'lg', lg: 'lg', md: 'md', sm: 'sm' } as const;

export function Button({
  children,
  variant = 'primary',
  color = 'default',
  size = 'md',
  startIcon,
  endIcon,
  type = 'button',
  disabled = false,
  onClick,
  href,
  opensInNewTab = false,
  as,
}: ButtonProps) {
  const classes = [styles.button, styles[variant], styles[`${variant}-${color}`], styles[size]];
  const content = (
    <>
      {startIcon && <Icon name={startIcon} size={ICON_SIZE[size]} />}
      {children}
      {endIcon && <Icon name={endIcon} size={ICON_SIZE[size]} />}
    </>
  );

  // Just the look, inside a link or button that does the work. It follows
  // that parent's state (see .followsParent in the CSS).
  if (as === 'span') {
    return <span className={[...classes, styles.followsParent].join(' ')}>{content}</span>;
  }

  // Going somewhere is a link, so screen readers say “link” and it works
  // like one (open in a new tab, copy the address)
  if (href) {
    // A new tab gets rel="noopener noreferrer", so the page it opens can't
    // control this one, and hidden text, so screen reader users know (WCAG G201)
    return (
      <LinkAnchor
        className={classes.join(' ')}
        href={href}
        target={opensInNewTab ? '_blank' : undefined}
        rel={opensInNewTab ? 'noopener noreferrer' : undefined}
      >
        {content}
        {opensInNewTab && <span className={styles.newTab}> (opens in a new tab)</span>}
      </LinkAnchor>
    );
  }
  return (
    <button className={classes.join(' ')} type={type} disabled={disabled} onClick={onClick}>
      {content}
    </button>
  );
}
