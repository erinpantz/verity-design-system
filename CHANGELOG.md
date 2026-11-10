# Changelog

Every release of Verity, newest first. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/): while Verity is below 1.0, a breaking change gets a new minor version (0.x.0), and everything else, new features included, gets a new patch version (0.x.y). Breaking changes are always listed under **Removed** or marked **Breaking**.

Sites install Verity by tag (for example `github:erinpantz/verity-design-system#v0.3.0`), so a site only changes when it moves to a new tag on purpose.

## [0.5.2] – 2026-11-10

### Added

- **Hero:** an optional `media` prop, something beside the text, like a NavCardGroup on Home. The headline, intro, and actions stay one group on the left (at least `hero/text-min-width`, at most the content column) and the media sits to its right, `spacing/lg` apart, vertically centered; when both don’t fit, the media wraps under the text. Without media, Hero looks the same as before.
- **Tokens:** `hero/text-min-width` (560 on XL and Large, 400 on Medium, 200 on Small); `typography/body-xl-mobile/*` (24/32); Core font sizes 72, 80, 88, and 96, and line heights 80, 88, 96, and 104.

### Changed

- **Typography:** `display/default` is 88/96 on desktop (was 100/110) and 48/56 on mobile (was 56/64), the same as `display/sm` there. `body-xl` uses its new mobile set, 24/32, on Medium and Small (desktop stays 32/40), so Hero’s intro is 24px there.
- **NavCard:** on Small, cards are 144 (was 200) with a 64px icon (was 96), so two in a NavCardGroup fit a 320px screen.

## [0.5.1] – 2026-11-10

### Added

- **NavCardGroup:** a row of two or more NavCards, each overlapping the one before it by `nav-card-group/gap` and tilted left, right, left. The last card starts on top. A card that’s hovered (devices with a real pointer) or keyboard-focused comes to the top and stays there: if it’s underneath, it slides out sideways until it clears its neighbor (quickly), comes to the front at that moment, and slides back into place with a slight overshoot, while it straightens, lifts, and grows. With reduce motion on, it simply comes to the front.
- **Tokens:** `nav-card-group/gap` (−24).

### Changed

- **NavCard:** the pair story moved to NavCardGroup, which sets the cards’ tilt. No props changed.

## [0.5.0] – 2026-11-10

### Added

- **NavCard:** a large, square link to one of the site’s pages, with its nav icon above its label, on PortfolioCard’s surface. Props: `page` (`portfolio` or `profile`), `label`, `href`, and `tilt` (`none`, `left`, or `right`). On hover and focus it lifts, grows, straightens, and comes in front, and the icon takes its hover pose and accent colors. Two, tilted each way, make the pair on Home.
- **Icons:** `forward`, the mirror of `back`.
- **Grid:** `itemWidth` `lg` (`grid/item-min-width/lg`) and `xl` (`grid/item-min-width/xl`).
- **Button:** `as="span"`, its look without a link or button, for inside another link: it follows the parent’s hover, focus, and press.
- **Tokens:** shared motion tokens `motion/lift/sm`, `motion/lift/md`, and `motion/scale/hover`; `nav-card/size`, `nav-card/icon-size` (with Core `size/96`), `nav-card/tilt`, and `nav-card/icon/color/accent-brand`; `grid/item-min-width/xl`; and `color/background|content|border/accent-one-hover`.

### Changed

- **Hero:** the intro is `color/content/subtle` on the default and brand backgrounds (knockout keeps one color). Actions are optional: with no `primaryAction`, there’s no actions group and no space for one, as on Home.
- **PortfolioCard:** the Badge is now a label that looks like a secondary Button, with the `forward` arrow, and follows the card’s hover, focus, and press. It’s a span, not a second link. A brand gallery’s thumbnails take the rest of the card, with no maximum width.
- **Button:** the brand primary background is `color/background/accent-one`, and `accent-one-hover` on hover.
- **BackLink and PortfolioCard:** use the shared motion tokens. Nothing looks different.
- **NavItem:** its icon poses and accent colors moved to a shared place, used by NavCard too. Nothing looks or moves differently.
- **PortfolioCard docs:** the Grid example shows two cards to a row, in a wide Grid with `itemWidth="xl"`, so the large headings have room.

### Removed

- **Breaking:** the tokens `back-link/lift-hover`, `portfolio-card/lift-hover`, and `portfolio-card/scale-hover`. Use `motion/lift/sm`, `motion/lift/md`, and `motion/scale/hover`.

## [0.4.8] – 2026-11-10

### Added

- **Tokens:** Core `border/radius/40`.

### Changed

- **Tokens:** every Tier 2 radius is a step larger: `border/radius/xs` 2 (was 1), `sm` 8 (was 4), `md` 16 (was 8), `lg` 32 (was 16), and `x-lg` 40 (was 32). `none` and `round` are unchanged. Every component that uses them is rounder: buttons, cards, images, the nav, and tooltips. At Large and XL a 32px-tall `sm` Button is a full pill and an `sm` IconButton a circle. Storybook’s own interface follows. No props changed.

