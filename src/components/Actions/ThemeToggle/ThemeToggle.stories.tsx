import type { Meta, StoryObj } from '@storybook/react-vite';
import { MainNav } from '../../Navigation/MainNav';
import { NavContainer } from '../../Navigation/NavContainer';
import { ThemeToggle } from './ThemeToggle';

const meta = {
  title: 'Actions/ThemeToggle',
  component: ThemeToggle,
} satisfies Meta<typeof ThemeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

// The real thing: hover or tab to it to see the next theme's colors and the
// spin, move away to see it settle, and click to switch the whole page. The
// Theme toolbar follows.
export const Default: Story = {};

// The states below are held on with the pseudo-states addon, so the colors,
// fill, ring, and tooltip show without a pointer. The star doesn't spin here:
// the spin starts from a real hover or focus.

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
};

export const Focus: Story = {
  parameters: { pseudo: { focusVisible: true } },
};

export const Active: Story = {
  parameters: { pseudo: { active: true } },
};

// In MainNav's rail, above Resume. Resize the window to Small to see it at
// the right end of the top bar, where its tooltip opens below.
export const InContext: StoryObj = {
  name: 'In context',
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, height: '32rem' } } },
  render: () => (
    <NavContainer>
      <MainNav state="collapsed" current="portfolio" />
    </NavContainer>
  ),
};
