import styles from './Badge.module.css';

export interface BadgeProps {
  /**
   * The fill. `neutral` for a tag that isn’t a category, an accent for a
   * category, and `error`, `success`, or `warning` for a status.
   */
  color?:
    | 'neutral'
    | 'accent-one'
    | 'accent-two'
    | 'accent-three'
    | 'accent-four'
    | 'accent-five'
    | 'accent-six'
    | 'error'
    | 'success'
    | 'warning';
  /** The text. It always says what the badge means, so color is never the only cue. */
  label: string;
}

// A short label in a pill. It isn't interactive: it labels what's next to it.
export function Badge({ color = 'neutral', label }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[color]}`}>{label}</span>;
}
