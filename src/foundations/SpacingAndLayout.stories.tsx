import type { Meta, StoryObj } from '@storybook/react-vite';
import { FoundationPage, TokenTiers } from './Foundations';
import styles from './Foundations.module.css';

// Values up to this width get a bar drawn to scale. Wider ones (container
// widths) would overflow their column, and 0 has nothing to draw, so they
// show only the number.
const MAX_BAR_PX = 128;

// Groups in this order; anything else follows in Figma's order
const ORDER = [
  'spacing',
  'padding',
  'main.spacing',
  'control.size',
  'control.padding-x',
  'control',
  'container.constrained',
  'container.wide',
  'container.full-bleed',
  'grid',
  'grid.item-min-width',
];

function bar(value: string) {
  const px = Number.parseFloat(value);
  if (!value.endsWith('px') || !(px > 0 && px <= MAX_BAR_PX)) return null;
  return <div className={styles.bar} style={{ inlineSize: value }} />;
}

const meta = {
  title: 'Foundations/Spacing and layout',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta;

export default meta;

export const SpacingAndLayout: StoryObj = {
  name: 'Spacing and layout',
  render: () => (
    <FoundationPage
      title="Spacing and layout"
      intro="Every spacing, padding, control size, container, and grid token, with its value at each breakpoint."
    >
      <TokenTiers page="spacing" order={ORDER} options={() => ({ preview: bar })} />
    </FoundationPage>
  ),
};
