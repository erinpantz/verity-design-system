import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../Actions/Button';
import { IconButton } from '../../Actions/IconButton';
import { Link } from '../../Actions/Link';
import { Grid } from '../../Layout/Grid';
import { ActionCard } from './ActionCard';

const meta = {
  title: 'Content blocks/ActionCard',
  component: ActionCard,
  args: {
    heading: 'Music',
    headingLevel: 3,
    icon: 'music',
    iconColor: 'accent-three',
    body: 'Music keeps me going. I love to keep up with new artists and share my favorites with others.',
    actions: <Button href="#music">Take a listen</Button>,
  },
  argTypes: {
    heading: { control: 'text' },
    headingLevel: { control: 'inline-radio', options: [2, 3] },
    iconColor: {
      control: 'select',
      options: ['accent-one', 'accent-two', 'accent-three', 'accent-four', 'accent-five', 'accent-six'],
    },
    body: { control: 'text' },
    actions: { control: false },
  },
} satisfies Meta<typeof ActionCard>;

export default meta;

type Story = StoryObj<typeof meta>;

// Story layout only: one card, as wide as a card beside one other in the
// content column
const oneCard: Story['decorators'] = [
  (Story) => (
    <div style={{ maxInlineSize: 'var(--verity-grid-item-min-width-lg)' }}>
      <Story />
    </div>
  ),
];

export const Default: Story = { decorators: oneCard };

// A Button, then an IconButton, spacing/xs apart
export const WithAnIconButton: Story = {
  name: 'With an IconButton',
  decorators: oneCard,
  args: {
    heading: 'Let’s chat',
    icon: 'hand',
    iconColor: 'accent-one',
    body: 'I’m looking for my next design role and would love to chat if you think I could bring value to your team.',
    actions: (
      <>
        <Button href="#book" opensInNewTab>
          Book a call
        </Button>
        <IconButton icon="linkedin" label="LinkedIn" href="https://www.linkedin.com/in/erintozour/" opensInNewTab />
      </>
    ),
  },
};

// The body can hold a Link, which takes the body text colors on the card
export const WithALink: Story = {
  name: 'With a link',
  decorators: oneCard,
  args: {
    heading: 'Verity',
    icon: 'verity',
    iconColor: 'accent-two',
    body: (
      <>
        This site is built with <Link href="#verity">Verity</Link>, my design system. Every color, size, and space
        comes from a token.
      </>
    ),
    actions: <Button href="#verity">Check it out</Button>,
  },
  argTypes: { body: { control: false } },
};

// Three in a Grid, with bodies of different lengths: each card is as tall as
// the tallest in its row, and the buttons line up along the bottom. Narrow
// the window to see them wrap: then Music sits alone on the last row,
// stretched across it, and its body text stops at 600 while its tile stays
// at the right edge.
export const InAGrid: StoryObj = {
  name: 'In a Grid',
  render: () => (
    <Grid itemWidth="lg" fillRows width="wide">
      <ActionCard
        heading="Let’s chat"
        icon="hand"
        iconColor="accent-one"
        body="I’m looking for my next design role and would love to chat if you think I could bring value to your team, whether it’s product design, design systems, or both."
        actions={<Button href="#book">Book a call</Button>}
      />
      <ActionCard
        heading="Verity"
        icon="verity"
        iconColor="accent-two"
        body="Built with my design system."
        actions={<Button href="#verity">Check it out</Button>}
      />
      <ActionCard
        heading="Music"
        icon="music"
        iconColor="accent-three"
        body="Music keeps me going. I love to keep up with new artists and share my favorites with others: the albums I play on repeat, the songs I can’t stop humming, and the shows I’ve been lucky enough to see."
        actions={<Button href="#music">Take a listen</Button>}
      />
    </Grid>
  ),
  parameters: { layout: 'padded' },
};
