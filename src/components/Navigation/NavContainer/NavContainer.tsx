import type { ReactNode } from 'react';
import styles from './NavContainer.module.css';

export interface NavContainerProps {
  /** The MainNav it docks */
  children: ReactNode;
}

// Docks MainNav to the top of the page on Small and to the left from Medium
// up, at the width for its state. It reads MainNav's state from its
// data-state attribute, so it needs no props of its own. It's all CSS.
export function NavContainer({ children }: NavContainerProps) {
  return <div className={styles.navContainer}>{children}</div>;
}
