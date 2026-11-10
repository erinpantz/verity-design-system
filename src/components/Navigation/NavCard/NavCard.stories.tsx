import type { Meta, StoryObj } from '@storybook/react-vite';
import { HorizontalStack } from '../../Layout/HorizontalStack';
import { NavCard } from './NavCard';

const meta = {
  title: 'Navigation/NavCard',
  component: NavCard,
  args: { page: 'portfolio', label: 'Portfolio', href: '#portfolio', tilt: 'none' },
  argTypes: {
    page: { control: 'inline-radio', options: ['portfolio', 'profile'] },
    label: { control: 'text' },
    href: { control: 'text' },
    tilt: { control: 'inline-radio', options: ['none', 'left', 'right'] },
  },
  // Room around the card for its lift, growth, and shadow
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--verity-spacing-lg)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NavCard>;

export default meta;

type Story = StoryObj<typeof meta>;

// Hover it: it lifts and grows, and the icon moves to its hover pose
export const Default: Story = {};

export const Profile: Story = {
  args: { page: 'profile', label: 'Profile', href: '#profile' },
};

// The states below are held on with the pseudo-states addon. They're story
// globals, not parameters, so the state doesn't stay on for every story
// opened afterwards.

export const Hover: Story = {
  globals: { pseudo: { hover: true } },
};

export const Focus: Story = {
  globals: { pseudo: { focusVisible: true } },
};

export const Active: Story = {
  globals: { pseudo: { active: true } },
};

// Tilted, for a playful pair. Hover to straighten it.
export const TiltLeft: Story = {
  name: 'Tilt left',
  args: { tilt: 'left' },
};

export const TiltRight: Story = {
  name: 'Tilt right',
  args: { page: 'profile', label: 'Profile', href: '#profile', tilt: 'right' },
};

// The pair on Home: one tilted each way, side by side. Hover one: it
// straightens and comes in front of the other.
export const PairOnHome: StoryObj = {
  name: 'Pair on Home',
  render: () => (
    <HorizontalStack>
      <NavCard page="portfolio" label="Portfolio" href="#portfolio" tilt="left" />
      <NavCard page="profile" label="Profile" href="#profile" tilt="right" />
    </HorizontalStack>
  ),
};
