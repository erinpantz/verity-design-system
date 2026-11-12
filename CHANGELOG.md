# Changelog

Every release of Verity, newest first. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/): while Verity is below 1.0, a breaking change gets a new minor version (0.x.0), and everything else, new features included, gets a new patch version (0.x.y). Breaking changes are always listed under **Removed** or marked **Breaking**.

Sites install Verity by tag (for example `github:erinpantz/verity-design-system#v0.3.0`), so a site only changes when it moves to a new tag on purpose.

## [0.8.6] – 2026-11-12

Home’s Hero is now on the default background, with no band, so the Reel’s cards swing out across the page. Cards away from their spot now dim, so they read as further back and never put a bright screenshot behind the headline, and they pass behind the rest of the page instead of over it.

### Added

- **Tokens:** `reel/scrim-opacity` (0.7).
- **Reel:** a scrim on each card, `color/background/default` at an opacity that follows the card’s distance from its spot: none as far as a turn carries a card (13.9° for five, so the dip, the overshoot, and the settle stay bright), rising smoothly to `reel/scrim-opacity` by half the spacing between images (36° for five). No scrim with reduce motion on.
- **Shell:** a Home story: a wide default Hero with a Reel, then the page.

### Changed

- **Tokens:** `reel/angle/dip`, `reel/angle/settle`, and `reel/radius` changed type: they’re plain numbers now (10, 3, 1.7), not dimensions (`10px`, `3px`, `1.7px`). Reel reads them as numbers; the turn is the same.
- **Hero:** on `default`, moving media passes behind the page: a Reel’s cards go behind MainNav, the content after the Hero, the Footer, ThemeToggle, and BackLink, as well as the Hero’s own text. A default Hero has no fill now (the page shows through), and sets `--media-moving-layer`, which Reel reads. On `subtle`, `knockout`, and `brand`, nothing changes: the band clips the cards.
- **Shell:** the page is one layer (`isolation`), so moving media behind it stays above Shell’s background, and the page column clips sideways only (`overflow-x: clip`), so a card past the window’s edge never makes the page scroll sideways.
- **Reel:** the cards never take the pointer, so they never block a click on what they pass behind or over. The pause button, and holding on hover and keyboard focus, work as before.

## [0.8.5] – 2026-11-12

A Hero’s media now sits beside its text in more cases, and a Reel and a photo in a Hero are always the same size.

### Changed

- **Tokens:** `hero/text-min-width` is 460, 460, 300, 200 on XL, Large, Medium, Small (was 560, 560, 400, 200), and `hero/media-width` is 560, 320, 260, 280 (was 560, 480, 400, 320). A wide Hero in Shell now has its media beside the text from 1388px on XL, 1116px on Large, and 768px on Medium; on Small it’s always under the text.
- **Tokens:** `reel/size` points to `hero/media-width` (was 420, 420, 360, 320), so a Reel and a photo in a Hero are always the same size. On Home, the Reel is larger on XL (560, was 420) and smaller on Large and Medium.
- **Tokens:** `typography/body-xl-mobile` line height is 36 (was 32), so body-xl is 24/36 on Medium and Small.
- **Docs:** Hero’s and Reel’s pages give the new sizes, say that `reel/size` follows `hero/media-width`, and list the widths at which the media sits beside the text.

## [0.8.4] – 2026-11-12

In the Profile mockup, the intro reads more easily with more space between its lines.

### Changed

- **Tokens:** `typography/body-xl/line-height` is 40 again (v0.8.3 set it to 36), so body-xl is 28/40 on XL and Large. The mobile size is unchanged at 24/32.

## [0.8.3] – 2026-11-12

On Profile, a photo in the Hero’s media came out at its full size, because nothing told it how wide to be: Hero said how wide its text was, but not its media. The text is also brighter.

### Added

- **Tokens:** `hero/media-width` (560, 480, 400, 320 on XL, Large, Medium, Small).

### Changed

