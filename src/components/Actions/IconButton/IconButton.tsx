import { useId, type MouseEventHandler, type Ref } from 'react';
import type { IconName } from '../../../icons/icons.generated';
import { Icon } from '../../Media/Icon';
import { Tooltip } from '../Tooltip';
import styles from './IconButton.module.css';

export interface IconButtonProps {
  /** Which icon, by its Figma name without “icon/” */
  icon: IconName;
  /**
   * What the button does, like “Collapse navigation.” It’s the button’s name
   * for screen readers and the text of its tooltip.
   */
  label: string;
  /** Width, height, and icon size, from the control size tokens */
  size?: 'md' | 'sm' | 'lg' | 'xl';
  /**
   * What’s behind the icon: none, for the page’s background, or scrim, a dark
   * see-through fill for a button that sits on top of an image or animation
   */
  background?: 'none' | 'scrim';
  /** Whether the button can’t be used right now */
  disabled?: boolean;
  /** What happens when someone presses the button */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /**
   * For a button that shows and hides something, like a menu: whether that
   * thing is showing now. Screen readers hear “expanded” or “collapsed.”
   */
  expanded?: boolean;
  /**
   * Where the tooltip opens: beside the button (end, the default), above it
   * lined up with its start (top), or above it lined up with its end
   * (top-end), for a button in a corner, like Animation’s
   */
  tooltipPlacement?: 'end' | 'top' | 'top-end';
  /** For a button that opens a dialog, like a full-screen menu */
  hasPopup?: 'dialog';
  /** A reference to the button, so focus can return to it */
  ref?: Ref<HTMLButtonElement>;
  /**
   * span: the button’s look inside another button or link, like VideoEmbed’s
   * play button on its poster. It follows the parent’s hover, focus, and
   * press, has no tooltip, and is hidden from screen readers: the parent
   * carries the name. Leave it out for a real button.
   */
  as?: 'span';
}

// Icon size for each button size, as on Button: xl and lg use the lg icon
const ICON_SIZE = { xl: 'lg', lg: 'lg', md: 'md', sm: 'sm' } as const;

// A square button with only an icon. Its label shows in a tooltip on hover
// and focus, and the button takes its name from that tooltip, so screen
// readers hear the label once.
export function IconButton({
  icon,
  label,
  size = 'md',
  background = 'none',
  disabled = false,
  onClick,
  expanded,
  hasPopup,
  tooltipPlacement = 'end',
  ref,
  as,
}: IconButtonProps) {
  const tooltipId = useId();
  // The look only, inside a parent that's the real button or link; it
  // follows that parent's state (see .followsParent in the CSS)
  if (as === 'span') {
    return (
      <span
        className={`${styles.iconButton} ${styles[size]} ${styles[background]} ${styles.followsParent}`}
        aria-hidden="true"
      >
        <Icon name={icon} size={ICON_SIZE[size]} />
      </span>
    );
  }
  return (
    <Tooltip text={label} id={tooltipId} placement={tooltipPlacement}>
      <button
        className={`${styles.iconButton} ${styles[size]} ${styles[background]}`}
        type="button"
        aria-labelledby={tooltipId}
        aria-expanded={expanded}
        aria-haspopup={hasPopup}
        ref={ref}
        disabled={disabled}
        onClick={onClick}
      >
        <Icon name={icon} size={ICON_SIZE[size]} />
      </button>
    </Tooltip>
  );
}
