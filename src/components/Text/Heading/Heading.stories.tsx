import type { Meta, StoryObj } from '@storybook/react-vite';
import { Placeholder } from '../../../foundations/Placeholder';
import { VerticalStack } from '../../Layout/VerticalStack';
import { Heading } from './Heading';

const meta = {
  title: 'Text/Heading',
  component: Heading,
  argTypes: {
    level: { control: 'inline-radio', options: [1, 2, 3] },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Level1: Story = {
  name: 'Level 1',
  args: { level: 1, children: 'Redesigning the onboarding flow' },
};

export const Level2: Story = {
  name: 'Level 2',
  args: { level: 2, children: 'Research and discovery' },
};

export const Level3: Story = {
  name: 'Level 3',
  args: { level: 3, children: 'Interviews' },
};

// A page's outline: one h1, then h2 sections with h3 parts inside them. It draws
// its own Headings, so it uses the plain StoryObj type, which doesn't ask for a level.
export const InContext: StoryObj = {
  name: 'In context',
  render: () => (
    <VerticalStack gap="lg">
      <Heading level={1}>Redesigning the onboarding flow</Heading>
      <VerticalStack gap="sm">
        <Heading level={2}>Research and discovery</Heading>
        <Placeholder>Section intro</Placeholder>
      </VerticalStack>
      <VerticalStack gap="sm">
        <Heading level={3}>Interviews</Heading>
        <Placeholder>Body text</Placeholder>
      </VerticalStack>
    </VerticalStack>
  ),
};
