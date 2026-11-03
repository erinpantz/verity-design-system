// Where the library build starts (vite.lib.config.ts). The tokens and the
// page's base rules come first in dist/styles.css, before every component's
// styles. The exports, and their type files, come from index.ts.
import './styles/global.css';

export * from './index';
