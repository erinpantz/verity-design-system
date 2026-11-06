# Changelog

Every release of Verity, newest first. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/): while Verity is below 1.0, a new minor version (0.x.0) can include breaking changes, and they’re always listed under **Removed** or marked **Breaking**.

Sites install Verity by tag (for example `github:erinpantz/verity-design-system#v0.3.0`), so a site only changes when it moves to a new tag on purpose.

## [0.3.0] – 2026-11-06

### Added

- **Animation:** plays a Lottie file over its poster, using lottie-web’s light build, which loads only when the animation is near the screen. It loops while on screen, with a pause and play button, and starts paused for anyone with “reduce motion” turned on.
- **Video:** the same pattern for short, silent MP4 clips, such as prototype walkthroughs, using the browser’s own player. Animation and Video share one playback control.
- **Icons:** `play` and `pause`.
- **IconButton:** `background="scrim"`, for buttons that sit on top of media.
- **Tooltip and IconButton:** a `top-end` placement: above the button, with their right edges lined up.

### Changed

- **Footer:** it’s now its own block on `color/background/brand-dark`, with no divider, and it’s wide, up to `content/wide-width`. Side by side, the call to action sits at the start and the link groups stay together at the end.
- **MediaBlock:** the caption uses `body-default`, sits `spacing/xs` below the media, and sits in a centered block no wider than the content column, with its text aligned left.

### Removed

- **Breaking:** Image’s and Hero’s `borderRadius` prop. Both are always rounded (`border/radius/md`), since Verity has no edge-to-edge layouts.

### Fixed

- Animation’s button shows on hover anywhere over the animation, not only over the button.
- The skip link shows on keyboard focus in Storybook.

## [0.2.0] – 2026-11-05

### Added

- **One centered content column:** every block in a Section or Container sits in `content/column-width` (880), so all blocks share left and right edges. Shell now owns the page’s side margins (`main/padding-inline`).
- **`width="wide"`** on MediaBlock, Gallery, Grid, VerticalStack, and HorizontalStack, to break out to `content/wide-width` (1824).
- **Grid:** a `gap` prop, `md` (the default) or `lg`, with `lg` for text items like quotes.
- **Tokens:** `spacing/xl`, now the space between a Section’s blocks.
- **Guidelines (Spacing and rhythm):** a heading that introduces a component goes in a TextBlock; a Container holds one thing; blocks fill their slot (in Figma).

### Changed

- **Image:** rounded by default (`borderRadius="md"`).

### Removed

- **Breaking:** the `width` prop on Container, Section, and Footer (`constrained`, `wide`, and `full-bleed`). Width now comes from the content column, and only media and grids can be wide. Full-bleed layouts were removed.

## [0.1.0] – 2026-11-03

The first library release: everything in the Figma library except Animation, with stories and a docs page for each in Storybook.

### Added

- **Tokens** exported from Figma as W3C design tokens and built into CSS custom properties prefixed `--verity-`, with Blue and Red themes, four breakpoints, and generated breakpoint values for page layout.
- **Foundations and guidelines** in Storybook: color, typography, spacing, motion, and the Naming, Spacing and rhythm, and Writing style guidelines.
- **Components:**
  - Actions: Button, IconButton, Link, ThemeToggle, Tooltip
  - Content blocks: CaseStudyHeader, Hero, MediaText, ProblemOpportunityBlock, Quote, StatCard
  - Feedback and status: Badge, Skeleton
  - Layout: Container, Divider, Footer, Grid, HorizontalStack, Shell, VerticalStack
  - Media: ErinTozourLogo, Gallery, Icon, Image, MediaBlock
  - Navigation: LinkGroup, MainNav, NavContainer, NavItem, NavOverlay
  - Text: Heading, MetaItem, Prose, Section, TextBlock, UnorderedList
- **Theme helpers:** `themeScript`, `useTheme`, and `setTheme`, so a site applies the saved theme before the first paint.
- **The library build:** one entry point with every component and its prop types, one stylesheet (`verity-design-system/styles.css`) with the fonts inside it, and `npm run build:watch` for working with a linked copy.

[0.3.0]: https://github.com/erinpantz/verity-design-system/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/erinpantz/verity-design-system/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/erinpantz/verity-design-system/releases/tag/v0.1.0
