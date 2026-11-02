import { Children, useId, type ReactNode } from 'react';
import styles from './LinkGroup.module.css';

export interface LinkGroupProps {
  /** A word or two that names the group, like “Pages.” It’s also the list’s name for screen readers. */
  label: string;
  /** The Links. Each one becomes an item in the list. */
  children: ReactNode;
}

// A small label above a list of Links, such as a footer group. The list takes
// its name from the label, so screen readers hear “Pages, list, 3 items.”
export function LinkGroup({ label, children }: LinkGroupProps) {
  const labelId = useId();
  return (
    <div className={styles.linkGroup}>
      <span className={styles.label} id={labelId}>
        {label}
      </span>
      <ul className={styles.links} aria-labelledby={labelId}>
        {Children.toArray(children).map((link, index) => (
          <li key={index}>{link}</li>
        ))}
      </ul>
    </div>
  );
}
