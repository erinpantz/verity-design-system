# Verity design system

Verity is Erin Tozour's personal design system. Its only consumer is her portfolio site (a separate repo, `erins-portfolio-site`), which uses Verity as a dependency. Storybook in this repo is Verity's documentation. Both repos are portfolio pieces, so clean structure and clear reasoning matter as much as working code.

The Figma source of truth is the **Verity Library** file: https://www.figma.com/design/3Da0PcmwQjC19SKRduBuQD/Verity-Design-System. The rules this code follows live in this repo, in `src/guidelines/` (see Guidelines below).

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

Commands are added here as they're set up.

- `npm run tokens`: build `src/styles/tokens.css` from `tokens/` (run after each Figma export)
- `npm run icons`: build `src/icons/icons.generated.ts` from the SVGs in `icons/` (run after each icon export)
- `npm run storybook`: start Storybook at http://localhost:6006
- `npm run build-storybook`: build the static Storybook site into `storybook-static/`
- `npm run build`: type-check with TypeScript (the library build comes later)
- `npm run lint`: check code with oxlint

## Folder structure

```
tokens/                    token source JSON, exported from Figma
icons/                     icon SVGs, exported from Figma (never edit by hand)
templates/                 starting points for new files, such as ComponentDocs.mdx
src/
  styles/                  generated token CSS and global styles
  icons/                   generated icon markup and the IconName type, from icons/
  foundations/             Storybook pages documenting every token, generated from tokens/,
                           and VerityDocs, the wrapper for MDX docs pages
  components/
    <Category>/<Component>/
      <Component>.tsx
      <Component>.module.css
      <Component>.stories.tsx
      <Component>.mdx        docs page, made from templates/ComponentDocs.mdx
      index.ts
.storybook/
```

Categories match the Figma pages: Actions, Navigation, Layout, Text, Media, Content blocks (folder `ContentBlocks`). Storybook's sidebar uses the same categories.

## Storybook docs

- **Every story and docs page follows the Theme toolbar** (Blue or Red). Stories get it from the decorator in `.storybook/preview.tsx`; docs pages from `.storybook/ThemedDocsContainer.tsx`. Nothing to add per page.
- **MDX docs pages use Verity styles:** wrap the page's content in `<VerityDocs>` from `src/foundations/VerityDocs`, with a blank line inside each tag. It styles headings, paragraphs, lists, and links with tokens and applies the prose spacing rule. See `src/Introduction.mdx`.
- **Every component gets a docs page:** when you build a component, also write `<Component>.mdx` next to its stories, made from `templates/ComponentDocs.mdx`. Follow the instructions at the top of the template, fill every section, and tell Erin which optional sections you left out. `src/components/Media/Icon/Icon.mdx` is a finished example.

## Guidelines

The rules for naming, spacing, and writing live in `src/guidelines/` and appear in Storybook under Guidelines. They're the only copy: the Figma file links to them. Read the matching page before you name, space, or write anything. Each page has an "In code" section for how its rules apply here.

- `src/guidelines/Naming.mdx`: component, prop, variant value, and token names
- `src/guidelines/SpacingAndRhythm.mdx`: who owns each space, gaps instead of margins, prose rhythm, and control sizes
- `src/guidelines/WritingStyle.mdx`: component default text and docs copy

To change a rule, change it on its guideline page, not here. If something in this file seems to disagree with a guideline page, follow the guideline page and tell Erin.

## Tokens

- Never hard-code a color, size, space, radius, or font value. Use a `--verity-` custom property. If a token is missing, stop and ask; don't invent a value.
- **Tiers:** Core Tier 1 holds raw values and is never used directly in components. Tier 2 (themes, `spacing/*`, `padding/*`) is what components normally use. Tier 3 tokens are named after one component (`button/…`, `nav-item/…`, `container/…`).
- **Themes:** Blue and Red, switched with a `data-theme` attribute. Figma's Responsive modes (XL, Large, Medium, Small) become breakpoints.
- **Code text** comes in the same sizes as body text: code inside `body-*` text uses the matching `code-*` tokens (`code-xl`, `code-lg`, `code-default`, `code-sm`).
- **Color** scales use OKLCH. Accents are positional (`accent-one`, `accent-two`, …) because they map to different hues in each theme.

## Accessibility

- Every interactive component needs **default, hover, focus, active, and disabled** states. Focus must be clearly visible (WCAG 2.4.7).
- Use real HTML elements (`<button>`, `<a>`, `<nav>`), meet color-contrast requirements, and give images alt text. Logos use the name as their accessible label.
- Logos and icons are single color and use `currentColor`.
