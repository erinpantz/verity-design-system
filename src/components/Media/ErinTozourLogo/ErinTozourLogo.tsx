import { FIRST, FULL } from './logoGlyphs';
import styles from './ErinTozourLogo.module.css';

export interface ErinTozourLogoProps {
  /**
   * How much of the name it draws: the full name, “erin tozour,” or only the
   * first name, “erin,” for narrow spaces. The letters match exactly at the
   * same height. Screen readers hear “Erin Tozour” either way.
   */
  name?: 'full' | 'first';
}

// Erin Tozour's name, drawn. It's one color (currentColor), so it takes the
// text color around it. It fills its container's width unless the owner sets
// its height; its width follows, so it keeps its proportions.
export function ErinTozourLogo({ name = 'full' }: ErinTozourLogoProps) {
  const { viewBox, markup } = name === 'first' ? FIRST : FULL;
  return (
    <svg
      className={styles.logo}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      fill="none"
      role="img"
      aria-label="Erin Tozour"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
