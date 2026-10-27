// Gives an MDX docs page Verity's styles instead of Storybook's. Wrap the
// page's content in it, with a blank line inside each tag:
//
//   <VerityDocs>
//
//   # Page title
//
//   </VerityDocs>

import { Unstyled } from '@storybook/addon-docs/blocks';
import type { ReactNode } from 'react';
import styles from './VerityDocs.module.css';

export function VerityDocs({ children }: { children: ReactNode }) {
  return (
    <Unstyled>
      <div className={`${styles.page} ${styles.prose}`}>{children}</div>
    </Unstyled>
  );
}