- **Tokens:** body text is now white. `color/content/default` is `color/neutral/white` in both themes (was brand 100), and `color/content/subtle` is brand 200 (was brand 300), so subtle text has more contrast too. `typography/body-xl` is 28/36 on XL and Large (was 32/40); the mobile size is unchanged at 24/32.
- **Hero:** its media is at most `hero/media-width`, and never wider than the Hero. It’s a maximum, not a fixed width: a photo (an `Image`) grows to it and keeps its aspect ratio; a `Reel` keeps its own size, so Home’s Hero doesn’t move. A new story, With a photo, shows a 1:1 Image as the media, and the docs say a photo goes in as an `Image`, not a `MediaBlock`.

## [0.8.2] – 2026-11-12

At 2.5 seconds, someone scanning the page could read the Reel as a still image and move on before it ever turned. Motion gets noticed when it starts, so the Reel now turns once as the page loads, and the holds are a little shorter.

### Added

- **Reel:** an entrance. It opens on its last image at rest (the first paint, from CSS alone, and what shows without JavaScript), then `reel/duration/entrance-delay` after the page loads it does one normal turn to the first image, and the usual holds and turns continue from there. The entrance waits on the same things as any turn: hover, keyboard focus, off screen, or a hidden tab. The last image is now the one that loads right away at high priority. With reduce motion on, there’s no entrance: it opens on the first image and crossfades as before. A new Entrance story replays it, and Slow motion includes it.
- **Tokens:** `reel/duration/entrance-delay` (600ms, Core `duration/600`).

### Changed

- **Tokens:** `reel/duration/hold` is 2000ms (Core `duration/2000`), was 2500ms.

### Removed

- **Tokens:** Core `duration/2500`. Nothing else used it.

## [0.8.1] – 2026-11-12

Home’s Hero says “Product designer with a creative toolkit.” Reel shows it: a View-Master-style reel of design screenshots that turns on its own, in place of the NavCards, which repeated the nav.

### Added

- **Reel,** in Media: square images on a disc, one at a time, `reel/size` square (420, 420, 360, 320) and at most its space. Each holds for `reel/duration/hold`, then the disc turns: a dip, a rise past the spot on `reel/easing/rise` (only up to the curve’s peak), a fall just below it, and a settle, with no pause between them. A pause button (“Pause the reel”) sits in the bottom-right corner, shown only when it’s needed, by the same rule as Animation and Video: hidden while it plays, until hover or keyboard focus; always while paused, and on touch screens. The Reel also holds on hover, on keyboard focus, off screen, and in a hidden tab. With reduce motion on, the images crossfade in place. Props: `images` (at least two) and `label`, the group’s name (“Examples of my design work”). The first image loads right away at high priority; the rest load after the page.
- **Hero:** `background="subtle"`, a quieter band (`color/background/subtle`) with `padding/lg` on every side, and the default background’s button colors and focus ring.
- **Tokens:** Core `duration/260`, `340`, `525`, and `2500`, and eleven `reel/*` tokens: `duration/hold`, `duration/dip`, `duration/rise`, `duration/fall`, `duration/settle`, `easing/rise`, `angle/dip`, `angle/settle`, `tilt`, `radius`, and `size`.

### Changed

- **Hero:** the text is always drawn above the media, on every background, so moving media passes behind it and never covers it. On a visible band (`subtle`, `knockout`, and `brand`), the band clips what moves past its edges, keeping its rounded corners, so a NavCardGroup’s lifted cards are now clipped there too. The media is never wider than the band, and beside the text it sits at the end of the row, against the band’s padding, with any leftover space between the text and the media (it used to collect after the media at Large and XL). Wrapped under the text, it stays at the start. Its With media stories show a Reel on subtle.
- **Animation and Video:** the rule that hides the pause button while playing moved into a shared file, `fadingControl.module.css`, which Reel uses too. Nothing changes in how it looks.

## [0.8.0] – 2026-11-12

