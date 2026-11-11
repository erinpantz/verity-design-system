import type { Meta, StoryObj } from '@storybook/react-vite';
import landscape from '../../../foundations/sample-images/landscape.jpg';
import { ICON_NAMES } from '../../../icons/icons.generated';
import { HorizontalStack } from '../../Layout/HorizontalStack';
import { VerticalStack } from '../../Layout/VerticalStack';
import { Image } from '../../Media/Image';
import { IconButton } from './IconButton';

const meta = {
  title: 'Actions/IconButton',
  component: IconButton,
  args: {
    icon: 'dock-to-left',
    label: 'Collapse navigation',
    size: 'md',
    background: 'none',
    disabled: false,
  },
  argTypes: {
    icon: { control: 'select', options: ICON_NAMES },
    label: { control: 'text' },
    size: { control: 'inline-radio', options: ['xl', 'lg', 'md', 'sm'] },
    background: { control: 'inline-radio', options: ['none', 'scrim'] },
    tooltipPlacement: { control: 'inline-radio', options: ['end', 'top', 'top-end'] },
    disabled: { control: 'boolean' },
    onClick: { control: false },
    as: { control: false },
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

// On top of a picture, like Animation's pause button: the scrim keeps the
// icon readable whatever is behind it. Hover and press it to see the fills
// stack on the scrim, and use the controls to try disabled.
export const OnAnImage: Story = {
  name: 'On an image',
  args: {
    icon: 'pause',
    label: 'Pause animation',
    size: 'sm',
    background: 'scrim',
    tooltipPlacement: 'top-end',
  },
  render: (args) => (
    <div style={{ position: 'relative' }}>
      <Image src={landscape} alt="Hills at dusk, with the sun setting behind them" />
      <div
        style={{
          position: 'absolute',
          insetBlockEnd: 'var(--verity-padding-xs)',
          insetInlineEnd: 'var(--verity-padding-xs)',
        }}
      >
        <IconButton {...args} />
      </div>
    </div>
  ),
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
