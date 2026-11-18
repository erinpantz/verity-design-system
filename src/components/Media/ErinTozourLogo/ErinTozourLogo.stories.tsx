import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { ErinTozourLogo } from './ErinTozourLogo';
import { erinTozourLogoTrigger } from './logoTrigger';

const meta = {
  title: 'Media/ErinTozourLogo',
  component: ErinTozourLogo,
  args: { name: 'full' },
  argTypes: {
    name: { control: 'inline-radio', options: ['full', 'first'] },
  },
} satisfies Meta<typeof ErinTozourLogo>;

export default meta;

type Story = StoryObj<typeof meta>;

// At its size in MainNav: the height comes from the main-nav/logo-height token
const navHeight: Decorator = (Story) => (
  <div style={{ blockSize: 'var(--verity-main-nav-logo-height)', color: 'var(--verity-color-content-default)' }}>
    <Story />
  </div>
);

export const Default: Story = {
  decorators: [navHeight],
};

// Only “Erin,” for narrow spaces, like MainNav's short layout
export const FirstName: Story = {
  name: 'First name',
  args: { name: 'first' },
  decorators: [navHeight],
};

// The two at the same height, one above the other: the letters of “Erin” line up exactly
export const Compared: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--verity-spacing-sm)', justifyItems: 'start' }}>
      <div style={{ blockSize: 'var(--verity-main-nav-logo-height)' }}>
        <ErinTozourLogo />
      </div>
      <div style={{ blockSize: 'var(--verity-main-nav-logo-height)' }}>
        <ErinTozourLogo name="first" />
      </div>
    </div>
  ),
};

// It takes the text color around it, here the brand color
export const InBrandColor: Story = {
  name: 'In brand color',
  decorators: [
    (Story) => (
      <div style={{ blockSize: 'var(--verity-main-nav-logo-height)', color: 'var(--verity-color-content-brand)' }}>
        <Story />
      </div>
    ),
  ],
};

// In a link that opts in to the color cycle, as MainNav's home link does
// (story layout only: a plain link at the nav's logo height). Hover it or
// tab to it: the letters cycle through the theme's accents in a wave, left
// to right, and fade back when the pointer leaves or focus moves on.
const inALink: Decorator = (Story) => (
  <a
    href="#home"
    className={erinTozourLogoTrigger}
    style={{
      display: 'inline-flex',
      blockSize: 'var(--verity-main-nav-logo-height)',
      color: 'var(--verity-color-content-default)',
    }}
  >
    <Story />
  </a>
);

export const InALink: Story = {
  name: 'In a link',
  decorators: [inALink],
};

// The same link, held in its hover state with the pseudo-states addon, so
// the wave runs without a pointer
export const InALinkHovered: Story = {
  name: 'In a link, hovered',
  decorators: [inALink],
  globals: { pseudo: { hover: true } },
};

export const FirstNameInALinkHovered: Story = {
  name: 'First name in a link, hovered',
  args: { name: 'first' },
  decorators: [inALink],
  globals: { pseudo: { hover: true } },
};
