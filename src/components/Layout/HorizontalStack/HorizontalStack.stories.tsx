import type { Meta, StoryObj } from '@storybook/react-vite';
import { Placeholder } from '../../../foundations/Placeholder';
import { VerticalStack } from '../VerticalStack';
import { HorizontalStack } from './HorizontalStack';

// Enough items to fill more than one line on any screen
const tags = Array.from({ length: 20 }, (_, i) => <Placeholder key={i} size="sm">{`Tag ${i + 1}`}</Placeholder>);

const meta = {
  title: 'Layout/HorizontalStack',
  component: HorizontalStack,
  args: {
    gap: 'md',
    align: 'center',
    wrap: false,
    // The middle item is taller, so start, center, and end look different
    children: (
      <>
        <Placeholder size="sm">Item 1</Placeholder>
        <Placeholder size="lg">Item 2</Placeholder>
        <Placeholder size="sm">Item 3</Placeholder>
      </>
    ),
  },
  argTypes: {
    gap: { control: 'inline-radio', options: ['none', 'xxs', 'xs', 'sm', 'md', 'lg'] },
    align: { control: 'inline-radio', options: ['start', 'center', 'end'] },
    wrap: { control: 'boolean' },
    // A list needs <li> items, so it's chosen in code, not here
    as: { control: false },
    children: { control: false },
  },
} satisfies Meta<typeof HorizontalStack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const GapNone: Story = {
  name: 'Gap none',
  args: { gap: 'none' },
};

export const GapXxs: Story = {
  name: 'Gap xxs',
  args: { gap: 'xxs' },
};

export const GapXs: Story = {
  name: 'Gap xs',
  args: { gap: 'xs' },
};

export const GapSm: Story = {
  name: 'Gap sm',
  args: { gap: 'sm' },
};

export const GapLg: Story = {
  name: 'Gap lg',
  args: { gap: 'lg' },
};

export const AlignStart: Story = {
  name: 'Align start',
  args: { align: 'start' },
};

export const AlignEnd: Story = {
  name: 'Align end',
  args: { align: 'end' },
};

export const Wrap: Story = {
  args: { wrap: true, children: tags },
};

export const InContext: Story = {
  name: 'In context',
  render: () => (
    <VerticalStack gap="md" align="start">
      <Placeholder>Project summary</Placeholder>
      <HorizontalStack as="ul" gap="xs" wrap>
        {tags.slice(0, 6).map((tag) => (
          <li key={tag.key}>{tag}</li>
        ))}
      </HorizontalStack>
      <HorizontalStack gap="xs">
        <Placeholder size="sm">Primary button</Placeholder>
        <Placeholder size="sm">Secondary button</Placeholder>
      </HorizontalStack>
    </VerticalStack>
  ),
};
