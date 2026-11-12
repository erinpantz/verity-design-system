// Builds src/styles/tokens.css from the Figma token export in tokens/.
// Run with `npm run tokens`. See tokens/README.md for how the files fit together.

import fs from 'node:fs';
import StyleDictionary from 'style-dictionary';
import type { TransformedToken } from 'style-dictionary/types';

const TOKENS = 'tokens';
const OUTPUT = 'src/styles/tokens.css';
// Final values for Storybook's own theme (see .storybook/verityTheme.ts)
const THEME_OUTPUT = '.storybook/theme-tokens.generated.ts';
// Breakpoint widths, for page-level layout: CSS media queries, and BREAKPOINTS for code
const BREAKPOINTS_CSS_OUTPUT = 'src/styles/breakpoints.generated.module.css';
const BREAKPOINTS_TS_OUTPUT = 'src/styles/breakpoints.generated.ts';
// Widths a component compares its own width to, in container queries
const CONTAINER_WIDTHS_OUTPUT = 'src/styles/container-widths.generated.module.css';
// Which tokens those are. Add a token's path here when a component's
// @container rule needs it.
const CONTAINER_WIDTHS = ['main-nav.short-logo-width', 'main-nav.menu-width'];

// Font stacks: Figma font name → CSS font-family list.
// Figma uses each font's plain name. Fontsource registers the self-hosted
// variable fonts with "Variable" added, so the stack lists that first, then a
// locally installed copy, then a system font as a last resort.
// When a font changes in Figma, add or update its line here.
const FONT_STACKS: Record<string, string> = {
  'Plus Jakarta Sans': "'Plus Jakarta Sans Variable', 'Plus Jakarta Sans', sans-serif",
  'Schibsted Grotesk': "'Schibsted Grotesk Variable', 'Schibsted Grotesk', sans-serif",
  // Fontsource has no variable version of IBM Plex Mono, so there's no "Variable" name to list first
  'IBM Plex Mono': "'IBM Plex Mono', ui-monospace, monospace",
};

// Fonts with no line above. Style Dictionary catches errors thrown inside a
// transform and keeps the raw value, so the build collects them here and
// stops before writing tokens.css.
const missingFonts = new Set<string>();

StyleDictionary.registerTransform({
  name: 'verity/font-family/stack',
  type: 'value',
  filter: (token: TransformedToken) => token.path.includes('font-family'),
  transform: (token: TransformedToken) => {
    const name = String(token.$value ?? token.value);
    const stack = FONT_STACKS[name];
    if (!stack) missingFonts.add(name);
    return stack ?? name;
  },
});

// Figma exports font weights as "600px". CSS needs a plain number.
StyleDictionary.registerTransform({
  name: 'verity/font-weight/unitless',
  type: 'value',
  filter: (token: TransformedToken) => token.path.includes('font-weight'),
  transform: (token: TransformedToken) => String(token.$value ?? token.value).replace(/px$/, ''),
});

// Collections with one mode. Every block can reference these.
const SHARED = ['core-tier-1.json', 'styles-tier-2.json', 'typography-tier-2.json'];

interface Block {
  comment: string;
  selector: string;
  file: string;
  // Files in the same theme or breakpoint that this block can reference
  group: string[];
}

// The same rules for tokens.css and for Storybook's theme values
const TRANSFORMS = ['name/kebab', 'cubicBezier/css', 'verity/font-weight/unitless', 'verity/font-family/stack'];

// Builds one collection file into a CSS block, keeping references as var().
async function buildBlock({ comment, selector, file, group }: Block): Promise<string> {
  const sd = new StyleDictionary({
    usesDtcg: true,
    include: [...SHARED, ...group].filter((f) => f !== file).map((f) => `${TOKENS}/${f}`),
    source: [`${TOKENS}/${file}`],
    log: { verbosity: 'silent', warnings: 'disabled' },
    platforms: {
      css: {
        prefix: 'verity',
        transforms: TRANSFORMS,
        files: [
          {
            destination: 'unused.css',
            format: 'css/variables',
            filter: (token: TransformedToken) => token.isSource === true,
            options: { selector, outputReferences: true, showFileHeader: false },
          },
        ],
      },
    },
  });
  const [{ output }] = await sd.formatPlatform('css');
  return `/* ${comment} */\n${String(output).trim()}`;
}

