// Finishes the library's styles after each Vite build (and each rebuild in
// watch mode), so the site gets one real stylesheet and its fonts:
//
// 1. Copies the font files named in src/styles/fonts.css into dist/fonts/.
// 2. Writes dist/styles.css: the fonts' @font-face rules (pointing to
//    ./fonts/…), then Vite's CSS (the tokens, the base rules, and every
//    component's CSS Modules).
// 3. Copies the generated breakpoints to dist/breakpoints.module.css, for the
//    site's media queries.
//
// Vite isn't given the fonts itself: in a library build it would turn each
// font file into text inside the CSS, several megabytes of it.

import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import type { Plugin } from 'vite';

const FONTS = 'src/styles/fonts.css';
const BREAKPOINTS = 'src/styles/breakpoints.generated.module.css';
const require = createRequire(import.meta.url);

// The @font-face rules for every font fonts.css imports, with each font file
// copied into fontsDir and its url() pointing there
function fontFaces(fontsDir: string) {
  const imports = [...fs.readFileSync(FONTS, 'utf8').matchAll(/@import\s+'([^']+)'/g)].map((m) => m[1]);
  fs.mkdirSync(fontsDir, { recursive: true });
  return imports
    .map((specifier) => {
      const cssFile = require.resolve(specifier);
      const css = fs.readFileSync(cssFile, 'utf8');
      return css.replace(/url\((['"]?)\.\/files\/([^'")]+)\1\)/g, (_, _quote, file: string) => {
        fs.copyFileSync(path.join(path.dirname(cssFile), 'files', file), path.join(fontsDir, file));
        return `url(./fonts/${file})`;
      });
    })
    .join('\n');
}

export function verityStyles(): Plugin {
  return {
    name: 'verity-styles',
    writeBundle(options) {
      const outDir = options.dir ?? 'dist';
      const built = path.join(outDir, 'verity.css');
      if (!fs.existsSync(built)) return;
      const styles = `/* Verity's styles. Import once: import 'verity-design-system/styles.css' */\n\n${fontFaces(path.join(outDir, 'fonts'))}\n${fs.readFileSync(built, 'utf8')}`;
      fs.writeFileSync(path.join(outDir, 'styles.css'), styles);
      fs.rmSync(built);
      fs.copyFileSync(BREAKPOINTS, path.join(outDir, 'breakpoints.module.css'));
    },
  };
}
