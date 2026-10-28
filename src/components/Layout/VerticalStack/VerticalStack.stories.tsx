import type { Meta, StoryObj } from '@storybook/react-vite';
import { Placeholder } from '../../../foundations/Placeholder';
import { VerticalStack } from './VerticalStack';

const meta = {
  title: 'Layout/VerticalStack',
  component: VerticalStack,
  args: {
    gap: 'md',
    align: 'stretch',
    // Different lengths, so start, center, and end look different
    children: (
      <>
        <Placeholder>Item 1</Placeholder>
        <Placeholder>Item 2, which is longer</Placeholder>
        <Placeholder>Item 3, longer than item 1</Placeholder>
      </>
    ),
  },
  argTypes: {
    gap: { control: 'inline-radio', options: ['none', 'xxs', 'xs', 'sm', 'md', 'lg'] },
    align: { control: 'inline-radio', options: ['stretch', 'start', 'center', 'end'] },
    // A list needs <li> items, so it's chosen in code, not here
    as: { control: false },
    children: { control: false },
  },
} satisfies Meta<typeof VerticalStack>;

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

export const AlignCenter: Story = {
  name: 'Align center',
  args: { align: 'center' },
};

export const AlignEnd: Story = {
  name: 'Align end',
  args: { align: 'end' },
};

export const InContext: Story = {
  name: 'In context',
  render: () => (
    <VerticalStack gap="lg">
      <VerticalStack gap="sm">
        <Placeholder size="sm">Heading</Placeholder>
        <Placeholder>Intro paragraph</Placeholder>
      </VerticalStack>
      <Placeholder size="lg">Image</Placeholder>
      <VerticalStack gap="xs" align="start">
        <Placeholder size="sm">Caption</Placeholder>
        <Placeholder size="sm">Credit</Placeholder>
      </VerticalStack>
    </VerticalStack>
  ),
};
