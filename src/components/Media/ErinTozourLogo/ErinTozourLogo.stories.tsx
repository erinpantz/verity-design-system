import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { ErinTozourLogo } from './ErinTozourLogo';

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

// Only “erin,” for narrow spaces, like MainNav's short layout
export const FirstName: Story = {
  name: 'First name',
  args: { name: 'first' },
  decorators: [navHeight],
};

// The two at the same height, one above the other: the letters of “erin” line up exactly
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
