import type { IconName } from '../../../icons/icons.generated';
import { Icon } from '../Icon';
import styles from './IconTile.module.css';

export interface IconTileProps {
  /** Which icon, by its Figma name without “icon/” */
  icon: IconName;
  /**
   * The tile’s color, one of the six accent backgrounds. The accents map to
   * different hues in each theme.
   */
  color: 'accent-one' | 'accent-two' | 'accent-three' | 'accent-four' | 'accent-five' | 'accent-six';
}

// An icon on a small colored tile, beside a heading to mark what a block is
// about, as in ActionCard. It's decorative: the heading next to it says the
// same thing, so the whole tile is hidden from screen readers.
export function IconTile({ icon, color }: IconTileProps) {
  return (
    <span className={`${styles.iconTile} ${styles[color]}`} aria-hidden="true">
      <Icon name={icon} size="lg" />
    </span>
  );
}
