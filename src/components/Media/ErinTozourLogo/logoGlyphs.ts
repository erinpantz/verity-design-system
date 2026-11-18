// The shapes ErinTozourLogo and ErinTozourBadge draw, read from Figma's
// exports (brand/, never edited by hand): one file each for the full name,
// the first name, and the mark. Each is loaded as text with Vite's ?raw
// import; only its viewBox and its <path> elements are kept. That leaves out
// the content-credentials <metadata> block at the end of each file and, in
// the full logo, the clip-path wrapper (a rectangle the size of the frame,
// which clips nothing). If more logos arrive, Erin will decide whether they
// get a build step like the icons.
import fullFile from '../../../../brand/erin-tozour-logo.svg?raw';
import firstFile from '../../../../brand/erin-tozour-logo-first.svg?raw';
import markFile from '../../../../brand/erin-tozour-mark.svg?raw';

export interface Glyphs {
  viewBox: string;
  markup: string;
}

function glyphs(svg: string): Glyphs {
  return {
    viewBox: /<svg\b[^>]*\bviewBox="([^"]+)"/.exec(svg)?.[1] ?? '',
    markup: (svg.match(/<path\b[^>]*\/>/g) ?? []).join(''),
  };
}

// How far left a letter reaches: the smallest x among its points. Figma
// writes absolute commands only (M, L, C, H, V, Z): every other number of
// M, L, and C is an x, every number of H is, and V has none.
function leftEdge(path: string): number {
  const d = /\bd="([^"]+)"/.exec(path)?.[1] ?? '';
  let command = '';
  let count = 0;
  let left = Infinity;
  for (const token of d.match(/[A-Za-z]|-?\d*\.?\d+(?:e-?\d+)?/g) ?? []) {
    if (/[A-Za-z]/.test(token)) {
      command = token;
      count = 0;
      continue;
    }
    count += 1;
    if (command === 'H' || ('MLC'.includes(command) && count % 2 === 1)) left = Math.min(left, Number(token));
  }
  return left;
}

// A name, with each letter numbered in reading order, left to right
// (--letter: 0 for the first). The files don't list the letters in that
// order, so they're sorted by where each one starts. ErinTozourLogo's color
// cycle reads the number (ErinTozourLogo.module.css).
function letters(svg: string): Glyphs {
  const { viewBox } = glyphs(svg);
  const paths = [...(svg.match(/<path\b[^>]*\/>/g) ?? [])].sort((a, b) => leftEdge(a) - leftEdge(b));
  return {
    viewBox,
    markup: paths.map((path, i) => path.replace('<path', `<path style="--letter: ${i}"`)).join(''),
  };
}

/** The whole name, “Erin Tozour,” 10 letters */
export const FULL = letters(fullFile);

/**
 * Only “Erin,” 4 letters. Its file is exported from the same frame height,
 * with the letters in the same place, so at the same height they match the
 * full logo’s exactly.
 */
export const FIRST = letters(firstFile);

/** The mark: an E, in a square, so it centers in a square icon */
export const MARK = glyphs(markFile);
