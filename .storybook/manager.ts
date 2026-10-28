// Storybook's interface (sidebar, toolbar, and addon panel), as opposed to
// the preview where stories and docs render. It uses the Blue theme; the
// Theme menu only switches what's in the preview.

import plexMono from '@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2'
import plusJakartaSans from '@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2'
import { addons } from 'storybook/manager-api'
import logo from '../brand/verity-logo.svg'
import { verityTheme } from './verityTheme'

// The interface can't load CSS files, so the fonts are registered directly,
// under the names the token font stacks use (see FONT_STACKS in build-tokens.ts).
// Latin only: that covers everything the interface shows.
const FONTS: [family: string, file: string, weight: string][] = [
  ['Plus Jakarta Sans Variable', plusJakartaSans, '200 800'],
  ['IBM Plex Mono', plexMono, '400'],
]

for (const [family, file, weight] of FONTS) {
  document.fonts.add(new FontFace(family, `url(${file}) format('woff2')`, { weight }))
}

addons.setConfig({
  theme: verityTheme('blue', logo),
})
