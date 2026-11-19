import markFile from '../../../../brand/verity-mark.svg?raw';
import styles from './VerityMark.module.css';

export interface VerityMarkProps {
  /** Its height, from the icon size tokens. Its width follows, so it keeps its proportions. */
  size?: 'sm' | 'md' | 'lg';
}

// The Verity mark, read from Figma's export (brand/verity-mark.svg, never
// edited by hand) as text with Vite's ?raw import, the way ErinTozourLogo
// reads its files (logoGlyphs.ts): only its viewBox and its <path> elements
// are kept, which leaves out the content-credentials <metadata> block. The
// file is read in one place, so the library bundles it once.
function glyphs(svg: string) {
  return {
    viewBox: /<svg\b[^>]*\bviewBox="([^"]+)"/.exec(svg)?.[1] ?? '',
    markup: (svg.match(/<path\b[^>]*\/>/g) ?? []).join(''),
  };
}

const MARK = glyphs(markFile);

// The mark of Verity, the design system: the slanted dot of its i. It's one
// color (currentColor), so it takes the text color around it. It's
// decorative, so it's hidden from screen readers: the text beside it names
// Verity.
export function VerityMark({ size = 'md' }: VerityMarkProps) {
  return (
    <svg
      className={`${styles.mark} ${styles[size]}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={MARK.viewBox}
      fill="none"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: MARK.markup }}
    />
  );
}
