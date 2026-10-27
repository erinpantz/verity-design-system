import type { Meta, StoryObj } from '@storybook/react-vite';
import { FoundationPage, TokenTiers, type TableOptions } from './Foundations';
import { BREAKPOINTS, cellFor, TOKENS, type Group } from './tokenData';
import styles from './Foundations.module.css';

const MIN = 'viewport.min-width';
const MAX = 'viewport.max-width';

function width(path: string, breakpoint: string): number {
  const token = TOKENS.find((t) => t.path === path);
  return token ? Number.parseFloat(cellFor(token, breakpoint).value ?? '0') : 0;
}

// Each breakpoint's range as a bar, on one scale from 0 to the largest max width
function range(_group: Group, breakpoint: string) {
  const scale = Math.max(...BREAKPOINTS.map((b) => width(MAX, b)));
  const min = width(MIN, breakpoint);
  const max = width(MAX, breakpoint);
  return (
    <div className={styles.range}>
      <div className={styles.rangeTrack}>
        <div
          className={styles.rangeBar}
          style={{ insetInlineStart: `${(min / scale) * 100}%`, inlineSize: `${((max - min) / scale) * 100}%` }}
        />
      </div>
      <span className={styles.detail}>
        {min}–{max}px
      </span>
    </div>
  );
}

function options(group: Group): TableOptions {
  return group.tokens.some((t) => t.path === MIN) ? { sample: range } : {};
}

const meta = {
  title: 'Foundations/Breakpoints',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta;

export default meta;

export const Breakpoints: StoryObj = {
  render: () => (
    <FoundationPage title="Breakpoints" intro="Each breakpoint and the viewport widths where it starts and ends.">
      <TokenTiers page="breakpoints" options={options} />
    </FoundationPage>
  ),
};
