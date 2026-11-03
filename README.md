# Verity

Verity is Erin Tozour’s personal design system. It powers her portfolio site and documents itself in Storybook.

The design source of truth is the [Verity Library in Figma](https://www.figma.com/design/3Da0PcmwQjC19SKRduBuQD/Verity-Design-System). This repo turns that library into React components, styled with CSS Modules and design tokens.

## Stack

- React and TypeScript, built with Vite
- Storybook for development and documentation
- CSS Modules and CSS custom properties, generated from design tokens with Style Dictionary

## Using Verity in a project

Verity is a React library. A project gets its components, tokens, and fonts from one package, and its styles from one stylesheet.

### Install

Install a tagged version from GitHub. React 19 is a peer dependency: the project brings its own copy, and Verity uses it.

```sh
npm install github:erinpantz/verity-design-system#v0.1.0 react react-dom
```

npm builds the library while it installs (the `prepare` script), so nothing else needs to run. To update, change the tag and install again.

### Import the styles once

```ts
import 'verity-design-system/styles.css';
```

It’s a real CSS file, not CSS added by JavaScript, so the project’s build turns it into a `<link>` in the page’s HTML and styles load before any JavaScript runs. It holds the fonts’ `@font-face` rules, the tokens, the page’s base text style, and every component’s styles. The font files ship inside Verity (`dist/fonts/`), and the project’s build copies them into the site, so nothing loads from another server.

Verity doesn’t color the page itself. `Shell` gives its area the theme’s background; a page without Shell sets `background: var(--verity-color-background-default)` and `color: var(--verity-color-content-default)` on its `<body>`.

### Use the components

```tsx
import { Button, Heading, ThemeToggle } from 'verity-design-system';

<Heading level={1}>Portfolio</Heading>
<Button>Book a call</Button>
```

Every component’s props come with it, so the editor shows the same props as Storybook.

### Themes

The theme is the `data-theme` attribute on `<html>`:

- **Blue** is the default, with nothing to set.
- **Red** as a project’s default: write `<html data-theme="red">` in the page template.
- **The visitor’s choice:** `ThemeToggle` (already in `MainNav`) switches the theme and saves it in localStorage under `verity-theme`.

To apply a saved choice before the page is painted, so a Red visitor never sees a flash of Blue, put `themeScript` inline as the first thing in `<head>`. It has to be inline, in the HTML: a separate script file would load too late. In plain HTML:

```html
<head>
  <meta charset="utf-8" />
  <script>(function(){try{var t=localStorage.getItem("verity-theme");if(t==="blue"||t==="red")document.documentElement.dataset.theme=t}catch(e){}})();</script>
  …
</head>
```

That’s the text of `themeScript`. When the HTML comes from a template or a pre-rendering step, insert `themeScript` itself (`import { themeScript } from 'verity-design-system'`) instead of copying it, so it stays in step with Verity. In a React template, that’s `<script dangerouslySetInnerHTML={{ __html: themeScript }} />`.

`useTheme()` gives the current theme, and `setTheme()` switches it, if a project ever needs them outside ThemeToggle.

### Breakpoints

Page-level layout uses media queries with Verity’s breakpoints only. In a CSS Modules file (its name ends in `.module.css`):

```css
@value medium from 'verity-design-system/breakpoints.module.css';

@media medium {
  .page { … }
}
```

For behavior, use `useBreakpoint()`, or `BREAKPOINTS` for the widths in pixels.

### Developing Verity and a site together

While both are changing, the site can use this folder directly instead of a GitHub version:

1. **Link it.** In the site: `npm install ../verity-design-system` (the path to this folder). npm adds a link to the folder instead of a copy.
2. **Use one React.** The linked folder has its own React for Storybook, and two copies of React break components. In the site’s `vite.config.ts`, add `resolve: { dedupe: ['react', 'react-dom'] }`.
3. **Run two terminals.** In Verity: `npm run build:watch`, which rebuilds `dist/` on every save. In the site: its dev server (`npm run dev`), which reloads when `dist/` changes.
4. **Switch back** to a tagged version before deploying the site: `npm install github:erinpantz/verity-design-system#v0.1.0`.

### Releasing a version

1. **Update the version** in `package.json`, for example `0.2.0`, and commit it.
2. **Tag it:** `git tag v0.2.0`, then `git push origin v0.2.0` along with the commits.
3. **Update the site** to the new tag.
