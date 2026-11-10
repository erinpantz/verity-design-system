import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavCard } from '../NavCard';
import { NavCardGroup } from './NavCardGroup';

const meta = {
  title: 'Navigation/NavCardGroup',
  component: NavCardGroup,
  argTypes: { children: { control: false } },
  // Room around the group for the raised card, its shadow, and the slide
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--verity-spacing-xl)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NavCardGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

// The pair on Home: Profile is on top. Hover Portfolio: it slides out, comes
// to the front, and slides back, and stays on top after you move away.
export const Default: Story = {
  args: {
    children: [
      <NavCard key="portfolio" page="portfolio" label="Portfolio" href="#portfolio" />,
      <NavCard key="profile" page="profile" label="Profile" href="#profile" />,
    ],
  },
};

// Three cards, tilted left, right, left. A middle card slides away from the
// neighbor that's above it.
export const ThreeCards: Story = {
  name: 'Three cards',
  args: {
    children: [
      <NavCard key="portfolio" page="portfolio" label="Portfolio" href="#portfolio" />,
      <NavCard key="profile" page="profile" label="Profile" href="#profile" />,
      <NavCard key="work" page="portfolio" label="Case studies" href="#case-studies" />,
    ],
  },
};