// Every token in these files with its final value (no var()), keyed by its
// path, for example "color.background.default": "#081431"
async function resolvedValues(files: string[]): Promise<Record<string, string>> {
  const sd = new StyleDictionary({
    usesDtcg: true,
    source: files.map((f) => `${TOKENS}/${f}`),
    log: { verbosity: 'silent', warnings: 'disabled' },
    platforms: { css: { transforms: TRANSFORMS } },
  });
  const { allTokens } = await sd.getPlatformTokens('css');
  return Object.fromEntries(allTokens.map((token) => [token.path.join('.'), String(token.$value ?? token.value)]));
}

function indent(css: string): string {
  return css.replace(/^(?=.)/gm, '  ');
}

function minWidth(breakpoint: string): string {
  const json = JSON.parse(fs.readFileSync(`${TOKENS}/responsive-tier-1/${breakpoint}.json`, 'utf8'));
  return json.viewport['min-width'].$value;
}

const sections: string[] = [];

// Shared tokens
for (const [file, name] of [
  ['core-tier-1.json', 'Core Tier 1'],
  ['styles-tier-2.json', 'Styles Tier 2'],
  ['typography-tier-2.json', 'Typography Tier 2'],
]) {
  sections.push(await buildBlock({ comment: name, selector: ':root', file, group: [] }));
}

// Themes. Blue is also the default on :root. Red comes later, so it wins when both match.
for (const [theme, name, selector] of [
  ['blue', 'Blue', ':root,\n[data-theme="blue"]'],
  ['red', 'Red', '[data-theme="red"]'],
]) {
  const group = [`${theme}-tier-1.json`, `themes-tier-2/${theme}.json`, `themes-tier-3/${theme}.json`];
  const collections = [`${name} Tier 1`, 'Themes Tier 2', 'Themes Tier 3'];
  for (const [i, file] of group.entries()) {
    sections.push(await buildBlock({ comment: `${name} theme: ${collections[i]}`, selector, file, group }));
  }
}

// Breakpoints, mobile first. Small is the default; each larger breakpoint
// starts at its viewport.min-width. XL has no typography file, so it keeps Large's.
for (const [breakpoint, name, typography] of [
  ['small', 'Small', 'small'],
  ['medium', 'Medium', 'medium'],
  ['large', 'Large', 'large'],
  ['xl', 'XL', null],
] as const) {
  const group = [
    `responsive-tier-1/${breakpoint}.json`,
    `responsive-tier-2/${breakpoint}.json`,
    `responsive-tier-3/${breakpoint}.json`,
    ...(typography ? [`typography-styles-design-only/${typography}.json`] : []),
  ];
  const collections = ['Responsive Tier 1', 'Responsive Tier 2', 'Responsive Tier 3', 'Typography Styles'];
  const blocks: string[] = [];
  for (const [i, file] of group.entries()) {
    blocks.push(await buildBlock({ comment: `${name}: ${collections[i]}`, selector: ':root', file, group }));
  }
  const css = blocks.join('\n\n');
  sections.push(
    breakpoint === 'small'
      ? css
      : `/* ${name} and up */\n@media (min-width: ${minWidth(breakpoint)}) {\n${indent(css)}\n}`,
  );
}

const header = `/**
 * Verity design tokens
 * Generated by build-tokens.ts from tokens/. Don't edit by hand: change the
 * variable in Figma, re-export, and run \`npm run tokens\`.
 */`;

// Storybook's theme needs final values, because it calculates shades from
// them. Shared tokens plus each theme's own; Storybook's interface doesn't
// change by breakpoint, so the responsive collections are left out.
const themeValues: Record<string, Record<string, string>> = {};
for (const theme of ['blue', 'red']) {
  themeValues[theme] = await resolvedValues([
    ...SHARED,
    `${theme}-tier-1.json`,
    `themes-tier-2/${theme}.json`,
    `themes-tier-3/${theme}.json`,
  ]);
}

if (missingFonts.size > 0) {
  for (const name of missingFonts) console.error(`No font stack for "${name}". Add it to FONT_STACKS in build-tokens.ts.`);
  process.exit(1);
}

fs.writeFileSync(OUTPUT, `${header}\n\n${sections.join('\n\n')}\n`);
console.log(`Wrote ${OUTPUT}`);

