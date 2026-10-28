import type { Meta, StoryObj } from '@storybook/react-vite';
import { Placeholder } from '../../../foundations/Placeholder';
import { Container } from '../Container';
import { VerticalStack } from '../VerticalStack';
import { Grid } from './Grid';

// Different heights, so each row shows its items evening out
const sizes = ['sm', 'lg', 'md', 'sm', 'md', 'lg'] as const;
const items = sizes.map((size, i) => (
  <Placeholder key={i} size={size}>{`Item ${i + 1}`}</Placeholder>
));

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  args: {
    itemWidth: 'md',
    children: items,
  },
  argTypes: {
    itemWidth: { control: 'inline-radio', options: ['sm', 'md'] },
    // A list needs <li> items, so it's chosen in code, not here
    as: { control: false },
    children: { control: false },
  },
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ItemWidthSm: Story = {
  name: 'Item width sm',
  args: { itemWidth: 'sm' },
};

export const InContext: Story = {
  name: 'In context',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <Container as="section" width="wide">
      <VerticalStack gap="md">
        <Placeholder size="sm">Section heading</Placeholder>
        <Grid as="ul">
          {[
            'Project card with a short summary',
            'Project card with a longer summary that takes up more lines than the cards next to it',
            'Project card',
            'Project card',
            'Project card with a longer summary than the card next to it',
          ].map((summary, i) => (
            <li key={i}>
              <Placeholder>{summary}</Placeholder>
            </li>
          ))}
        </Grid>
      </VerticalStack>
    </Container>
  ),
};
