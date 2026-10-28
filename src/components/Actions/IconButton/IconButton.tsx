import { useId, type MouseEventHandler } from 'react';
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
  /** Whether the button can’t be used right now */
  disabled?: boolean;
  /** What happens when someone presses the button */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

// Icon size for each button size, as on Button: xl and lg use the lg icon
const ICON_SIZE = { xl: 'lg', lg: 'lg', md: 'md', sm: 'sm' } as const;

// A square button with only an icon. Its label shows in a tooltip on hover
// and focus, and the button takes its name from that tooltip, so screen
// readers hear the label once.
export function IconButton({ icon, label, size = 'md', disabled = false, onClick }: IconButtonProps) {
  const tooltipId = useId();
  return (
    <Tooltip text={label} id={tooltipId} placement="end">
      <button
        className={`${styles.iconButton} ${styles[size]}`}
        type="button"
        aria-labelledby={tooltipId}
        disabled={disabled}
        onClick={onClick}
      >
        <Icon name={icon} size={ICON_SIZE[size]} />
      </button>
    </Tooltip>
  );
}
