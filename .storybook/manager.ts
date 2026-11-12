// Storybook's interface (sidebar, toolbar, and addon panel), as opposed to
// the preview where stories and docs render. It starts in the Blue theme and
// follows the toolbar's Theme menu, so the interface matches the preview.

import plexMono from '@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2'
import plusJakartaSans from '@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2'
import { GLOBALS_UPDATED, SET_GLOBALS } from 'storybook/internal/core-events'
import { addons } from 'storybook/manager-api'
import logo from '../brand/verity-logo.svg'
import { isVerityThemeName, verityTheme } from './verityTheme'

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

// When the Theme menu changes (or a story's ThemeToggle moves it), restyle the
// interface with that theme. SET_GLOBALS is the first value, when a story or
// docs page loads; GLOBALS_UPDATED is every change after that.
addons.register('verity/theme', (api) => {
  const followTheme = ({ globals }: { globals?: Record<string, unknown> }) => {
    const name = globals?.theme
    if (isVerityThemeName(name)) api.setOptions({ theme: verityTheme(name, logo) })
  }
  api.on(SET_GLOBALS, followTheme)
  api.on(GLOBALS_UPDATED, followTheme)
})
