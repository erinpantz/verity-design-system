import type { ReactNode } from 'react';

/**
 * One paragraph, or several as a list, one per paragraph. A paragraph is
 * text, or inline content: text with a Link, <em>, or <strong> in it.
 * Inline only: the component renders each paragraph's <p> itself, so a
 * paragraph can't hold blocks (paragraphs, lists, or headings). Wrap a
 * paragraph that mixes text and a Link in <>…</>, so it's one paragraph,
 * not a list.
 */
// TypeScript can't tell inline content from blocks (both are ReactNode), so
// "inline only" is a rule for the people writing the content, not a check.
// Hero's intro and ExperienceItem's description both use this type, so they
// can't drift apart.
export type Paragraphs = ReactNode | ReactNode[];