const themeHeader = `// Verity token values for Storybook's theme
// Generated by build-tokens.ts from tokens/. Don't edit by hand: change the
// variable in Figma, re-export, and run \`npm run tokens\`.
// Final values (hex colors and pixels), not var(), because Storybook calculates
// shades from them.`;

fs.writeFileSync(
  THEME_OUTPUT,
  `${themeHeader}\n\nexport const THEME_TOKENS = ${JSON.stringify(themeValues, null, 2)} as const;\n`,
);
console.log(`Wrote ${THEME_OUTPUT}`);

// Breakpoints, from each breakpoint's viewport/min-width token. Media queries
// can't read CSS custom properties, so the values are written out here.
// Small has no entry: it's the default, below Medium.
const breakpoints = { medium: minWidth('medium'), large: minWidth('large'), xl: minWidth('xl') };

const breakpointsHeader = `Verity breakpoints
Generated by build-tokens.ts from the viewport/min-width tokens. Don't edit by
hand: change the variable in Figma, re-export, and run \`npm run tokens\`.`;

// For CSS Modules: import a name with
// @value medium from '…/breakpoints.generated.module.css';
// then write @media medium { … }
fs.writeFileSync(
  BREAKPOINTS_CSS_OUTPUT,
  `/* ${breakpointsHeader.replace(/\n/g, '\n   ')}\n\n   Only page-level layout uses these (see CLAUDE.md). Import a name with
   @value medium from '…/breakpoints.generated.module.css';
   then write @media medium { … }. */\n\n${Object.entries(breakpoints)
    .map(([name, width]) => `@value ${name}: (min-width: ${width});`)
    .join('\n')}\n`,
);
console.log(`Wrote ${BREAKPOINTS_CSS_OUTPUT}`);

// For code: each breakpoint's min-width in pixels
fs.writeFileSync(
  BREAKPOINTS_TS_OUTPUT,
  `${breakpointsHeader.replace(/^/gm, '// ')}\n\nexport const BREAKPOINTS = ${JSON.stringify(
    Object.fromEntries(Object.entries(breakpoints).map(([name, width]) => [name, parseFloat(width)])),
    null,
    2,
  )} as const;\n`,
);
console.log(`Wrote ${BREAKPOINTS_TS_OUTPUT}`);

// Container widths, from each breakpoint's Responsive Tier 3 values. Like
// media queries, container queries can't read CSS custom properties, so each
// value is written out once per breakpoint, named after its token and the
// breakpoint: main-nav/menu-width on Small is mainNavMenuWidthSmall. A
// component picks the one for the screen's breakpoint by putting its
// @container rule inside the matching @media rule.
const camel = (text: string) => text.replace(/[-.]([a-z])/g, (_, letter: string) => letter.toUpperCase());
const containerWidths: string[] = [];
for (const [breakpoint, name] of [
  ['small', 'Small'],
  ['medium', 'Medium'],
  ['large', 'Large'],
  ['xl', 'XL'],
] as const) {
  const values = await resolvedValues([
    'core-tier-1.json',
    `responsive-tier-1/${breakpoint}.json`,
    `responsive-tier-2/${breakpoint}.json`,
    `responsive-tier-3/${breakpoint}.json`,
  ]);
  for (const path of CONTAINER_WIDTHS) {
    const value = values[path];
    if (!value) {
      console.error(`No token ${path} on ${name}. Fix CONTAINER_WIDTHS in build-tokens.ts.`);
      process.exit(1);
    }
    containerWidths.push(`@value ${camel(path)}${name}: ${value};`);
  }
}

fs.writeFileSync(
  CONTAINER_WIDTHS_OUTPUT,
  `/* Verity container widths
   Generated by build-tokens.ts from the Responsive Tier 3 tokens listed in
   CONTAINER_WIDTHS. Don't edit by hand: change the variable in Figma,
   re-export, and run \`npm run tokens\`.

   For a component that changes layout at its own width. Import the names for
   each breakpoint, then put each @container rule inside that breakpoint's
   @media rule:
   @value mainNavMenuWidthSmall from '…/container-widths.generated.module.css';
   @media not medium { @container main-nav (width < mainNavMenuWidthSmall) { … } } */

${containerWidths.join('\n')}
`,
);
console.log(`Wrote ${CONTAINER_WIDTHS_OUTPUT}`);
