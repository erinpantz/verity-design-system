# Verity design system

Verity is Erin Tozour's personal design system. Its only consumer is her portfolio site (a separate repo, `erins-portfolio-site`), which uses Verity as a dependency. Storybook in this repo is Verity's documentation. Both repos are portfolio pieces, so clean structure and clear reasoning matter as much as working code.

The Figma source of truth is the **Verity Library** file: https://www.figma.com/design/3Da0PcmwQjC19SKRduBuQD/Verity-Design-System. Its Guidelines pages (Naming, Spacing and rhythm, Writing style) are the rules this code follows.

## Working with Erin

- Erin is a senior product designer and new to code: she has never written JavaScript or TypeScript. She's learning the end-to-end workflow so she can direct and review AI-built code.
- Before running a command or adding a new kind of file, explain in a sentence or two what it does and why. Define jargon the first time it comes up.
- Ask before installing extra libraries, changing the folder structure, or doing anything hard to undo.
- Commit in small steps with `git commit -m "…"`. Messages are short and start with a verb ("Add Button component", "Fix focus outline").
- After a change, tell her how to see it (for example, which Storybook page to open).

## Stack

- React and **TypeScript**, built with Vite
- **Storybook** for development and documentation
- **CSS Modules** plus CSS custom properties for styling. No Tailwind or CSS-in-JS: every value comes from a Verity token.
- **Style Dictionary** turns token JSON (W3C Design Tokens format) into CSS custom properties

Commands are added here as they're set up (for example, `npm run storybook`).

## Folder structure

```
tokens/                    token source JSON, exported from Figma
src/
  styles/                  generated token CSS and global styles
  components/
    <Category>/<Component>/
      <Component>.tsx
      <Component>.module.css
      <Component>.stories.tsx
      index.ts
.storybook/
```

Categories match the Figma pages: Actions, Navigation, Layout, Text, Media, Content blocks (folder `ContentBlocks`). Storybook's sidebar uses the same categories.

## Naming

- **Component names match Figma exactly,** in PascalCase: `ButtonPrimary`, `MediaBlock`, `NavItem`, `VerityLogo`, `ErinTozourMark`.
- **Figma property → prop:** sentence-case property names become camelCase props (`Show icon` → `showIcon`, `Media position` → `mediaPosition`).
- **Variant values are lowercase,** exactly as in Figma: `size: 'sm' | 'md' | 'lg'`, `state: 'default' | 'hover'`. Sizes use the `xs` / `sm` / `md` / `lg` / `xl` scale.
- **Tokens:** Figma's `color/content/default` becomes `--verity-color-content-default`.
- **Same name, same role:** reuse a name only for the same job (for example, `children` or a `Content` slot for a component's main content).

## Tokens

- Never hard-code a color, size, space, radius, or font value. Use a `--verity-` custom property. If a token is missing, stop and ask; don't invent a value.
- **Tiers:** Core Tier 1 holds raw values and is never used directly in components. Tier 2 (themes, `spacing/*`, `padding/*`) is what components normally use. Tier 3 tokens are named after one component (`button/…`, `nav-item/…`, `container/…`).
- **Themes:** Blue and Red, switched with a `data-theme` attribute. Figma's Responsive modes (XL, Large, Medium, Small) become breakpoints.
- **Color** scales use OKLCH. Accents are positional (`accent-one`, `accent-two`, …) because they map to different hues in each theme.

## Layout and spacing rules

- **No margins on a component's root element.** A component never adds space outside itself.
- **Parents space their children** with `gap` (stacks, grids, sections). No spacer elements.
- **Prose is the exception:** inside a `.prose` wrapper, headings and paragraphs get space-before from `--verity-…-space-before` tokens, and the first child has none.
- **Controls share one size scale** (`control/size/*`). Touch targets are never below 44px on Medium and Small.

## Accessibility

- Every interactive component needs **default, hover, focus, active, and disabled** states. Focus must be clearly visible (WCAG 2.4.7).
- Use real HTML elements (`<button>`, `<a>`, `<nav>`), meet color-contrast requirements, and give images alt text. Logos use the name as their accessible label.
- Logos and icons are single color and use `currentColor`.

## Writing style (component default text and docs)

Sentence case everywhere. Verb-first buttons and links, never "click here". The serial comma; "and", not "&"; curly quotes and apostrophes; en dashes for ranges (2019–2023).
