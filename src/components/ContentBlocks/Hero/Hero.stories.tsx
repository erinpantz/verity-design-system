import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from '../../Layout/Container';
import { Section } from '../../Layout/Section';
import { NavCard } from '../../Navigation/NavCard';
import { NavCardGroup } from '../../Navigation/NavCardGroup';
import { StatCard } from '../StatCard';
import { Grid } from '../../Layout/Grid';
import { Hero } from './Hero';

const meta = {
  title: 'Content blocks/Hero',
  component: Hero,
  args: {
    heading: 'I design tools that give people their time back',
    intro: 'I’m a senior product designer. I turn messy, high-stakes work into products people trust.',
    primaryAction: { label: 'View my work', href: '#work' },
    secondaryAction: { label: 'Book a call', href: '#contact' },
  },
  argTypes: {
    background: { control: 'inline-radio', options: ['default', 'subtle', 'knockout', 'brand'] },
    heading: { control: 'text' },
    intro: { control: 'text' },
    primaryAction: { control: 'object' },
    secondaryAction: { control: 'object' },
    width: { control: 'inline-radio', options: ['column', 'wide'] },
  },
} satisfies Meta<typeof Hero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Subtle: Story = {
  args: { background: 'subtle' },
};

export const Knockout: Story = {
  args: { background: 'knockout' },
};

export const Brand: Story = {
  args: { background: 'brand' },
};

// Wide: the band breaks out of the Container's column to the wide width,
// and the text still wraps at the column's width. Shown in a Container, with
// the page's side margins (Shell's main/padding-inline), as on a page.
const inContainer = (Story: () => React.ReactElement) => (
  <div style={{ paddingInline: 'var(--verity-main-padding-inline)' }}>
    <Container>
      <Story />
    </Container>
  </div>
);

export const Wide: Story = {
  args: { width: 'wide' },
  parameters: { layout: 'fullscreen' },
  decorators: [inContainer],
};

export const WideKnockout: Story = {
  name: 'Wide knockout',
  args: { width: 'wide', background: 'knockout' },
  parameters: { layout: 'fullscreen' },
  decorators: [inContainer],
};

export const WideBrand: Story = {
  name: 'Wide brand',
  args: { width: 'wide', background: 'brand' },
  parameters: { layout: 'fullscreen' },
  decorators: [inContainer],
};

export const OneAction: Story = {
  name: 'One action',
  args: { secondaryAction: undefined },
};

// No actions, as on Home: the band ends after the text
export const NoActions: Story = {
  name: 'No actions',
  args: { primaryAction: undefined, secondaryAction: undefined },
};

// Home's two ways in, as the Hero's media
const homeCards = (
  <NavCardGroup>
    <NavCard page="portfolio" label="Portfolio" href="#portfolio" />
    <NavCard page="profile" label="Profile" href="#profile" />
  </NavCardGroup>
);

// The Home layout: a wide Hero with no actions, and a NavCardGroup beside
// the text. Hover the cards: they shuffle and lift inside the band.
export const WithMedia: Story = {
  name: 'With media',
  args: {
    width: 'wide',
    primaryAction: undefined,
    secondaryAction: undefined,
    media: homeCards,
  },
  argTypes: { media: { control: false } },
  parameters: { layout: 'fullscreen' },
  decorators: [inContainer],
};

// Narrower than the text's minimum plus the cards, so the cards wrap under
// the text, at the start
export const WithMediaWrapped: Story = {
  name: 'With media, wrapped',
  args: {
    primaryAction: undefined,
    secondaryAction: undefined,
    media: homeCards,
  },
  argTypes: { media: { control: false } },
  decorators: [
    (Story) => (
      <div style={{ maxInlineSize: 'var(--verity-content-column-width)' }}>
        <Story />
      </div>
    ),
  ],
};

// The top of a home page: a Hero, then the first Section, with Main's gap
// between them
export const InContext: StoryObj = {
  name: 'In context',
  parameters: { layout: 'fullscreen' },
  render: () => (
    // Stands in for Main: the space between blocks and the page's side margins
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--verity-main-spacing-section-gap)',
        paddingInline: 'var(--verity-main-padding-inline)',
      }}
    >
      <Hero
        background="brand"
        heading="I design tools that give people their time back"
        intro="I’m a senior product designer. I turn messy, high-stakes work into products people trust."
        primaryAction={{ label: 'View my work', href: '#work' }}
        secondaryAction={{ label: 'Book a call', href: '#contact' }}
      />
      <Section heading="Results I’m proud of">
        <Grid as="ul" itemWidth="sm">
          <li><StatCard value="38%" description="Fewer people left at checkout" /></li>
          <li><StatCard value="6 hrs" description="Of admin saved per carer each week" /></li>
        </Grid>
      </Section>
    </div>
  ),
};
