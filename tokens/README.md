# Verity tokens

These files are exported from the **Verity Library** Figma file's variables, in the [W3C Design Tokens](https://www.designtokens.org/) format. Don't edit them by hand: change the variable in Figma, then re-export.

- One file per Figma collection, and one file per mode when a collection has more than one mode.
- Token paths match the Figma variable names, with `/` becoming `.`: `color/content/default` → `color.content.default`, which becomes `--verity-color-content-default` in CSS.
- References keep the Figma aliases: `"$value": "{color.brand.blue.700}"`.
- `$extensions.com.figma.scopes` records where Figma lets a variable be used.
- A few colors in Figma point to another color with added opacity, for example `color.utility.transparent.error-25`. The format can't express that, so the file stores the resulting color, and `$extensions.com.figma` records the source token and opacity.

`manifest.json` lists every collection, its modes, and its files.

## How the files fit together

| Files | Role | Load |
|---|---|---|
| `core-tier-1.json` | Tier 1 primitives: every raw color, size, and type value | Always |
| `styles-tier-2.json` | Accents, utility colors, border widths, and radii | Always |
| `typography-tier-2.json` | Type properties for each text style (desktop and `-mobile` versions) | Always |
| `blue-tier-1.json`, `red-tier-1.json` | Theme primitives: tinted neutrals, brand transparencies, scrim | One, matching the theme |
| `themes-tier-2/{blue,red}.json` | Semantic colors (background, content, border) | One, matching the theme |
| `themes-tier-3/{blue,red}.json` | Component colors (button, link, nav icon) and grid item widths | One, matching the theme |
| `responsive-tier-1/2/3/{xl,large,medium,small}.json` | Viewport sizes, spacing, padding, controls, and component layout values | One, matching the breakpoint |
| `typography-styles-design-only/{large,medium,small}.json` | Picks the desktop or mobile type values for each text style, plus prose space-before | One, matching the breakpoint (XL uses Large) |

**Themes:** Blue and Red. Build one CSS block per theme, for example `[data-theme="blue"]` and `[data-theme="red"]`.

**Breakpoints:** XL, Large, Medium, and Small. `responsive-tier-1/*.json` holds each one's `viewport.min-width` and `viewport.max-width` for the media queries.

**Never use Tier 1 directly in components.** Components use Tier 2 and Tier 3 tokens.
