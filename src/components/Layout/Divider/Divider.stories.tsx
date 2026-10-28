import type { Meta, StoryObj } from '@storybook/react-vite';
import { Placeholder } from '../../../foundations/Placeholder';
import { VerticalStack } from '../VerticalStack';
import { Divider } from './Divider';

const meta = {
  title: 'Layout/Divider',
  component: Divider,
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InContext: Story = {
  name: 'In context',
  render: () => (
    <VerticalStack gap="lg">
      <Placeholder size="lg">The end of one topic</Placeholder>
      <Divider />
      <Placeholder size="lg">The start of the next topic</Placeholder>
    </VerticalStack>
  ),
};
