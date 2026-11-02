import type { Meta, StoryObj } from '@storybook/react-vite';
import { MainNav } from './MainNav';

const meta = {
  title: 'Navigation/MainNav',
  component: MainNav,
  args: {
    current: 'portfolio',
    state: 'expanded',
    placement: 'page',
    menuOpen: false,
  },
  argTypes: {
    current: { control: 'inline-radio', options: [undefined, 'portfolio', 'playground', 'profile'] },
    state: { control: 'inline-radio', options: ['expanded', 'collapsed'] },
    placement: { control: 'inline-radio', options: ['page', 'overlay'] },
    menuOpen: { control: 'boolean' },
    hrefs: { control: false },
    onMenuOpenChange: { action: 'menu open change' },
  },
  // Full height, at the width of the expanded nav's content, so Resume sits
  // at the bottom as it does on the page. Resize the window to see the
  // layout change: a top bar on Small, the rail on Medium.
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div
        style={{
          boxSizing: 'border-box',
          inlineSize: 'var(--verity-nav-overlay-thickness)',
          blockSize: '100dvh',
          padding: 'var(--verity-nav-overlay-padding)',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MainNav>;

export default meta;

type Story = StoryObj<typeof meta>;

// Expanded on Large and XL. The menu button collapses it to the rail.
export const Default: Story = {};

// Starts as the rail on Large and XL. The menu button expands it.
export const Collapsed: Story = {
  args: { state: 'collapsed' },
};

// As it is in NavOverlay: expanded at every width, and its menu button closes the menu
export const InOverlay: Story = {
  name: 'In overlay',
  args: { placement: 'overlay', menuOpen: true },
};
