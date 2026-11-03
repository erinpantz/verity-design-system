// The library build: `npm run build` (once) and `npm run build:watch` (on
// every save). Storybook keeps using vite.config.ts.
//
// It bundles src/library.ts (src/index.ts plus the global styles) into
// dist/index.js as an ES module, and its CSS into dist/styles.css
// (build-styles.ts finishes that file and adds the fonts).
// React stays out of the bundle: the site brings its own copy.

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { verityStyles } from './build-styles.ts';

export default defineConfig({
  plugins: [react(), verityStyles()],
  build: {
    lib: {
      entry: 'src/library.ts',
      formats: ['es'],
      fileName: 'index',
      // build-styles.ts turns this into styles.css
      cssFileName: 'verity',
    },
    // `npm run build` clears dist/ first; in watch mode, the type files that
    // tsc writes there must survive each rebuild
    emptyOutDir: false,
    // Readable output: the site's own build minifies it
    minify: false,
    rolldownOptions: {
      // react, react-dom, and their subpaths, like react/jsx-runtime
      external: [/^react(-dom)?(\/.*)?$/],
    },
  },
});