## [0.4.7] – 2026-11-10

### Added

- **Hero:** a `width` prop, `column` (the default) or `wide`. A wide Hero breaks out of the column to `content/wide-width`, like a wide MediaBlock, so the band can line up with wide content, as on Home. Only the band goes wide.

### Changed

- **Hero:** the headline and intro are one group, never wider than `content/column-width`, so the text keeps a readable measure in a wide Hero. The spacing is now `spacing/sm` between the headline and intro and `spacing/lg` between the text and the actions (it was `spacing/md` between all three). No other props changed.
- **Tokens:** Figma scopes only: `border/radius/*` apply to corner radius and `border/width/*` to stroke width. No CSS changes.

## [0.4.6] – 2026-11-10

### Added

- **Tokens:** `typography/font-weight/800`.

### Changed

- **Typography:** display text is extra bold. `display-default`, `display-default-mobile`, `display-sm`, and `display-sm-mobile` use weight 800 (they were 700), so Hero’s headline, CaseStudyHeader’s title, and PortfolioCard’s heading are heavier. Headings stay at 700. Schibsted Grotesk is a variable font (400 to 900), so it renders a real 800 with no font change. No props changed.

## [0.4.5] – 2026-11-10

### Added

- **Tokens:** `back-link/lift-hover` (`spacing/4`).

### Changed

- **BackLink:** a small shadow at rest. On hover and keyboard focus it lifts by `back-link/lift-hover` with the large shadow, and the focus ring moves with it; pressed, it settles back down with the small shadow. Only the visible surface moves, so the link’s hit area stays put under the pointer. The lift moves over `motion/duration/playful`; hover’s only on devices with a real pointer, and there’s no lift with reduce motion on. No props changed.

## [0.4.4] – 2026-11-10

### Added

- **Tokens:** `portfolio-card/scale-hover` (1.02) and `portfolio-card/lift-hover` (`spacing/8`).

### Changed

- **PortfolioCard:** on hover and keyboard focus, the whole card rises by `portfolio-card/lift-hover` and grows to `portfolio-card/scale-hover`, with the large shadow (it was medium). The focus ring moves and grows with it. Pressed, it settles back down with the small shadow. The lift and growth move over `motion/duration/playful`; hover’s only on devices with a real pointer, and none of it with reduce motion on. No props changed.

## [0.4.3] – 2026-11-09

### Fixed

- **Global styles:** body has no margin, so pages no longer start 8px in from the browser’s edge, and wide content is as wide as in Figma.
- **Shell:** in focused mode, Main’s top space is `main/padding-top-focused` plus its usual `spacing/lg`, as in Figma, so the title sits `spacing/lg` below the BackLink (120 down on XL) instead of right under it. Jumps to a heading stop at the same place.

## [0.4.2] – 2026-11-09

### Added

- **PortfolioCard:** a link to one piece of work, for the Portfolio and Home pages. Two types: `case-study` (one 3:2 `thumbnail`, the `project`, and a “Case study” Badge) and `brand-gallery` (three 1:1 `thumbnails` and a “Brand gallery” Badge). The whole card is one link, named by its heading. It lays itself out by its own width, with the pictures wrapping below the text when there isn’t room, and on hover and focus the pictures zoom (none with reduce motion on).
- **Tokens:** `color/background/brand-active` and `color/border/brand-active`; `grid/item-min-width/lg`; `portfolio-card/text-max-width` and `portfolio-card/image/scale-hover`.

### Changed

- **Tokens:** `color/border/brand` and `color/border/brand-hover` are one step lighter, so each brand border is one step lighter than its fill. No component used them before PortfolioCard.

## [0.4.1] – 2026-11-09

### Changed

- **Typography:** `display/sm` is now 64/72 (48/56 on mobile), between `heading-1` and `display/default`. `display/default` on mobile is now 56/64 (it was 48/56), so Hero’s headline and CaseStudyHeader’s title are larger on Medium and Small. No props changed.

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

[0.5.2]: https://github.com/erinpantz/verity-design-system/compare/v0.5.1...v0.5.2
[0.5.1]: https://github.com/erinpantz/verity-design-system/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.com/erinpantz/verity-design-system/compare/v0.4.8...v0.5.0
[0.4.8]: https://github.com/erinpantz/verity-design-system/compare/v0.4.7...v0.4.8
[0.4.7]: https://github.com/erinpantz/verity-design-system/compare/v0.4.6...v0.4.7
[0.4.6]: https://github.com/erinpantz/verity-design-system/compare/v0.4.5...v0.4.6
[0.4.5]: https://github.com/erinpantz/verity-design-system/compare/v0.4.4...v0.4.5
[0.4.4]: https://github.com/erinpantz/verity-design-system/compare/v0.4.3...v0.4.4
[0.4.3]: https://github.com/erinpantz/verity-design-system/compare/v0.4.2...v0.4.3
[0.4.2]: https://github.com/erinpantz/verity-design-system/compare/v0.4.1...v0.4.2
[0.4.1]: https://github.com/erinpantz/verity-design-system/compare/v0.4.0...v0.4.1
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
