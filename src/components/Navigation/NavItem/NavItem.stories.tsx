import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavItem } from './NavItem';

const meta = {
  title: 'Navigation/NavItem',
  component: NavItem,
  args: {
    icon: 'portfolio',
    label: 'Portfolio',
    href: '#portfolio',
    current: false,
  },
  argTypes: {
    icon: { control: 'inline-radio', options: ['portfolio', 'playground', 'profile', 'resume'] },
    label: { control: 'text' },
    href: { control: 'text' },
    current: { control: 'boolean' },
  },
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

// The states below are held on with the pseudo-states addon. They're story
// globals, so the state doesn't stay on for every story opened afterwards.

export const Hover: Story = {
  globals: { pseudo: { hover: true } },
};

export const Focus: Story = {
  globals: { pseudo: { focusVisible: true } },
};

export const Active: Story = {
  globals: { pseudo: { active: true } },
};

// MainNav's links, in a row, with Portfolio as the current page. Each item
// hugs its contents.
export const InContext: StoryObj = {
  name: 'In context',
  render: () => (
    <nav aria-label="Main">
      <ul
        style={{
          display: 'flex',
          gap: 'var(--verity-main-nav-link-gap)',
          margin: 0,
          padding: 0,
          listStyle: 'none',
        }}
      >
        <li>
          <NavItem icon="portfolio" label="Portfolio" href="#portfolio" current />
        </li>
        <li>
          <NavItem icon="profile" label="Profile" href="#profile" />
        </li>
        <li>
          <NavItem icon="playground" label="Playground" href="#playground" />
        </li>
      </ul>
    </nav>
  ),
};
