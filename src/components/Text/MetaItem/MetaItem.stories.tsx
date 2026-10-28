import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { Container } from '../../Layout/Container';
import { Grid } from '../../Layout/Grid';
import { VerticalStack } from '../../Layout/VerticalStack';
import { MetaItem } from './MetaItem';

// A MetaItem is only valid inside a <dl>, so stories of one MetaItem put it in one
const inDescriptionList: Decorator = (Story) => (
  <VerticalStack as="dl">
    <Story />
  </VerticalStack>
);

const meta = {
  title: 'Text/MetaItem',
  component: MetaItem,
  args: {
    title: 'Role',
    value: 'Lead designer',
  },
  argTypes: {
    title: { control: 'text' },
    value: { control: 'text' },
  },
} satisfies Meta<typeof MetaItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [inDescriptionList],
};

export const LongValue: Story = {
  name: 'Long value',
  decorators: [inDescriptionList],
  args: {
    title: 'Team',
    value: 'Two product designers, a content designer, four engineers, and a product manager',
  },
};

// A project summary: a Grid that's a description list, with one MetaItem per fact
export const InContext: StoryObj = {
  name: 'In context',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <Container width="wide">
      <Grid as="dl" itemWidth="sm">
        <MetaItem title="Role" value="Lead designer" />
        <MetaItem title="Team" value="Two designers, four engineers, and a product manager" />
        <MetaItem title="Timeline" value="March–August 2025" />
        <MetaItem title="Tools" value="Figma, Maze, and Dovetail" />
      </Grid>
    </Container>
  ),
};