The nav moves to the top of the page. The side nav took horizontal room and pulled the eye first; a simple bar across the top lets the page’s content be the focus.

### Breaking

- **NavContainer** is removed: the component, its stories, its docs, and its export. MainNav sits directly in Shell.
- **MainNav:** `state`, `placement`, `menuOpen`, and `onMenuOpenChange` are removed, and so is the `resume` href. MainNav now owns NavOverlay and whether it’s open. A site that passes `resume` in `hrefs` (or checks an hrefs object against `ShellProps['hrefs']` with `resume` in it) needs to keep the resume link’s address somewhere else; the Footer still links to it.
- **NavItem:** `showLabel` is removed, with its tooltip. The label always shows.
- **useBreakpoint** is removed from the exports. Nothing in Verity used it after this change. `BREAKPOINTS` stays.
- **Tokens:** nine are removed: all six `nav-container/*`, `main-nav/group-gap`, `main-nav/site-title-padding`, and `nav-overlay/thickness`.

### Added

- **ErinTozourBadge,** in Media: the “e” mark, the logo’s own first letter, at `icon/size/md` on a round `color/background/brand` badge with `padding/xxs` (40px in all). It’s decorative and hidden from screen readers. NavOverlay shows it opposite the back button.
- **ErinTozourLogo:** `name`, `full` (the default) or `first`, which draws only “erin,” using the full logo’s own shapes, so the two match exactly at the same height. Screen readers hear “Erin Tozour” either way.
- **Tokens:** `main-nav/gap` (`spacing/md`, the least space between the logo and the links), `main-nav/short-logo-width` (620, 620, 544, 544 on XL, Large, Medium, and Small), and `main-nav/menu-width` (484, 484, 440, 440).
- **`npm run tokens`** also writes `src/styles/container-widths.generated.module.css`: a token’s width per breakpoint, for container queries, which can’t read custom properties.

### Changed

- **Tokens:** `main-nav/logo-height` is 32, 32, 24, 24 (was 22 everywhere); `main-nav/logo-offset` is 16, 16, 8, 8; `main-nav/link-gap` points to `spacing/sm`; `nav-overlay/padding` points to `padding/sm`.
- **NavItem:** it hugs its contents, as wide as its icon, gap, and label, instead of filling its parent. Its look, states, and icon animations are unchanged.
- **MainNav:** a bar across the top of the page: the logo, linking home, then Portfolio, Profile, and Playground at the end. Resume isn’t in the nav anymore; it stays in the Footer. It scrolls away with the page. Its own width, not the screen’s, picks one of three layouts: the full logo and the links; “erin” and the links, below `main-nav/short-logo-width`; or the full logo and a menu button, below `main-nav/menu-width`. It’s all CSS, so the first paint is right.
- **NavOverlay:** covers the whole screen and slides in from the right edge over `motion/duration/playful`, and back out the same way, with `shadow-md` and no dimmed backdrop. With reduce motion on, it appears and disappears at once. The header has the back button (“Close menu”) and ErinTozourBadge, then the links in a column. It closes on the back button, Escape, following a link, or when the nav widens past its menu layout; focus moves to the back button when it opens and back to the menu button when it closes.
- **Shell:** one column at every width: MainNav, then Main, then the Footer. The skip link, ThemeToggle in the bottom-right corner, and focused mode are unchanged.
- **Docs:** MainNav, NavItem, NavOverlay, Shell, and ErinTozourLogo describe the top nav, and Spacing and rhythm lists `main-nav/*` and `nav-overlay/*` in place of `nav-container/*`.

## [0.7.5] – 2026-11-12

### Changed

- **BackLink:** no fill on hover or focus: it keeps its scrim and lifts. On the brand-colored page, the hover fill over the scrim came out almost exactly the page’s color, so the surface disappeared. Press keeps its stronger fill.

## [0.7.4] – 2026-11-12

### Changed

