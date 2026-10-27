// Every Verity token, for the Foundations pages in Storybook.
// Names, tiers, and references come from the Figma export in tokens/.
// Values come from the generated src/styles/tokens.css, so the pages show
// exactly what ships. Both update after a re-export and `npm run tokens`.

import manifest from '../../tokens/manifest.json';
import tokensCss from '../styles/tokens.css?raw';

type Tree = { [key: string]: unknown };

const FILES = import.meta.glob<Tree>('../../tokens/**/*.json', { eager: true, import: 'default' });

export type Kind = 'none' | 'theme' | 'breakpoint';

export type Page = 'color' | 'typography' | 'spacing' | 'borders' | 'breakpoints' | 'motion';

export interface Token {
  path: string;
  cssVar: string;
  type: string;
  // Figma collection. Blue Tier 1 and Red Tier 1 are shown together as "Themes Tier 1".
  collection: string;
  tier: number;
  kind: Kind;
  // The exported value and $extensions for each mode
  modes: Record<string, { value: unknown; extensions?: Tree }>;
}

export interface Cell {
  // Final value from tokens.css, or undefined if tokens.css doesn't define it
  value?: string;
  // The token this one points to, for example "color.brand.blue.700"
  reference?: string;
  // Set when this breakpoint has no value of its own and uses a smaller one's
  sameAs?: string;
}

export interface Group {
  // Shared path, for example "color.brand.blue"
  name: string;
  collection: string;
  tier: number;
  kind: Kind;
  tokens: Token[];
}

const SINGLE = 'Value';

const collections = manifest.collections as unknown as { name: string; modes: Record<string, string> }[];

function file(name: string): Tree {
  const tree = FILES[`../../tokens/${name}`];
  if (!tree) throw new Error(`tokens/${name} is listed in manifest.json but wasn't found`);
  return tree;
}

function modesOf(collection: string): string[] {
  return Object.keys(collections.find((c) => c.name === collection)?.modes ?? {});
}

function walk(tree: Tree, path: string[], visit: (path: string, node: Tree) => void) {
  for (const [key, node] of Object.entries(tree)) {
    if (key.startsWith('$') || !node || typeof node !== 'object') continue;
    if ('$value' in node) visit([...path, key].join('.'), node as Tree);
    else walk(node as Tree, [...path, key], visit);
  }
}

function px(value: unknown): number {
  return Number.parseFloat(String(value));
}

// Themes are the modes of Themes Tier 2. Breakpoints are the modes of
// Responsive Tier 1, smallest first, with their viewport.min-width.
export const THEMES = modesOf('Themes Tier 2');

const minWidths = new Map(
  Object.entries(collections.find((c) => c.name === 'Responsive Tier 1')?.modes ?? {}).map(([mode, name]) => {
    const viewport = file(name).viewport as Tree;
    return [mode, px((viewport['min-width'] as Tree).$value)];
  }),
);

export const BREAKPOINTS = [...minWidths.keys()].sort((a, b) => minWidths.get(a)! - minWidths.get(b)!);

function kindOf(modes: string[]): Kind {
  if (modes.some((m) => THEMES.includes(m))) return 'theme';
  if (modes.some((m) => BREAKPOINTS.includes(m))) return 'breakpoint';
  return 'none';
}

export function columnsFor(kind: Kind): string[] {
  if (kind === 'theme') return THEMES;
  if (kind === 'breakpoint') return BREAKPOINTS;
  return [SINGLE];
}

