# Changelog

Every release of Verity, newest first. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/): while Verity is below 1.0, a breaking change gets a new minor version (0.x.0), and everything else, new features included, gets a new patch version (0.x.y). Breaking changes are always listed under **Removed** or marked **Breaking**.

Sites install Verity by tag (for example `github:erinpantz/verity-design-system#v0.3.0`), so a site only changes when it moves to a new tag on purpose.

## [0.4.0] – 2026-11-09

### Added

- **BackLink:** a link back to the page above, with a back arrow and a label, on `color/background/scrim`, with hover and press fills over it like IconButton’s `background="scrim"`. Props: `href` and `label`.
- **Shell:** a `mode` prop, `default` or `focused`, and `backLink` (`href` and `label`) for focused mode. Focused mode has no MainNav: a BackLink floats in the top-left corner (`spacing/md` from the top and `main/padding-inline` from the left, plus the safe area), ThemeToggle stays in the bottom-right, and Main starts lower so the title clears the link. In the tab order: BackLink, ThemeToggle, then Main.
- **Icons:** `back`.
- **Tokens:** `main/padding-top-focused` (72 at every breakpoint), the space above Main in focused mode.

### Changed

- **CaseStudyHeader:** the heading, still the page’s `<h1>`, is now in `display-default`, like Hero’s headline.

### Removed

- **Breaking:** CaseStudyHeader’s `badge` prop. Remove `badge` from every CaseStudyHeader; the header is now the title and the facts.

## [0.3.10] – 2026-11-09

### Changed

- **ThemeToggle:** it floats in the screen’s bottom-right corner at every width, rendered by Shell, `spacing/md` from the edges plus the safe area. It sits above the page’s content and below NavOverlay, and comes right after the nav and before Main in the tab order. It’s always on `color/background/scrim`, with hover and press fills over it like IconButton’s `background="scrim"`, and its tooltip opens above it (`top-end`).
- **MainNav:** ThemeToggle is gone from the side rail and the Small top bar. The rail ends after Resume, and the top bar is the menu button and the logo. NavOverlay follows.
- **Shell:** it renders ThemeToggle in the corner.

No props changed.

## [0.3.9] – 2026-11-09

### Changed

- **Tokens:** both themes’ brand neutrals (`color/brand/neutral/100` to `900`) are about 30% more saturated: the same lightness and hue, with more chroma, so they lean a little further toward each theme’s brand color. The page background, subtle backgrounds, borders, dividers, disabled states, and Storybook’s own interface pick up the new tint. Text contrast stays the same or improves slightly. No props changed.

## [0.3.8] – 2026-11-09

### Added

- **CaseStudyHighlights:** a wide box of images that shows a project at a glance, under a centered heading (“Project highlights” by default, level 3, set with `headingLevel`). It goes in a case study’s Overview Section and is always wide, like a MediaBlock with `width="wide"`. Its MediaBlocks fill the box.
- **Guidelines (Spacing and rhythm):** CaseStudyHighlights joins the Footer as a block that’s always wide.

## [0.3.7] – 2026-11-09

### Added

- **Tokens:** `color/background/transparent-50`, black at 50%.

### Changed

- **Tokens:** `shadow/sm`, `shadow/md`, and `shadow/lg` now take their color from `color/background/transparent-50` instead of `transparent-25`, so every shadow is darker. NavOverlay, the only component with a shadow, changes slightly. No props changed.

## [0.3.6] – 2026-11-09

### Added

- **Tokens:** `shadow/md` (y 4, blur 12) and `shadow/lg` (y 8, blur 24), each with x and spread 0 and a color from `color/background/transparent-25`. No component uses them yet. **Foundations › Motion and effects** shows them after `shadow/sm`.

### Changed

- **Tokens:** `shadow/sm`’s x offset is now 0 (it was 2px), so the shadow falls straight down. NavOverlay, the only component that uses it, changes slightly. No props changed.

## [0.3.5] – 2026-11-09

### Added

- **VerticalStack:** an `xl` gap (`spacing/xl`), for separate blocks that need as much room as Section puts between its blocks. HorizontalStack keeps its gaps.

## [0.3.4] – 2026-11-09

### Changed

- **MediaBlock:** caption text is centered, matching Figma in both widths. The caption block is still centered under the media and no wider than the content column. No props changed.

## [0.3.3] – 2026-11-06

### Added

- **Tokens:** `color/border/divider` (`--verity-color-border-divider`), neutral 800 in each theme, for decorative lines that group items. It’s low contrast on purpose; borders that show a control’s edge still use `color/border/subtle`.

### Changed

- **MainNav:** Resume moves up from the bottom to sit under the pages, below a thin line, because it opens a PDF rather than a page on the site. ThemeToggle is now alone at the bottom. The line is a decorative border, so screen readers don’t announce it. ThemeToggle now sits after the list of links instead of inside it, so screen readers hear a list of four links, and the tab order follows the new visual order. The Small top bar is unchanged, and NavOverlay picks up the new order. No props changed.

## [0.3.2] – 2026-11-06

### Added

- **Image:** a `4:3` aspect ratio, for screenshot boards and slides. Animation and Video keep their three ratios.

## [0.3.1] – 2026-11-06

### Added

- **Button and Link:** an `opensInNewTab` prop, for pages on other sites that people come back from. It adds `target="_blank"` and `rel="noopener noreferrer"`, and screen readers hear “opens in a new tab” after the label, from text that isn’t shown.
- **Footer:** `callToAction.opensInNewTab`, passed to its Button.

### Changed

- **Button docs:** a Button is now also for a call to action that goes to another page, like “Book a call,” and the rule against that is removed. A Button with `href` is a link that looks like a button.

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

[0.4.0]: https://github.com/erinpantz/verity-design-system/compare/v0.3.10...v0.4.0
[0.3.10]: https://github.com/erinpantz/verity-design-system/compare/v0.3.9...v0.3.10
[0.3.9]: https://github.com/erinpantz/verity-design-system/compare/v0.3.8...v0.3.9
[0.3.8]: https://github.com/erinpantz/verity-design-system/compare/v0.3.7...v0.3.8
[0.3.7]: https://github.com/erinpantz/verity-design-system/compare/v0.3.6...v0.3.7
[0.3.6]: https://github.com/erinpantz/verity-design-system/compare/v0.3.5...v0.3.6
[0.3.5]: https://github.com/erinpantz/verity-design-system/compare/v0.3.4...v0.3.5
[0.3.4]: https://github.com/erinpantz/verity-design-system/compare/v0.3.3...v0.3.4
[0.3.3]: https://github.com/erinpantz/verity-design-system/compare/v0.3.2...v0.3.3
[0.3.2]: https://github.com/erinpantz/verity-design-system/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/erinpantz/verity-design-system/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/erinpantz/verity-design-system/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/erinpantz/verity-design-system/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/erinpantz/verity-design-system/releases/tag/v0.1.0