- **BackLink:** no shadow in any state. On a button this small, the blurred shadow looked fuzzy; the lift alone shows it responds. The scrim, the hover and press fills, the lift on hover and focus (settling back down on press), the focus ring, and the still hit area are unchanged.

## [0.7.3] – 2026-11-12

### Changed

- **Tokens:** `scrim` is darker in both themes: Blue `#010035bf` (was `#02006abf`), Red `#210000bf` (was `#3c0000bf`), still 75% opacity. The old scrim was the same color as the page’s background, so it vanished behind ThemeToggle, BackLink, and IconButton’s `background="scrim"`.
- **Footer:** the fill is `color/background/subtle` (brand 800, was `brand-dark`, now the page’s own color). On it, the usual link color is below 4.5:1, so the Footer’s links use `color/content/default` at rest and when visited, and `content/default-hover` on hover and press, still underlined. Disabled links and links anywhere else are unchanged.
- **Link:** a parent surface can set its links’ colors with `--background-link`, `--background-link-visited`, `--background-link-hover`, and `--background-link-active`, like Hero sets its buttons’ focus ring. The Footer uses them; there’s no new prop.

## [0.7.2] – 2026-11-12

### Changed

- **PortfolioCard:** a deeper fill at rest, `color/background/brand-active` (was `brand`), and no border in any state. Hover and focus keep `brand-hover`; press keeps `brand-active`, with the card settling back down. A small card still switches to side by side at exactly 640.

## [0.7.1] – 2026-11-12

### Changed

- **Tokens:** the themes use their brand colors instead of the tinted neutrals. `color/background/default`, `subtle`, `knockout`, and `disabled`; `color/content/knockout` and `disabled`; `color/border/knockout` and `divider`; and `skeleton/color/shine` now point to each theme’s brand ramp (blue or red). White is unchanged. The page’s side margins, `main/padding-inline`, are 80, 64, 40, and 24 on XL, Large, Medium, and Small (were 72, 56, 32, and 24). `display-default`’s letter spacing is `minus-1-half` (was `minus-2`).
- **Hero:** on the default background, `padding/lg` on the top and bottom, to give the page’s opening more room, and still none on the sides, so the text lines up with the column. Brand and knockout are unchanged.

## [0.7.0] – 2026-11-11

### Changed

- **PortfolioCard (breaking):** `project` is renamed `company`. The line under a case study’s heading is now the company the work was for, from the case study’s Company fact (“Laguna”), not the project’s name. A site that passes `project` needs to pass `company` instead.

## [0.6.1] – 2026-11-11

### Added

- **VideoEmbed:** a video hosted elsewhere (Vimeo for now), with sound, the provider’s own controls, and full screen. Click to load: at first only a poster and a play button, with no request to Vimeo; pressing play swaps in Vimeo’s player (`autoplay=1&dnt=1`, with autoplay, full screen, picture-in-picture, and encrypted media allowed) in the same box and moves focus into it. The whole poster is one button, named “Play” plus the `title`, with the shared focus ring around it. Props: `provider`, `videoId`, `title`, `poster`, `alt`, and `aspectRatio` (`16:9` by default, like Image). For short, silent clips we host, `Video` is still the one to use.
- **IconButton:** `as="span"`, its look without a button, for inside another button or link, like VideoEmbed’s play button. It follows the parent’s hover, focus, and press, with no tooltip or ring of its own, and is hidden from screen readers.

## [0.6.0] – 2026-11-11

### Added

- **Section:** a `width` prop, `column` (the default, unchanged) or `wide`. With `wide`, the header (heading and intro) starts at the wide edge, lined up with wide blocks, and is still at most `content/column-width` long; blocks keep their own widths. Use it only when the section’s content is wide, like a wide Grid of cards. The rule is also on the Spacing and rhythm guideline.
- **Tokens:** `main/padding-top`, pointing to `main/spacing/section-gap` (72, 72, 64, 56); `portfolio-card/stack-width` (640); Core `font-size/44` and `line-height/52`.

