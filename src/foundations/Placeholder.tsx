// A plain block that stands in for real content in layout stories, like the
// placeholder blocks in Figma's stacks. For Storybook only: never use it in
// the portfolio site.
//
//   <Placeholder>Item 1</Placeholder>

import type { ReactNode } from 'react';
import styles from './Placeholder.module.css';

export function Placeholder({
  children,
  size = 'md',
}: {
  /** Text inside the block, such as “Item 1” */
  children?: ReactNode;
  /** How much padding the block has, which sets its height */
  size?: 'sm' | 'md' | 'lg';
}) {
  return <div className={`${styles.placeholder} ${styles[size]}`}>{children}</div>;
}
