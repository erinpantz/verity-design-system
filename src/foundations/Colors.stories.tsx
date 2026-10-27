import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo } from 'react';
import blue from '../../tokens/themes-tier-2/blue.json';
import red from '../../tokens/themes-tier-2/red.json';
import styles from './Colors.module.css';

// The Tier 2 theme colors, read from the Figma export so this page stays in sync.

interface Token {
  $value: string;
}

interface Group {
  [key: string]: Group | Token;
}

interface Swatch {
  // Path inside its section, for example "default" or "accent-one-dark"
  name: string;
  cssVar: string;
  // The Tier 1 token it points to in this theme, for example "brand/neutral/900"
  reference: string;
}

const THEMES: Record<string, Group> = {
  blue: blue as unknown as Group,
  red: red as unknown as Group,
};

const SECTIONS = [
  { key: 'background', title: 'Background', outline: false },
  { key: 'content', title: 'Content', outline: false },
  { key: 'border', title: 'Border', outline: true },
];

function isToken(node: Group | Token): node is Token {
  return '$value' in node;
}

function collect(group: Group, path: string[] = []): Swatch[] {
  return Object.entries(group).flatMap(([key, node]) => {
    if (key.startsWith('$')) return [];
    const next = [...path, key];
    if (!isToken(node)) return collect(node, next);
    return [
      {
        name: next.slice(2).join('/'),
        cssVar: `--verity-${next.join('-')}`,
        reference: node.$value.replace(/^\{(color\.)?|\}$/g, '').replaceAll('.', '/'),
      },
    ];
  });
}

function ColorsPage({ theme }: { theme: string }) {
  const swatches = useMemo(() => collect(THEMES[theme] ?? THEMES.blue), [theme]);

  // The final color for each token. The theme decorator has already set
  // data-theme by the time this page renders, so the values match the toolbar.
  const computed = getComputedStyle(document.documentElement);
  const valueOf = (cssVar: string) => computed.getPropertyValue(cssVar).trim();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Colors</h1>
        <p className={styles.intro}>
          The Tier 2 theme colors. Use Theme in the toolbar to switch between Blue and Red.
        </p>
      </header>
      {SECTIONS.map((section) => (
        <section key={section.key} className={styles.section} aria-labelledby={`colors-${section.key}`}>
          <h2 id={`colors-${section.key}`} className={styles.sectionTitle}>
            {section.title}
          </h2>
          <ul className={styles.grid}>
            {swatches
              .filter((s) => s.cssVar.startsWith(`--verity-color-${section.key}-`))
              .map((s) => (
                <li key={s.cssVar} className={styles.swatch}>
                  <div
                    className={section.outline ? styles.outline : styles.chip}
                    style={section.outline ? { borderColor: `var(${s.cssVar})` } : { background: `var(${s.cssVar})` }}
                  />
                  <span className={styles.name}>
                    {section.key}/{s.name}
                  </span>
                  <span className={styles.detail}>{s.cssVar}</span>
                  <span className={styles.detail}>
                    {s.reference} · {valueOf(s.cssVar)}
                  </span>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

const meta = {
  title: 'Foundations/Colors',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
} satisfies Meta;

export default meta;

export const Colors: StoryObj = {
  render: (_args, { globals }) => <ColorsPage theme={globals.theme} />,
};
