import { MARK } from '../ErinTozourLogo/logoGlyphs';
import styles from './ErinTozourBadge.module.css';

// The “e” mark, the logo's own first letter, on a round brand-colored badge.
// It's decorative, so it's hidden from screen readers: where it's used, like
// NavOverlay, it keeps the brand in view and says nothing new.
export interface ErinTozourBadgeProps {
  /**
   * Fill its container, square, instead of its own 40px, with the padding
   * growing in proportion. PageLoader uses it for Home’s large badge.
   */
  fill?: boolean;
}

export function ErinTozourBadge({ fill = false }: ErinTozourBadgeProps) {
  return (
    <span className={`${styles.badge} ${fill ? styles.fill : ''}`} aria-hidden="true">
      <svg
        className={styles.mark}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={MARK.viewBox}
        fill="none"
        focusable="false"
        dangerouslySetInnerHTML={{ __html: MARK.markup }}
      />
    </span>
  );
}
