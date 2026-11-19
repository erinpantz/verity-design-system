import type { Meta, StoryObj } from '@storybook/react-vite';
import { Placeholder } from '../../../foundations/Placeholder';
import { Button } from '../../Actions/Button';
import { ActionCard } from '../../ContentBlocks/ActionCard';
import { Quote } from '../../ContentBlocks/Quote';
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
    gap: 'md',
    children: items,
  },
  argTypes: {
    width: { control: 'inline-radio', options: ['column', 'wide'] },
    itemWidth: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] },
    gap: { control: 'inline-radio', options: ['md', 'lg', 'xl'] },
    fillRows: { control: 'boolean' },
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

// Wide, so the larger widths have room for more than one column
export const ItemWidthLg: Story = {
  name: 'Item width lg',
  args: { itemWidth: 'lg', width: 'wide' },
  decorators: [(Story) => <Container><Story /></Container>],
};

export const ItemWidthXl: Story = {
  name: 'Item width xl',
  args: { itemWidth: 'xl', width: 'wide' },
  decorators: [(Story) => <Container><Story /></Container>],
};

// Quotes have no box around them, so they need more space to read as separate
export const GapLg: Story = {
  name: 'Gap lg, for quotes',
  args: {
    gap: 'lg',
    children: [
      <Quote key="1" quote="I finally understood why the app asked for my bank details." name="Participant 3" title="Usability test, round 2" />,
      <Quote key="2" quote="Setup took me five minutes instead of twenty." name="Participant 7" title="Usability test, round 2" />,
      <Quote key="3" quote="I didn’t have to call support once." name="Participant 9" title="Usability test, round 2" />,
    ],
  },
};

// Cards with a lot of padding: the space Section puts between blocks, so
// the gap reads as wide as the space inside each card
export const GapXl: Story = {
  name: 'Gap xl, for roomy cards',
  args: {
    gap: 'xl',
    itemWidth: 'lg',
    fillRows: true,
    children: [
      <ActionCard key="1" heading="Let’s chat" icon="hand" iconColor="accent-one" body="I’m looking for my next design role and would love to chat." actions={<Button href="#book">Book a call</Button>} />,
      <ActionCard key="2" heading="Verity" icon="verity" iconColor="accent-two" body="This site is built with Verity, my design system." actions={<Button href="#verity">Check it out</Button>} />,
      <ActionCard key="3" heading="Music" icon="music" iconColor="accent-three" body="Music keeps me going." actions={<Button href="#music">Take a listen</Button>} />,
    ],
  },
};

export const InContext: Story = {
  name: 'In context',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <Container as="section">
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

// Three items, filling their rows, at three widths: wide enough for three
// across, then two plus one (the third takes the full width), then one per
// row. The widths are made from the tokens: three md items and two gaps, the
// content column, and the lg item width.
const three = sizes.slice(0, 3).map((size, i) => (
  <Placeholder key={i} size={size}>{`Item ${i + 1}`}</Placeholder>
));

export const FillRows: StoryObj = {
  name: 'Fill rows',
  render: () => (
    <VerticalStack gap="xl">
      <div style={{ maxInlineSize: 'calc(3 * var(--verity-grid-item-min-width-md) + 2 * var(--verity-spacing-md))' }}>
        <Grid fillRows>{three}</Grid>
      </div>
      <div style={{ maxInlineSize: 'var(--verity-content-column-width)' }}>
        <Grid fillRows>{three}</Grid>
      </div>
      <div style={{ maxInlineSize: 'var(--verity-grid-item-min-width-lg)' }}>
        <Grid fillRows>{three}</Grid>
      </div>
    </VerticalStack>
  ),
};

// The same three items without fillRows, at the content column's width: the
// third keeps its column, and the last row has empty space
export const FillRowsOff: StoryObj = {
  name: 'Fill rows off, for comparison',
  render: () => (
    <div style={{ maxInlineSize: 'var(--verity-content-column-width)' }}>
      <Grid>{three}</Grid>
    </div>
  ),
};

