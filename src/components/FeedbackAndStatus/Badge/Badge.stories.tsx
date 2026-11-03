import type { Meta, StoryObj } from '@storybook/react-vite';
import { HorizontalStack } from '../../Layout/HorizontalStack';
import { VerticalStack } from '../../Layout/VerticalStack';
import { TextBlock } from '../../Text/TextBlock';
import { Badge } from './Badge';

const meta = {
  title: 'Feedback and status/Badge',
  component: Badge,
  args: {
    label: 'Case study',
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['neutral', 'accent-one', 'accent-two', 'accent-three', 'accent-four', 'accent-five', 'accent-six', 'error', 'success', 'warning'],
    },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// One accent per category. The label names the category, so the color is
// a second cue, never the only one.
export const Categories: StoryObj = {
  render: () => (
    <HorizontalStack gap="xs" wrap>
      <Badge color="accent-one" label="Research" />
      <Badge color="accent-two" label="Strategy" />
      <Badge color="accent-three" label="Interaction" />
      <Badge color="accent-four" label="Visual design" />
      <Badge color="accent-five" label="Prototyping" />
      <Badge color="accent-six" label="Writing" />
    </HorizontalStack>
  ),
};

export const Status: StoryObj = {
  render: () => (
    <HorizontalStack gap="xs" wrap>
      <Badge color="error" label="Problem" />
      <Badge color="success" label="Shipped" />
      <Badge color="warning" label="In progress" />
    </HorizontalStack>
  ),
};

// A project's tags, in a list so screen readers say how many there are
export const InContext: StoryObj = {
  name: 'In context',
  render: () => (
    <VerticalStack gap="sm">
      <HorizontalStack as="ul" gap="xs" wrap>
        <li><Badge label="Case study" /></li>
        <li><Badge color="accent-one" label="Research" /></li>
        <li><Badge color="accent-three" label="Interaction" /></li>
      </HorizontalStack>
      <TextBlock heading="Redesigning checkout for a grocery app">
        Fewer steps, clearer delivery times, and a basket that remembers what you buy every week.
      </TextBlock>
    </VerticalStack>
  ),
};
