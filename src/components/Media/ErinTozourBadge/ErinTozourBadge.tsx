import { MARK } from '../ErinTozourLogo/logoGlyphs';
import styles from './ErinTozourBadge.module.css';

// The “e” mark, the logo's own first letter, on a round brand-colored badge.
// It's decorative, so it's hidden from screen readers: where it's used, like
// NavOverlay, it keeps the brand in view and says nothing new.
export function ErinTozourBadge() {
  return (
    <span className={styles.badge} aria-hidden="true">
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
