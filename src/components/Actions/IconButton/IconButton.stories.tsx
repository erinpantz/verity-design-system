import type { Meta, StoryObj } from '@storybook/react-vite';
import { ICON_NAMES } from '../../../icons/icons.generated';
import { HorizontalStack } from '../../Layout/HorizontalStack';
import { VerticalStack } from '../../Layout/VerticalStack';
import { IconButton } from './IconButton';

const meta = {
  title: 'Actions/IconButton',
  component: IconButton,
  args: {
    icon: 'dock-to-left',
    label: 'Collapse navigation',
    size: 'md',
    disabled: false,
  },
  argTypes: {
    icon: { control: 'select', options: ICON_NAMES },
    label: { control: 'text' },
    size: { control: 'inline-radio', options: ['xl', 'lg', 'md', 'sm'] },
    disabled: { control: 'boolean' },
    onClick: { control: false },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// Every size, largest first
export const Sizes: StoryObj = {
  render: () => (
    <HorizontalStack gap="lg" wrap>
      <IconButton icon="email" label="Email me" size="xl" />
      <IconButton icon="email" label="Email me" size="lg" />
      <IconButton icon="email" label="Email me" size="md" />
      <IconButton icon="email" label="Email me" size="sm" />
    </HorizontalStack>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};

// A column of actions, like the controls at the top of a collapsed sidebar.
// Each tooltip opens to the side, so it doesn't cover the next button.
export const InContext: StoryObj = {
  name: 'In context',
  render: () => (
    <VerticalStack gap="xs" align="start">
      <IconButton icon="dock-to-left" label="Expand navigation" />
      <IconButton icon="email" label="Email me" />
      <IconButton icon="resume" label="Download resume" />
    </VerticalStack>
  ),
};
