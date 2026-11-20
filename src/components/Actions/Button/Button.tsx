import { useId, type MouseEventHandler, type ReactNode } from 'react';
import type { IconName } from '../../../icons/icons.generated';
import { Icon } from '../../Media/Icon';
import styles from './Button.module.css';
import lift from './lift.module.css';
import { LinkAnchor } from '../LinkProvider/LinkProvider';
import { Tooltip } from '../Tooltip';

// Each variant has its own colors, so color is typed together with variant:
// primary takes default or brand, and secondary takes default or knockout.
// Only secondary default comes on a scrim, as in Figma, so background is
// typed with them too: scrim on any other variant or color is a type error.
type VariantAndColor =
  | {
      /** Primary for the main action, secondary for the others */
      variant?: 'primary';
      /**
       * The background the button sits on. Primary: default for the site’s
       * background, or brand for a brand-colored band.
       */
      color?: 'default' | 'brand';
      background?: 'none';
    }
  | {
      variant: 'secondary';
      /**
       * The background the button sits on. Secondary: default for the site’s
       * background, or knockout for a light band.
       */
      color?: 'default';
      /**
       * What’s behind the label: none, or scrim, a dark see-through fill for
       * a button that floats over images or scrolling content, like Shell’s
       * focused-mode action. Secondary default only.
       */
      background?: 'none' | 'scrim';
    }
  | {
      variant: 'secondary';
      color?: 'knockout';
      background?: 'none';
    };

// A link either opens in a new tab or downloads its file, never both
type LinkBehavior =
  | {
      /**
       * Whether the link opens in a new tab, for a page on another site that
       * people come back from, like a booking page. Only with href. Screen
       * readers hear “opens in a new tab” after the label.
       */
      opensInNewTab?: boolean;
      download?: never;
    }
  | {
      opensInNewTab?: false;
      /**
       * For a link to a file, like a PDF: the browser saves it instead of
       * opening it. true keeps the file’s own name; a string names the saved
       * file. Only with href, and not with opensInNewTab.
       */
      download?: boolean | string;
    };

export type ButtonProps = VariantAndColor &
  LinkBehavior & {
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
  /**
   * A short hint shown on hover and keyboard focus, usually “Coming soon” on
   * a disabled button. A disabled button with a tooltip stays in the tab
   * order, so keyboard users can reach it and hear why it’s disabled.
   * Screen readers hear the label, then the hint.
   */
  tooltip?: string;
  /**
   * What happens when someone presses the button. With href, it runs on the
   * link before it’s followed, and can call event.preventDefault() to handle
   * the click itself instead.
   */
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  /**
   * Where it goes, for a button that goes to another page, like “Book a
   * call.” It then renders a link (<a>) that looks like a button, and type
   * and disabled don’t apply.
   */
  href?: string;
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
  download,
  background = 'none',
  tooltip,
  as,
}: ButtonProps) {
  const tooltipId = useId();
  const describedBy = tooltip ? tooltipId : undefined;
  const classes = [styles.button, styles[variant], styles[`${variant}-${color}`], styles[size]];
  // Scrim only on secondary default; anywhere else it's ignored
  const scrim = background === 'scrim' && variant === 'secondary' && color === 'default';
  if (scrim) classes.push(styles.scrim);
  // On a scrim at md, the icon is sm (20), like BackLink's; other sizes keep
  // their own
  const iconSize = scrim && size === 'md' ? 'sm' : ICON_SIZE[size];
  const content = (
    <>
      {startIcon && <Icon name={startIcon} size={iconSize} />}
      {children}
      {endIcon && <Icon name={endIcon} size={iconSize} />}
    </>
  );

  // Just the look, inside a link or button that does the work. It follows
  // that parent's state (see .followsParent in the CSS).
  if (as === 'span') {
    return <span className={[...classes, styles.followsParent].join(' ')}>{content}</span>;
  }
  // A real button or link lifts on hover and focus (see lift.module.css)
  classes.push(lift.lift);

  // Going somewhere is a link, so screen readers say “link” and it works
  // like one (open in a new tab, copy the address)
  let button: ReactNode;
  if (href) {
    // A new tab gets rel="noopener noreferrer", so the page it opens can't
    // control this one, and hidden text, so screen reader users know (WCAG G201)
    button = (
      <LinkAnchor
        className={classes.join(' ')}
        href={href}
        aria-describedby={describedBy}
        target={opensInNewTab ? '_blank' : undefined}
        rel={opensInNewTab ? 'noopener noreferrer' : undefined}
        // Saves the file instead of opening it. It also keeps the link a
        // plain <a>, never a router's link (see LinkProvider).
        download={opensInNewTab ? undefined : download}
        // Runs before the link is followed, like BackLink's
        onClick={onClick}
      >
        {content}
        {opensInNewTab && <span className={styles.newTab}> (opens in a new tab)</span>}
      </LinkAnchor>
    );
  } else if (disabled && tooltip) {
    // Disabled, with a hint: aria-disabled instead of disabled, so it stays
    // in the tab order and its tooltip shows on focus too. It has no click,
    // so pressing it does nothing; it looks and reads as disabled.
    button = (
      <button className={classes.join(' ')} type={type} aria-disabled="true" aria-describedby={describedBy}>
        {content}
      </button>
    );
  } else {
    button = (
      <button
        className={classes.join(' ')}
        type={type}
        disabled={disabled}
        onClick={onClick}
        aria-describedby={describedBy}
      >
        {content}
      </button>
    );
  }

  if (!tooltip) return button;
  return (
    <Tooltip text={tooltip} id={tooltipId}>
      {button}
    </Tooltip>
  );
}
