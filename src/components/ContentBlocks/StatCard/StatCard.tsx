import styles from './StatCard.module.css';

type Accent = 'accent-one' | 'accent-two' | 'accent-three' | 'accent-four' | 'accent-five' | 'accent-six';

export interface StatCardProps {
  /**
   * How the card looks. `outlined` and `outlined-accent-*` have a border and
   * no fill; `brand` and `accent-*` are filled.
   */
  style?: 'outlined' | `outlined-${Accent}` | 'brand' | Accent;
  /** The number, written as it should read, such as “99%” or “3×” */
  value: string;
  /** What the number means, as a short phrase or sentence */
  description: string;
}

// One number and what it means, such as a result in a case study. The number
// is large, like a heading, but it isn't one: it's part of the card's text.
export function StatCard({ style = 'outlined', value, description }: StatCardProps) {
  return (
    <div className={`${styles.statCard} ${styles[style]}`}>
      <p className={styles.value}>{value}</p>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