// Read every token file listed in manifest.json
function readTokens(): Token[] {
  const byKey = new Map<string, Token>();
  for (const { name, modes } of collections) {
    const themeTier1 = /^(.+) Tier 1$/.exec(name);
    const isThemeTier1 = themeTier1 !== null && THEMES.includes(themeTier1[1]);
    const collection = isThemeTier1 ? 'Themes Tier 1' : name;
    const tier = Number(/Tier (\d)/.exec(name)?.[1] ?? 2);
    for (const [mode, fileName] of Object.entries(modes)) {
      const modeName = isThemeTier1 ? themeTier1[1] : mode;
      walk(file(fileName), [], (path, node) => {
        const key = `${collection}|${path}`;
        const token = byKey.get(key) ?? {
          path,
          cssVar: `--verity-${path.replaceAll('.', '-')}`,
          type: String(node.$type),
          collection,
          tier,
          kind: 'none' as Kind,
          modes: {},
        };
        token.modes[modeName] = { value: node.$value, extensions: node.$extensions as Tree | undefined };
        byKey.set(key, token);
      });
    }
  }
  const tokens = [...byKey.values()];
  for (const token of tokens) {
    const modes = Object.keys(token.modes);
    token.kind = kindOf(modes);
    if (token.kind === 'none') token.modes = { [SINGLE]: token.modes[modes[0]] };
  }
  return tokens;
}

export const TOKENS = readTokens();

// Which Foundations page documents each token
export function pageOf(token: Token): Page | undefined {
  const { path, type } = token;
  if (path.startsWith('easing.') || path.startsWith('shadow.')) return 'motion';
  if (path.startsWith('typography.') || path.startsWith('viewport.typography.')) return 'typography';
  if (path.startsWith('viewport.')) return 'breakpoints';
  if (path.startsWith('border.')) return 'borders';
  if (type === 'color') return 'color';
  if (type === 'dimension' || type === 'number') return 'spacing';
  return undefined;
}

const unassigned = TOKENS.filter((t) => !pageOf(t));
if (unassigned.length > 0) {
  console.warn('These tokens have no Foundations page. Add a rule to pageOf in tokenData.ts:', unassigned.map((t) => t.path));
}

// Values, read from tokens.css the way a browser applies it:
// :root and the theme's [data-theme] blocks, plus every media query up to the breakpoint.
interface Rule {
  selectors: string[];
  minWidth: number;
  declarations: [string, string][];
}

function readRules(): Rule[] {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(tokensCss);
  const rules: Rule[] = [];
  const add = (rule: CSSRule, minWidth: number) => {
    if (rule instanceof CSSMediaRule) {
      const width = /min-width:\s*([\d.]+)px/.exec(rule.conditionText);
      for (const child of Array.from(rule.cssRules)) add(child, width ? Number(width[1]) : minWidth);
    } else if (rule instanceof CSSStyleRule) {
      rules.push({
        selectors: rule.selectorText.split(',').map((s) => s.trim()),
        minWidth,
        declarations: Array.from(rule.style)
          .filter((name) => name.startsWith('--'))
          .map((name) => [name, rule.style.getPropertyValue(name).trim()]),
      });
    }
  };
  for (const rule of Array.from(sheet.cssRules)) add(rule, 0);
  return rules;
}

const RULES = readRules();
const contexts = new Map<string, Map<string, string>>();

function declarationsFor(theme: string, breakpoint: string): Map<string, string> {
  const key = `${theme}|${breakpoint}`;
  let declarations = contexts.get(key);
  if (!declarations) {
    declarations = new Map();
    const themeSelector = `[data-theme="${theme.toLowerCase()}"]`;
    const width = minWidths.get(breakpoint) ?? 0;
    for (const rule of RULES) {
      const matches = rule.selectors.some((s) => s === ':root' || s === themeSelector);
      if (matches && rule.minWidth <= width) for (const [name, value] of rule.declarations) declarations.set(name, value);
    }
    contexts.set(key, declarations);
  }
  return declarations;
}

function resolve(value: string, declarations: Map<string, string>, depth = 0): string {
  return value.replace(/var\((--[a-z0-9-]+)\)/g, (match, name: string) => {
    const next = declarations.get(name);
    return next === undefined || depth > 20 ? match : resolve(next, declarations, depth + 1);
  });
}

