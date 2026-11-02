import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErinTozourLogo } from './ErinTozourLogo';

const meta = {
  title: 'Media/ErinTozourLogo',
  component: ErinTozourLogo,
} satisfies Meta<typeof ErinTozourLogo>;

export default meta;

type Story = StoryObj<typeof meta>;

// At its size in MainNav: the height comes from the main-nav/logo-height token
export const Default: Story = {
  render: () => (
    <div style={{ blockSize: 'var(--verity-main-nav-logo-height)', color: 'var(--verity-color-content-default)' }}>
      <ErinTozourLogo />
    </div>
  ),
};

// It takes the text color around it, here the brand color
export const InBrandColor: Story = {
  name: 'In brand color',
  render: () => (
    <div style={{ blockSize: 'var(--verity-main-nav-logo-height)', color: 'var(--verity-color-content-brand)' }}>
      <ErinTozourLogo />
    </div>
  ),
};
