import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { FoundationPage, TokenTiers, type TableOptions } from './Foundations';
import { cellFor, columnsFor, groupsFor, type Group } from './tokenData';
import styles from './Foundations.module.css';

// Sample text for each text style. Large styles get a short line so it fits;
// smaller styles get a sentence long enough to wrap, to show the line height.
const SHORT_SAMPLE = 'A quiet checkmark beside every decision.';
const LONG_SAMPLE = 'Verity: every decision made once, and kept true everywhere.';
const LARGE_STYLES = /^(display|heading|title|blockquote)/;

// Text style token → CSS property
const PROPERTIES: Record<string, keyof CSSProperties> = {
  'font-family': 'fontFamily',
  'font-size': 'fontSize',
  'font-weight': 'fontWeight',
  'line-height': 'lineHeight',
  'letter-spacing': 'letterSpacing',
  'text-transform': 'textTransform',
};

const lastSegment = (path: string) => path.split('.').at(-1)!;

function isTextStyle(group: Group) {
  return group.tokens.some((t) => lastSegment(t.path) === 'font-size');
}

// A text style's tokens as CSS, for one column (Value or a breakpoint)
function styleFor(group: Group, column: string): CSSProperties {
  const style: Record<string, string> = {};
  for (const token of group.tokens) {
    const property = PROPERTIES[lastSegment(token.path)];
    const value = cellFor(token, column).value;
    if (property && value) style[property] = value;
  }
  return style;
}

function fontSizeOf(group: Group): number {
  const token = group.tokens.find((t) => lastSegment(t.path) === 'font-size');
  return token ? Number.parseFloat(cellFor(token, columnsFor(group.kind).at(-1)!).value ?? '0') : 0;
}

// Tier 1 groups in this order, then text styles from largest to smallest,
// each "-mobile" version right after its desktop style. Responsive styles
// (Typography Styles) come after the base styles they're built from.
function groupOrder(): string[] {
  const textStyles = groupsFor('typography').filter(isTextStyle);
  const desktop = new Map(textStyles.map((g) => [g.name, fontSizeOf(g)]));
  const size = (g: Group) => desktop.get(g.name.replace(/-mobile$/, '')) ?? fontSizeOf(g);
  const responsive = (g: Group) => Number(g.kind === 'breakpoint');
  const mobile = (g: Group) => Number(g.name.endsWith('-mobile'));
  const sorted = [...textStyles].sort((a, b) => responsive(a) - responsive(b) || size(b) - size(a) || mobile(a) - mobile(b));
  return [
    'typography.font-family',
    'typography.font-size',
    'typography.font-weight',
    'typography.line-height',
    'typography.letter-spacing',
    'typography.text-transform',
    ...sorted.map((g) => g.name),
  ];
}

// Previews for Tier 1 primitives
const PRIMITIVE_PREVIEWS: Record<string, (value: string) => CSSProperties> = {
  'typography.font-family': (value) => ({ fontFamily: value }),
  'typography.font-size': (value) => ({ fontSize: value }),
  'typography.font-weight': (value) => ({ fontWeight: value }),
};

function options(group: Group): TableOptions {
  if (isTextStyle(group)) {
    return {
      sample: (g, column) => (
        <p className={styles.sample} style={styleFor(g, column)}>
          {LARGE_STYLES.test(lastSegment(g.name)) ? SHORT_SAMPLE : LONG_SAMPLE}
        </p>
      ),
    };
  }
  const primitive = PRIMITIVE_PREVIEWS[group.name];
  if (primitive) {
    return { preview: (value) => <span className={styles.glyph} style={primitive(value)}>Aa</span> };
  }
  if (group.name === 'typography.letter-spacing') {
    return { preview: (value) => <span className={styles.word} style={{ letterSpacing: value }}>Verity</span> };
  }
  if (group.name === 'typography.text-transform') {
    return { preview: (value) => <span className={styles.word} style={{ textTransform: value as CSSProperties['textTransform'] }}>Verity</span> };
  }
  return {};
}

const meta = {
  title: 'Foundations/Typography',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta;

export default meta;

export const Typography: StoryObj = {
  render: () => (
    <FoundationPage
      title="Typography"
      intro="Every type token, from font primitives to complete text styles, with each style shown at every breakpoint."
    >
      <TokenTiers page="typography" options={options} order={groupOrder()} />
    </FoundationPage>
  ),
};
