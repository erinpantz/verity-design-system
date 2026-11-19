import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../Actions/Button';
import { IconButton } from '../../Actions/IconButton';
import { ActionCard } from '../../ContentBlocks/ActionCard';
import { Footer } from './Footer';

// Erin's three cards. Each heading is an h2: the cards are the footer's top
// level. Verity's button is disabled, with “Coming soon,” until its
// Storybook is public.
const letsChat = (
  <ActionCard
    heading="Let’s chat"
    headingLevel={2}
    icon="hand"
    iconColor="accent-one"
    body="I’m looking for my next design role and would love to chat if you think I could bring value to your team."
    actions={
      <>
        <Button href="https://calendly.com/erin-hurff/30min" opensInNewTab>
          Book a call
        </Button>
        <IconButton icon="linkedin" label="LinkedIn" href="https://www.linkedin.com/in/erintozour/" opensInNewTab />
      </>
    }
  />
);

const verity = (
  <ActionCard
    heading="Verity"
    headingLevel={2}
    icon="verity"
    iconColor="accent-two"
    body="This site is built with Verity, my design system. Every color, size, and space comes from a token."
    actions={
      <Button disabled tooltip="Coming soon">
        Check it out
      </Button>
    }
  />
);

const music = (
  <ActionCard
    heading="Music"
    headingLevel={2}
    icon="music"
    iconColor="accent-three"
    body="Music keeps me going. I love to keep up with new artists and share my favorites with others."
    actions={<Button href="#music">Take a listen</Button>}
  />
);

const meta = {
  title: 'Layout/Footer',
  component: Footer,
  args: {
    cards: (
      <>
        {letsChat}
        {verity}
        {music}
      </>
    ),
    copyrightName: 'Erin Tozour',
  },
  argTypes: {
    cards: { control: false },
    copyrightName: { control: 'text' },
  },
  // No band of its own any more, so Storybook's padding stands in for the
  // page's side margins (Shell's, on the site)
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

// Wide, spanning the page like a wide image: three cards across, then the
// copyright line. Narrow the window to see them wrap to two, with Music
// alone on the last row at the full width, then to one per row.
export const Default: Story = {};

// Two cards: they share the row, then stack on a phone
export const TwoCards: Story = {
  name: 'Two cards',
  args: {
    cards: (
      <>
        {letsChat}
        {music}
      </>
    ),
  },
};