### Changed

- **Shell:** on default pages, the space above Main is `main/padding-top`, the same as the space between sections (was `spacing/lg`). Focused mode is unchanged.
- **Tokens:** the page’s side margins, `main/padding-inline`, are 72, 56, 32, and 24 on XL, Large, Medium, and Small (were 48, 40, 24, and 24). `display/default` and `display/sm` are 44/52 on Medium and Small (were 48/56).
- **Hero:** no padding on the default background, where there’s no visible band, so its text lines up with the blocks around it. Brand and knockout keep `padding/lg`.
- **PortfolioCard:** a small card (`size="sm"`) stacks, picture on top, when it’s narrower than `portfolio-card/stack-width` (640), and puts its picture and text side by side, sharing the width equally, at 640 or wider. It’s measured on the card itself, with no breakpoint and no prop. The large card is unchanged.

### Removed

- **Tokens (breaking):** `portfolio-card/content-min-width`, replaced by `portfolio-card/stack-width`. Nothing in Verity uses it; a site that used `--verity-portfolio-card-content-min-width` directly needs to stop.

## [0.5.3] – 2026-11-11

### Added

- **Grid:** a `fillRows` prop, off by default. On, items still wrap at their `itemWidth` minimum and match heights in a row, but grow to share it, so an item alone on the last row takes the full width: three items go three across, then two plus one, then one.
- **PortfolioCard:** a `size` prop, `lg` (the default, unchanged) or `sm`, for several cards side by side. A small card has `padding/md` and a `title-lg` heading; its picture and text are each at least `portfolio-card/content-min-width`, side by side (picture on the left) when both fit and stacked (picture on top) when not, with no breakpoint. Stretched by a Grid row, its extra height goes above the label, so labels line up.
- **Tokens:** `portfolio-card/content-min-width` (180).

### Changed

- **Tokens:** `grid/item-min-width/md` is 280 (was 300), so three md items fit a 904-wide Grid. `display/default` is 80/88 on desktop (was 88/96), so Hero’s and CaseStudyHeader’s titles are a little smaller on Large and XL; mobile stays 48/56.

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

[0.8.6]: https://github.com/erinpantz/verity-design-system/compare/v0.8.5...v0.8.6
[0.8.5]: https://github.com/erinpantz/verity-design-system/compare/v0.8.4...v0.8.5
[0.8.4]: https://github.com/erinpantz/verity-design-system/compare/v0.8.3...v0.8.4
[0.8.3]: https://github.com/erinpantz/verity-design-system/compare/v0.8.2...v0.8.3
[0.8.2]: https://github.com/erinpantz/verity-design-system/compare/v0.8.1...v0.8.2
[0.8.1]: https://github.com/erinpantz/verity-design-system/compare/v0.8.0...v0.8.1
[0.8.0]: https://github.com/erinpantz/verity-design-system/compare/v0.7.5...v0.8.0
[0.7.5]: https://github.com/erinpantz/verity-design-system/compare/v0.7.4...v0.7.5
[0.7.4]: https://github.com/erinpantz/verity-design-system/compare/v0.7.3...v0.7.4
[0.7.3]: https://github.com/erinpantz/verity-design-system/compare/v0.7.2...v0.7.3
[0.7.2]: https://github.com/erinpantz/verity-design-system/compare/v0.7.1...v0.7.2
[0.7.1]: https://github.com/erinpantz/verity-design-system/compare/v0.7.0...v0.7.1
[0.7.0]: https://github.com/erinpantz/verity-design-system/compare/v0.6.1...v0.7.0
[0.6.1]: https://github.com/erinpantz/verity-design-system/compare/v0.6.0...v0.6.1
[0.6.0]: https://github.com/erinpantz/verity-design-system/compare/v0.5.3...v0.6.0
[0.5.3]: https://github.com/erinpantz/verity-design-system/compare/v0.5.2...v0.5.3
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
