// Storybook's own theme (its interface and docs blocks), built from Verity tokens.
// Storybook calculates shades from these colors, so they come from
// theme-tokens.generated.ts as final values, not var(). See
// https://storybook.js.org/docs/configure/user-interface/theming

import { create, type ThemeVars } from 'storybook/theming'
import { THEME_TOKENS } from './theme-tokens.generated'

export type VerityThemeName = keyof typeof THEME_TOKENS

const REPO_URL = 'https://github.com/erinpantz/verity-design-system'

export function isVerityThemeName(name: unknown): name is VerityThemeName {
  return typeof name === 'string' && name in THEME_TOKENS
}

// Storybook shows the logo as an image, which can't take the text color
// around it, so currentColor is swapped for the theme's text color.
// `logo` is the SVG as a data URL (how Storybook's interface imports SVG files).
function coloredLogo(logo: string, color: string): string {
  const [meta, data] = logo.split(',', 2)
  const svg = meta.endsWith(';base64') ? atob(data) : decodeURIComponent(data)
  return `data:image/svg+xml,${encodeURIComponent(svg.replaceAll('currentColor', color))}`
}

export function verityTheme(name: VerityThemeName, logo?: string): ThemeVars {
  const token = (path: keyof (typeof THEME_TOKENS)[VerityThemeName]) => THEME_TOKENS[name][path]
  const px = (path: Parameters<typeof token>[0]) => Number.parseFloat(token(path))

  return create({
    base: 'dark',

    brandTitle: 'Verity',
    brandUrl: REPO_URL,
    brandTarget: '_blank',
    brandImage: logo ? coloredLogo(logo, token('color.content.default')) : undefined,

    colorPrimary: token('color.background.brand'),
    colorSecondary: token('link.color.content.default'),

    appBg: token('color.background.default'),
    appContentBg: token('color.background.default'),
    appPreviewBg: token('color.background.default'),
    appHoverBg: token('color.background.subtle'),
    appBorderColor: token('color.border.disabled'),
    appBorderRadius: px('border.radius.md'),

    fontBase: token('typography.font-family.plus-jakarta-sans'),
    fontCode: token('typography.font-family.ibm-plex-mono'),

    textColor: token('color.content.default'),
    textInverseColor: token('color.content.knockout'),
    textMutedColor: token('color.content.subtle'),

    barBg: token('color.background.subtle'),
    barTextColor: token('color.content.subtle'),
    // Light text, not the link color: on the toolbar's subtle background the
    // link color falls below 4.5:1 contrast
    barSelectedColor: token('color.content.default'),
    barHoverColor: token('color.content.default'),

    buttonBg: token('color.background.subtle'),
    buttonBorder: token('color.border.disabled'),
    booleanBg: token('color.background.subtle'),
    booleanSelectedBg: token('color.background.brand'),

    inputBg: token('color.background.default'),
    inputBorder: token('color.border.disabled'),
    inputTextColor: token('color.content.default'),
    inputBorderRadius: px('border.radius.sm'),
  })
}
