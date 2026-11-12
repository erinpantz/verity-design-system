// The logo's shapes, read once from Figma's export (brand/, never edited by
// hand), and the crops of it that ErinTozourLogo and ErinTozourBadge draw. The
// SVG is loaded as text with Vite's ?raw import. If more logos arrive, Erin
// will decide whether they get a build step like the icons.
import logo from '../../../../brand/erin-tozour-logo.svg?raw';

export interface Glyphs {
  viewBox: string;
  markup: string;
}

// One <path> per shape, left to right: e, r, the i's stem, the i's dot, n,
// then "tozour"
const paths = logo.match(/<path\b[^>]*\/>/g) ?? [];
const height = /\bviewBox="0 0 [\d.]+ ([\d.]+)"/.exec(logo)?.[1] ?? '84';

/** The whole name, “erin tozour” */
export const FULL: Glyphs = {
  viewBox: /\bviewBox="([^"]+)"/.exec(logo)?.[1] ?? '',
  markup: paths.join(''),
};

/**
 * Only “erin”: the first five shapes, cropped at the n's right edge (195.27,
 * read from the n's path). The height stays the logo's, so at the same height
 * the letters are the same size and in the same place as in the full logo.
 */
export const FIRST: Glyphs = {
  viewBox: `0 0 195.27 ${height}`,
  markup: paths.slice(0, 5).join(''),
};

/**
 * The “e” mark: the first shape, cropped to a square around it (the e spans
 * x 0 to 54.76 and y 28 to 82), so it centers in a square icon.
 */
export const MARK: Glyphs = {
  viewBox: '0 27.62 54.76 54.76',
  markup: paths[0] ?? '',
};
