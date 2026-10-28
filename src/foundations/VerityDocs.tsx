// Gives an MDX docs page Verity's styles instead of Storybook's. Wrap the
// page's content in it, with a blank line inside each tag:
//
//   <VerityDocs>
//
//   # Page title
//
//   </VerityDocs>
//
// The text styles come from the Prose component, so docs pages and long-form
// text on the site look the same. This file adds only what docs pages need on
// top: tables and code blocks.

import { Unstyled } from '@storybook/addon-docs/blocks';
import type { ReactNode } from 'react';
import { Prose } from '../components/Text/Prose';
import styles from './VerityDocs.module.css';

export function VerityDocs({ children }: { children: ReactNode }) {
  return (
    <Unstyled>
      <div className={styles.page}>
        <Prose>{children}</Prose>
      </div>
    </Unstyled>
  );
}
