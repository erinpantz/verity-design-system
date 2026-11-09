import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from '../../Layout/Footer';
import type { FooterProps } from '../../Layout/Footer/Footer';
import FooterStories from '../../Layout/Footer/Footer.stories';
import { Section } from '../../Layout/Section';
import { Shell } from '../../Layout/Shell';
import { Prose } from '../../Text/Prose';
import { ThemeToggle } from './ThemeToggle';

const meta = {
  title: 'Actions/ThemeToggle',
  component: ThemeToggle,
  // At the end of the row, with room above: the tooltip opens above the
  // button and lines up with its right edge, as in the page's corner. Not
  // for the full-page example, which has Shell's corner.
  decorators: [
    (Story, { parameters }) =>
      parameters.layout === 'fullscreen' ? (
        <Story />
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingBlockStart: 'var(--verity-spacing-xl)',
          }}
        >
          <Story />
        </div>
      ),
  ],
} satisfies Meta<typeof ThemeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

// The real thing: hover or tab to it to see the next theme's colors and the
// spin, move away to see it settle, and click to switch the whole page. The
// Theme toolbar follows.
export const Default: Story = {};

// The states below are held on with the pseudo-states addon, so the colors,
// fill, ring, and tooltip show without a pointer. The star doesn't spin here:
// the spin starts from a real hover or focus. They're set as story globals,
// not parameters: with parameters, the addon saves the state as a global
// that stays on for every story opened afterwards.

export const Hover: Story = {
  globals: { pseudo: { hover: true } },
};

export const Focus: Story = {
  globals: { pseudo: { focusVisible: true } },
};

export const Active: Story = {
  globals: { pseudo: { active: true } },
};

// Where it lives: Shell floats it in the screen's bottom-right corner, at
// every width. Scroll the page to see it stay put.
export const InContext: StoryObj = {
  name: 'In context',
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, height: '32rem' } } },
  render: () => (
    <Shell current="portfolio" footer={<Footer {...(FooterStories.args as FooterProps)} />}>
      <Section heading="Portfolio" headingLevel={1}>
        <Prose>
          <p>Case studies from ten years of product design: research, design systems, and shipped work.</p>
        </Prose>
      </Section>
    </Shell>
  ),
};
