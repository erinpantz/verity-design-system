import type { Meta, StoryObj } from '@storybook/react-vite';
import { UnorderedList, UnorderedListItem } from './UnorderedList';

// Only here so the UnorderedList docs page can show UnorderedListItem's props.
// '!dev' hides it from the sidebar; UnorderedList's stories show items in use.
const meta = {
  title: 'Text/UnorderedList/UnorderedListItem',
  component: UnorderedListItem,
  tags: ['!dev'],
  decorators: [
    (Story) => (
      <UnorderedList>
        <Story />
      </UnorderedList>
    ),
  ],
  args: {
    children: 'Interviewed 12 customers who left during setup',
  },
} satisfies Meta<typeof UnorderedListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
