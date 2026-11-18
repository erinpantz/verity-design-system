// Finishes the library's styles after each Vite build (and each rebuild in
// watch mode), so the site gets one real stylesheet and its fonts:
//
// 1. Copies the font files named in src/styles/fonts.css into dist/fonts/:
//    those of the Fontsource packages it imports, and those of its own
//    @font-face rules (Imperfecto, in src/fonts/).
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

// The @font-face rules for every font in fonts.css, with each font file
// copied into fontsDir and its url() pointing there: first the rules of the
// Fontsource packages it imports, then its own @font-face rules
function fontFaces(fontsDir: string) {
  const source = fs.readFileSync(FONTS, 'utf8');
  fs.mkdirSync(fontsDir, { recursive: true });

  // Copies one font file into fontsDir and returns its new url()
  const copied = (file: string) => {
    fs.copyFileSync(file, path.join(fontsDir, path.basename(file)));
    return `url(./fonts/${path.basename(file)})`;
  };

  const imported = [...source.matchAll(/@import\s+'([^']+)'/g)].map((m) => {
    const cssFile = require.resolve(m[1]);
    const css = fs.readFileSync(cssFile, 'utf8');
    return css.replace(/url\((['"]?)\.\/files\/([^'")]+)\1\)/g, (_, _quote, file: string) =>
      copied(path.join(path.dirname(cssFile), 'files', file)),
    );
  });

  // Local rules: their url()s are relative to fonts.css
  const local = [...source.matchAll(/@font-face\s*\{[^}]*\}/g)].map((m) =>
    m[0].replace(/url\((['"]?)([^'")]+)\1\)/g, (_, _quote, file: string) =>
      copied(path.resolve(path.dirname(FONTS), file)),
    ),
  );

  return [...imported, ...local].join('\n');
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