// Value and reference for one token in one column (Value, a theme, or a breakpoint)
export function cellFor(token: Token, column: string): Cell {
  const theme = token.kind === 'theme' ? column : THEMES[0];
  const breakpoint = token.kind === 'breakpoint' ? column : BREAKPOINTS[0];
  const declarations = declarationsFor(theme, breakpoint);
  const declared = declarations.get(token.cssVar);

  // A breakpoint with no value of its own uses the next smaller one's, like the CSS does
  let mode = column;
  if (token.kind === 'breakpoint' && !token.modes[mode]) {
    const smaller = BREAKPOINTS.slice(0, BREAKPOINTS.indexOf(column)).reverse();
    mode = smaller.find((m) => token.modes[m]) ?? column;
  }
  const source = token.modes[mode];
  const raw = source?.value;
  const alias = source?.extensions?.['com.figma'] as { aliasOf?: string; opacity?: number } | undefined;

  let reference: string | undefined;
  if (typeof raw === 'string' && /^\{.+\}$/.test(raw)) reference = raw.slice(1, -1);
  else if (alias?.aliasOf) {
    reference = alias.opacity === undefined ? alias.aliasOf : `${alias.aliasOf} at ${Math.round(alias.opacity * 100)}% opacity`;
  }

  return {
    value: declared === undefined ? undefined : resolve(declared, declarations),
    reference,
    sameAs: mode !== column ? mode : undefined,
  };
}

// Sort a group's tokens: numbers in order (100, 200…), sizes in order (xs, sm…),
// text style properties in reading order, otherwise single-value dimensions
// by size, otherwise Figma's order.
const SCALE = ['none', 'xxs', 'xs', 'sm', 'default', 'md', 'lg', 'x-lg', 'xl', 'xxl', 'round'];
const TEXT_PROPERTIES = ['font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing', 'text-transform', 'space-before'];

function sortTokens(tokens: Token[]): Token[] {
  const last = (t: Token) => t.path.split('.').at(-1)!;
  if (tokens.every((t) => TEXT_PROPERTIES.includes(last(t)))) {
    return [...tokens].sort((a, b) => TEXT_PROPERTIES.indexOf(last(a)) - TEXT_PROPERTIES.indexOf(last(b)));
  }
  if (tokens.every((t) => /^\d+$/.test(last(t)))) return [...tokens].sort((a, b) => Number(last(a)) - Number(last(b)));
  if (tokens.every((t) => SCALE.includes(last(t)))) return [...tokens].sort((a, b) => SCALE.indexOf(last(a)) - SCALE.indexOf(last(b)));
  if (tokens.every((t) => t.type === 'dimension' && t.kind === 'none')) {
    return [...tokens].sort((a, b) => px(cellFor(a, SINGLE).value) - px(cellFor(b, SINGLE).value));
  }
  return tokens;
}

// Within a tier, shared collections come first, then the ones that change by theme or breakpoint
const KIND_ORDER: Kind[] = ['none', 'theme', 'breakpoint'];

// Tokens for one page, grouped by collection and shared path. Sorted by tier,
// then the group names in `order` (if given), then collection, then Figma's order.
export function groupsFor(page: Page, order: string[] = []): Group[] {
  const rank = (g: Group) => (order.includes(g.name) ? order.indexOf(g.name) : order.length);
  const groups = new Map<string, Group>();
  for (const token of TOKENS.filter((t) => pageOf(t) === page)) {
    const name = token.path.split('.').slice(0, -1).join('.') || token.path;
    const key = `${token.collection}|${name}`;
    const group = groups.get(key) ?? { name, collection: token.collection, tier: token.tier, kind: token.kind, tokens: [] };
    group.tokens.push(token);
    groups.set(key, group);
  }
  return [...groups.values()]
    .map((g) => ({ ...g, tokens: sortTokens(g.tokens) }))
    .sort((a, b) => a.tier - b.tier || rank(a) - rank(b) || KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind));
}
