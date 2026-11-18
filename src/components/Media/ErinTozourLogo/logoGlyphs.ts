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

/** The whole name, “Erin Tozour” */
export const FULL = glyphs(fullFile);

/**
 * Only “Erin”. Its file is exported from the same frame height, with the
 * letters in the same place, so at the same height they match the full
 * logo’s exactly.
 */
export const FIRST = glyphs(firstFile);

/** The mark: an E, in a square, so it centers in a square icon */
export const MARK = glyphs(markFile);
