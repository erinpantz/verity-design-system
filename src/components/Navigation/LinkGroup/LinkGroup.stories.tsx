import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from '../../Actions/Link';
import { HorizontalStack } from '../../Layout/HorizontalStack';
import { LinkGroup } from './LinkGroup';

const meta = {
  title: 'Navigation/LinkGroup',
  component: LinkGroup,
  args: {
    label: 'Pages',
    children: [
      <Link key="portfolio" href="#portfolio">Portfolio</Link>,
      <Link key="playground" href="#playground">Playground</Link>,
      <Link key="profile" href="#profile">Profile</Link>,
    ],
  },
  argTypes: {
    label: { control: 'text' },
    children: { control: false },
  },
} satisfies Meta<typeof LinkGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// A Link that isn't ready yet, with its tooltip, sits in a group like any other
export const WithDisabledLink: Story = {
  name: 'With disabled link',
  args: {
    label: 'Fun stuff',
    children: [
      <Link key="playground" href="#playground">Playground</Link>,
      <Link key="reading" disabled tooltip="Coming soon">Reading list</Link>,
    ],
  },
};

// The footer's groups, side by side. The space between them comes from the row, not the groups.
export const InContext: StoryObj = {
  name: 'In context',
  render: () => (
    <HorizontalStack gap="lg" align="start" wrap>
      <LinkGroup label="Pages">
        <Link href="#portfolio">Portfolio</Link>
        <Link href="#playground">Playground</Link>
        <Link href="#profile">Profile</Link>
      </LinkGroup>
      <LinkGroup label="Fun stuff">
        <Link href="#verity">Verity design system</Link>
        <Link disabled tooltip="Coming soon">Reading list</Link>
      </LinkGroup>
      <LinkGroup label="Connect">
        <Link href="#linkedin">LinkedIn</Link>
        <Link href="#email">Email</Link>
      </LinkGroup>
    </HorizontalStack>
  ),
};
