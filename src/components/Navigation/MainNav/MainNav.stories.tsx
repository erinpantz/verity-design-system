import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { NavContainer } from '../NavContainer';
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
  // On the docs page, each example gets its own short frame, so a full-height
  // nav is the frame's height, not the whole window's
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, height: '32rem' } } },
} satisfies Meta<typeof MainNav>;

export default meta;

type Story = StoryObj<typeof meta>;

// On the page, MainNav sits in NavContainer, which gives it its width for
// each state: expanding or collapsing it with the menu button resizes the
// dock too. Resize the window to see the layout change: a top bar on Small,
// the rail on Medium.
const docked: Decorator = (Story) => (
  <NavContainer>
    <Story />
  </NavContainer>
);

// In NavOverlay: the overlay's width and padding, full height, so
// ThemeToggle sits at the bottom
const overlayFrame: Decorator = (Story) => (
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
);

// Expanded on Large and XL. The menu button collapses it to the rail.
export const Default: Story = {
  decorators: [docked],
};

// Starts as the rail on Large and XL. The menu button expands it.
export const Collapsed: Story = {
  args: { state: 'collapsed' },
  decorators: [docked],
};

// As it is in NavOverlay: expanded at every width, and its menu button closes the menu
export const InOverlay: Story = {
  name: 'In overlay',
  args: { placement: 'overlay', menuOpen: true },
  decorators: [overlayFrame],
};
