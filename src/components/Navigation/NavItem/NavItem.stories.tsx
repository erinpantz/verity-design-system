import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { NavItem } from './NavItem';

const meta = {
  title: 'Navigation/NavItem',
  component: NavItem,
  args: {
    icon: 'portfolio',
    label: 'Portfolio',
    href: '#portfolio',
    current: false,
    showLabel: true,
  },
  argTypes: {
    icon: { control: 'inline-radio', options: ['portfolio', 'playground', 'profile', 'resume'] },
    label: { control: 'text' },
    href: { control: 'text' },
    current: { control: 'boolean' },
    showLabel: { control: 'boolean' },
  },
  // As wide as the links in the full menu, so the item fills it as it does there
  decorators: [
    (Story) => (
      <div style={{ inlineSize: 'calc(var(--verity-nav-overlay-thickness) - 2 * var(--verity-nav-overlay-padding))' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NavItem>;

export default meta;

type Story = StoryObj<typeof meta>;

// No icon is the default, so there's one story per icon. Hover each to see it move.
export const Portfolio: Story = {};

export const Playground: Story = {
  args: { icon: 'playground', label: 'Playground', href: '#playground' },
};

export const Profile: Story = {
  args: { icon: 'profile', label: 'Profile', href: '#profile' },
};

// Links to the PDF, which opens in the browser
export const Resume: Story = {
  args: { icon: 'resume', label: 'Resume', href: '#resume.pdf' },
};

export const Current: Story = {
  args: { current: true },
};

// The collapsed rail's version: hover or focus it to see the label in a tooltip
const rail: Decorator = (Story) => (
  <div style={{ inlineSize: 'var(--verity-control-size-md)' }}>
    <Story />
  </div>
);

export const WithoutLabel: Story = {
  name: 'Without label',
  args: { showLabel: false },
  decorators: [rail],
};

// The nav's links, with Portfolio as the current page
export const InContext: StoryObj = {
  name: 'In context',
  render: () => (
    <nav aria-label="Main" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--verity-main-nav-link-gap)' }}>
      <NavItem icon="portfolio" label="Portfolio" href="#portfolio" current />
      <NavItem icon="playground" label="Playground" href="#playground" />
      <NavItem icon="profile" label="Profile" href="#profile" />
      <NavItem icon="resume" label="Resume" href="#resume.pdf" />
    </nav>
  ),
};
