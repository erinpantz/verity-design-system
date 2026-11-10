import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from '../../Layout/Container';
import { Section } from '../../Layout/Section';
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
    background: { control: 'inline-radio', options: ['default', 'knockout', 'brand'] },
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

export const Knockout: Story = {
  args: { background: 'knockout' },
};

export const Brand: Story = {
  args: { background: 'brand' },
};

// Wide: the band breaks out of the Container's column to the wide width,
// and the text still wraps at the column's width. Shown in a Container, as
// on a page.
const inContainer = (Story: () => React.ReactElement) => (
  <Container>
    <Story />
  </Container>
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

// The top of a home page: a Hero, then the first Section, with Main's gap
// between them
export const InContext: StoryObj = {
  name: 'In context',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--verity-main-spacing-section-gap)' }}>
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
