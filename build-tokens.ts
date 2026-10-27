// Builds src/styles/tokens.css from the Figma token export in tokens/.
// Run with `npm run tokens`. See tokens/README.md for how the files fit together.

import fs from 'node:fs';
import StyleDictionary from 'style-dictionary';
import type { TransformedToken } from 'style-dictionary/types';

const TOKENS = 'tokens';
const OUTPUT = 'src/styles/tokens.css';

// Font stacks: Figma font name → CSS font-family list.
// Figma uses each font's plain name. Fontsource registers the self-hosted
// variable fonts with "Variable" added, so the stack lists that first, then a
// locally installed copy, then the system sans-serif as a last resort.
// When a font changes in Figma, add or update its line here.
const FONT_STACKS: Record<string, string> = {
  'Plus Jakarta Sans': "'Plus Jakarta Sans Variable', 'Plus Jakarta Sans', sans-serif",
  'Schibsted Grotesk': "'Schibsted Grotesk Variable', 'Schibsted Grotesk', sans-serif",
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
        transforms: ['name/kebab', 'cubicBezier/css', 'verity/font-weight/unitless', 'verity/font-family/stack'],
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

if (missingFonts.size > 0) {
  for (const name of missingFonts) console.error(`No font stack for "${name}". Add it to FONT_STACKS in build-tokens.ts.`);
  process.exit(1);
}

fs.writeFileSync(OUTPUT, `${header}\n\n${sections.join('\n\n')}\n`);
console.log(`Wrote ${OUTPUT}`);
